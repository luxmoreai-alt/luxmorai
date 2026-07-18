import hashlib
import time
from functools import wraps

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core import signing
from django.core.cache import cache
from django.http import JsonResponse
from django.utils.crypto import constant_time_compare


ADMIN_TOKEN_SALT = "luxmorai.admin-api.v1"


def create_admin_token(user):
    return signing.dumps(
        {
            "user_id": user.pk,
            "auth_hash": user.get_session_auth_hash(),
        },
        salt=ADMIN_TOKEN_SALT,
        compress=True,
    )


def _authenticated_admin(request):
    authorization = request.headers.get("Authorization", "")
    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not token:
        return None

    try:
        payload = signing.loads(
            token,
            salt=ADMIN_TOKEN_SALT,
            max_age=settings.ADMIN_API_TOKEN_MAX_AGE,
        )
        user = get_user_model().objects.filter(pk=payload.get("user_id")).first()
    except (signing.BadSignature, signing.SignatureExpired, TypeError, ValueError):
        return None

    if not user or not user.is_active or not user.is_staff or not user.is_superuser:
        return None
    if not constant_time_compare(payload.get("auth_hash", ""), user.get_session_auth_hash()):
        return None
    return user


def require_admin_auth(view):
    @wraps(view)
    def wrapped(request, *args, **kwargs):
        user = _authenticated_admin(request)
        if not user:
            response = JsonResponse({"error": "Authentication required."}, status=401)
            response["Cache-Control"] = "no-store"
            return response
        request.admin_user = user
        response = view(request, *args, **kwargs)
        response["Cache-Control"] = "no-store"
        return response

    return wrapped


def _client_address(request):
    forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR", "")
    return (forwarded_for.split(",", 1)[0].strip() or request.META.get("REMOTE_ADDR", "unknown"))[:64]


def rate_limit(scope, limit, window_seconds):
    def decorator(view):
        @wraps(view)
        def wrapped(request, *args, **kwargs):
            bucket = int(time.time() // window_seconds)
            identifier = hashlib.sha256(_client_address(request).encode("utf-8")).hexdigest()
            key = f"rate-limit:{scope}:{identifier}:{bucket}"
            if cache.add(key, 1, timeout=window_seconds + 5):
                attempts = 1
            else:
                try:
                    attempts = cache.incr(key)
                except ValueError:
                    cache.set(key, 1, timeout=window_seconds + 5)
                    attempts = 1

            if attempts > limit:
                response = JsonResponse({"error": "Too many requests. Please try again later."}, status=429)
                response["Retry-After"] = str(window_seconds)
                response["Cache-Control"] = "no-store"
                return response
            return view(request, *args, **kwargs)

        return wrapped

    return decorator
