from django.conf import settings
from django.http import HttpResponse
from urllib.parse import urlparse


def is_allowed_origin(origin):
    if not origin:
        return False

    origin_host = urlparse(origin).hostname or ""

    for allowed_origin in settings.FRONTEND_ORIGINS:
        allowed_origin = allowed_origin.strip().rstrip("/")
        if origin == allowed_origin:
            return True

        if allowed_origin.startswith(".") and origin_host.endswith(allowed_origin):
            return True

        if allowed_origin.startswith("*.") and origin_host.endswith(allowed_origin[1:]):
            return True

    return False


class SimpleCorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        origin = request.headers.get("Origin")
        allowed = is_allowed_origin(origin)

        if request.method == "OPTIONS" and allowed:
            response = HttpResponse()
        else:
            response = self.get_response(request)

        if allowed:
            response["Access-Control-Allow-Origin"] = origin
            response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
            response["Access-Control-Allow-Headers"] = "Content-Type"

        return response
