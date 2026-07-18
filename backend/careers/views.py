import json
import mimetypes
import re
from pathlib import Path
from urllib.parse import quote

from django.conf import settings
from django.contrib.auth import authenticate
from django.http import Http404, HttpResponse, JsonResponse
from django.utils import timezone
from django.utils.text import slugify
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .email import send_application_confirmation, send_application_status_update
from .models import Application, BlogPost, Inquiry, Job
from .security import create_admin_token, rate_limit, require_admin_auth


SELECTED_STATUS_MESSAGE = (
    "Congratulations! You have been selected. Your offer letter will be released "
    "within one business day after you receive this email."
)

APPLICATION_NUMBER_PREFIX = "9840570"


def get_application_number(application):
    return f"{APPLICATION_NUMBER_PREFIX}{application.id}"


def get_application_id_from_number(value):
    number = re.sub(r"\D", "", str(value))
    if number.startswith(APPLICATION_NUMBER_PREFIX):
        return number[len(APPLICATION_NUMBER_PREFIX):]
    return number


@csrf_exempt
@require_http_methods(["POST"])
@rate_limit("admin-login", limit=5, window_seconds=900)
def admin_auth_login(request):
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON."}, status=400)

    email = str(payload.get("email", "")).strip()
    password = str(payload.get("password", ""))
    user = authenticate(request, username=email, password=password)
    if not user or not user.is_active or not user.is_staff or not user.is_superuser:
        response = JsonResponse({"error": "Invalid email or password."}, status=401)
        response["Cache-Control"] = "no-store"
        return response

    response = JsonResponse(
        {
            "token": create_admin_token(user),
            "expiresIn": settings.ADMIN_API_TOKEN_MAX_AGE,
        }
    )
    response["Cache-Control"] = "no-store"
    return response


@require_http_methods(["GET"])
@require_admin_auth
def admin_auth_session(request):
    return JsonResponse({"authenticated": True, "email": request.admin_user.email or request.admin_user.username})


def serialize_job(job):
    return {
        "id": job.id,
        "title": job.title,
        "category": job.category,
        "experience": job.experience,
        "type": job.employment_type,
        "location": job.location,
        "description": job.description,
        "requirements": job.requirements,
        "isActive": job.is_active,
    }


def serialize_blog_post(post, request=None):
    image_url = post.image
    if post.image_file:
        image_version = int(post.updated_at.timestamp()) if post.updated_at else 0
        image_path = f"/api/blog-posts/{post.id}/image/?v={image_version}"
        image_url = request.build_absolute_uri(image_path) if request else image_path

    return {
        "id": post.id,
        "slug": post.slug,
        "title": post.title,
        "description": post.description,
        "image": image_url,
        "imageUrl": post.image,
        "imageAlt": post.image_alt,
        "brief": post.brief,
        "keyword": post.keyword,
        "relatedKeywords": post.related_keywords or [],
        "sections": post.sections or [],
        "servicePath": post.service_path,
        "isPublished": post.is_published,
        "createdAt": post.created_at.isoformat(),
        "updatedAt": post.updated_at.isoformat(),
    }


def unique_blog_slug(title, requested_slug="", post_id=None):
    base_slug = slugify(requested_slug or title) or "blog-post"
    candidate = base_slug
    counter = 2

    while BlogPost.objects.filter(slug=candidate).exclude(id=post_id).exists():
        candidate = f"{base_slug}-{counter}"
        counter += 1

    return candidate


def normalize_sections(sections):
    if not isinstance(sections, list):
        return []

    normalized = []
    for section in sections:
        if not isinstance(section, dict):
            continue
        heading = str(section.get("heading", "")).strip()
        body = str(section.get("body", "")).strip()
        if heading and body:
            normalized.append({"heading": heading, "body": body})
    return normalized


def normalize_keywords(keywords):
    if isinstance(keywords, list):
        return [str(keyword).strip() for keyword in keywords if str(keyword).strip()]
    return []


def blog_payload(request):
    """Read blog data from JSON or from a multipart form containing an image."""
    if request.content_type and request.content_type.startswith("multipart/form-data"):
        payload = request.POST.dict()
        try:
            payload["relatedKeywords"] = json.loads(payload.get("relatedKeywords", "[]"))
            payload["sections"] = json.loads(payload.get("sections", "[]"))
        except json.JSONDecodeError:
            raise ValueError("Invalid blog sections or keywords.")
        payload["isPublished"] = str(payload.get("isPublished", "true")).lower() == "true"
        return payload

    try:
        return json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError as error:
        raise ValueError("Invalid JSON.") from error


def validate_blog_image(image):
    if not image:
        return None
    allowed_types = {
        "image/jpeg": lambda data: data.startswith(b"\xff\xd8\xff"),
        "image/png": lambda data: data.startswith(b"\x89PNG\r\n\x1a\n"),
        "image/webp": lambda data: data.startswith(b"RIFF") and data[8:12] == b"WEBP",
        "image/gif": lambda data: data.startswith((b"GIF87a", b"GIF89a")),
    }
    content_type = getattr(image, "content_type", "")
    if content_type not in allowed_types:
        return "Upload a JPG, PNG, WebP, or GIF image."
    if image.size > 5 * 1024 * 1024:
        return "The image must be 5 MB or smaller."
    signature = image.read(16)
    image.seek(0)
    if not allowed_types[content_type](signature):
        return "The uploaded file content does not match its image type."
    return None


def validate_resume(resume):
    extension = Path(resume.name).suffix.lower()
    validators = {
        ".pdf": lambda data: data.startswith(b"%PDF-"),
        ".doc": lambda data: data.startswith(b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1"),
        ".docx": lambda data: data.startswith(b"PK\x03\x04"),
    }
    if extension not in validators:
        return "Resume must be a PDF, DOC, or DOCX file."
    if resume.size > 5 * 1024 * 1024:
        return "Resume must be 5 MB or smaller."
    signature = resume.read(16)
    resume.seek(0)
    if not validators[extension](signature):
        return "The uploaded resume content does not match its file extension."
    return None


def apply_blog_payload(post, payload, image=None):
    post.title = str(payload["title"]).strip()
    post.slug = unique_blog_slug(post.title, payload.get("slug", ""), post.id)
    post.description = str(payload["description"]).strip()
    requested_image = str(payload.get("image", "")).strip()
    post.image = requested_image if requested_image.startswith(("https://", "/")) else ""
    post.image_alt = str(payload.get("imageAlt", "")).strip()
    post.brief = str(payload.get("brief", "")).strip()
    post.keyword = str(payload.get("keyword", "")).strip()
    post.related_keywords = normalize_keywords(payload.get("relatedKeywords", []))
    post.sections = normalize_sections(payload.get("sections", []))
    requested_service_path = str(payload.get("servicePath", "/contact")).strip()
    post.service_path = (
        requested_service_path
        if requested_service_path.startswith("/") and not requested_service_path.startswith("//")
        else "/contact"
    )
    post.is_published = bool(payload.get("isPublished", True))

    if image:
        post.image_file = image.read()
        post.image_filename = image.name
        post.image_content_type = image.content_type
    elif str(payload.get("removeImage", "false")).lower() == "true":
        post.image_file = None
        post.image_filename = ""
        post.image_content_type = ""


def serialize_application(application, request):
    resume_url = f"/admin/applications/{application.id}/resume/"
    return {
        "id": application.id,
        "applicationNumber": get_application_number(application),
        "jobId": application.job_id,
        "role": application.role,
        "name": application.name,
        "email": application.email,
        "phone": application.phone,
        "currentAddress": application.current_address,
        "currentPostalCode": application.current_postal_code,
        "permanentAddress": application.permanent_address,
        "permanentPostalCode": application.permanent_postal_code,
        "relevantExperience": application.relevant_experience,
        "totalExperience": application.total_experience,
        "currentCtc": application.current_ctc,
        "expectedCtc": application.expected_ctc,
        "careerGap": application.career_gap,
        "message": application.message,
        "resumeUrl": resume_url,
        "status": application.status,
        "statusReason": application.status_reason,
        "notes": application.notes,
        "createdAt": application.created_at.isoformat(),
    }


def serialize_tracking_application(application):
    return {
        "id": application.id,
        "applicationNumber": get_application_number(application),
        "role": application.role,
        "name": application.name,
        "email": application.email,
        "phone": application.phone,
        "status": application.status,
        "statusReason": application.status_reason,
        "createdAt": application.created_at.isoformat(),
    }


@require_http_methods(["GET"])
def jobs(request):
    active_jobs = Job.objects.filter(is_active=True)
    return JsonResponse({"jobs": [serialize_job(job) for job in active_jobs]})


@require_http_methods(["GET"])
def blog_posts(request):
    posts = BlogPost.objects.filter(is_published=True)
    return JsonResponse({"posts": [serialize_blog_post(post, request) for post in posts]})


@require_http_methods(["GET"])
def blog_post_detail(request, slug):
    post = BlogPost.objects.filter(slug=slug, is_published=True).first()
    if not post:
        return JsonResponse({"error": "Blog post not found."}, status=404)
    return JsonResponse({"post": serialize_blog_post(post, request)})


@require_http_methods(["GET"])
def blog_post_image(request, post_id):
    post = BlogPost.objects.filter(id=post_id).only("image_file", "image_content_type", "image_filename").first()
    if not post or not post.image_file:
        raise Http404("Blog image not found.")
    response = HttpResponse(bytes(post.image_file), content_type=post.image_content_type or "application/octet-stream")
    response["Content-Disposition"] = f'inline; filename="{quote(post.image_filename or "blog-image")}"'
    response["Cache-Control"] = "public, max-age=86400"
    return response


@csrf_exempt
@require_http_methods(["GET", "POST"])
@require_admin_auth
def admin_blog_posts(request):
    if request.method == "GET":
        return JsonResponse({"posts": [serialize_blog_post(post, request) for post in BlogPost.objects.all()]})

    try:
        payload = blog_payload(request)
    except ValueError as error:
        return JsonResponse({"error": str(error)}, status=400)

    required_fields = ["title", "description"]
    missing = [field for field in required_fields if not payload.get(field)]
    if missing:
        return JsonResponse({"error": f"Missing fields: {', '.join(missing)}"}, status=400)

    image = request.FILES.get("imageFile")
    image_error = validate_blog_image(image)
    if image_error:
        return JsonResponse({"error": image_error}, status=400)

    post = BlogPost()
    apply_blog_payload(post, payload, image)
    post.save()
    return JsonResponse({"post": serialize_blog_post(post, request), "message": "Blog post saved."}, status=201)


@csrf_exempt
@require_http_methods(["POST"])
@require_admin_auth
def admin_blog_post_detail(request, post_id):
    post = BlogPost.objects.filter(id=post_id).first()
    if not post:
        return JsonResponse({"error": "Blog post not found."}, status=404)

    try:
        payload = blog_payload(request)
    except ValueError as error:
        return JsonResponse({"error": str(error)}, status=400)

    missing = [field for field in ["title", "description"] if not payload.get(field)]
    if missing:
        return JsonResponse({"error": f"Missing fields: {', '.join(missing)}"}, status=400)

    image = request.FILES.get("imageFile")
    image_error = validate_blog_image(image)
    if image_error:
        return JsonResponse({"error": image_error}, status=400)

    apply_blog_payload(post, payload, image)
    post.save()
    return JsonResponse({"post": serialize_blog_post(post, request), "message": "Blog post updated."})


@csrf_exempt
@require_http_methods(["POST"])
@require_admin_auth
def admin_blog_post_toggle(request, post_id):
    post = BlogPost.objects.filter(id=post_id).first()
    if not post:
        return JsonResponse({"error": "Blog post not found."}, status=404)

    post.is_published = not post.is_published
    post.save(update_fields=["is_published", "updated_at"])
    return JsonResponse({"post": serialize_blog_post(post, request), "isPublished": post.is_published})


@csrf_exempt
@require_http_methods(["GET", "POST"])
@require_admin_auth
def admin_jobs(request):
    if request.method == "GET":
        return JsonResponse({"jobs": [serialize_job(job) for job in Job.objects.all()]})

    try:
        payload = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON."}, status=400)

    required_fields = ["title", "category", "experience", "type"]
    missing = [field for field in required_fields if not payload.get(field)]
    if missing:
        return JsonResponse({"error": f"Missing fields: {', '.join(missing)}"}, status=400)

    job = Job.objects.create(
        title=payload["title"],
        category=payload["category"],
        experience=payload["experience"],
        employment_type=payload["type"],
        location=payload.get("location", ""),
        description=payload.get("description", ""),
        requirements=payload.get("requirements", ""),
        is_active=payload.get("isActive", True),
    )
    return JsonResponse({"job": serialize_job(job), "message": "Job posted."}, status=201)


@csrf_exempt
@require_http_methods(["POST"])
@require_admin_auth
def admin_job_toggle(request, job_id):
    job = Job.objects.filter(id=job_id).first()
    if not job:
        return JsonResponse({"error": "Job not found."}, status=404)

    job.is_active = not job.is_active
    job.save(update_fields=["is_active", "updated_at"])
    return JsonResponse({"job": serialize_job(job), "isActive": job.is_active})


@require_http_methods(["GET"])
@require_admin_auth
def admin_applications(request):
    applications_list = Application.objects.select_related("job").all()
    return JsonResponse({"applications": [serialize_application(application, request) for application in applications_list]})


@require_http_methods(["GET"])
@require_admin_auth
def admin_application_resume(request, application_id):
    application = Application.objects.filter(id=application_id).first()
    if not application:
        raise Http404("Application not found.")

    filename = application.resume_filename or (application.resume.name.split("/")[-1] if application.resume else "resume")
    content_type = application.resume_content_type or mimetypes.guess_type(filename)[0] or "application/octet-stream"

    if application.resume_file:
        content = bytes(application.resume_file)
    elif application.resume:
        try:
            application.resume.open("rb")
            content = application.resume.read()
        except FileNotFoundError:
            return JsonResponse(
                {
                    "error": "Resume file is no longer available. Ask the candidate to submit the application again."
                },
                status=404,
            )
        finally:
            try:
                application.resume.close()
            except Exception:
                pass
    else:
        return JsonResponse({"error": "No resume uploaded for this application."}, status=404)

    response = HttpResponse(content, content_type=content_type)
    response["Content-Disposition"] = f'inline; filename="{quote(filename)}"'
    response["Cache-Control"] = "private, no-store"
    response["X-Content-Type-Options"] = "nosniff"
    return response


@csrf_exempt
@require_http_methods(["POST"])
@require_admin_auth
def admin_application_status(request, application_id):
    application = Application.objects.filter(id=application_id).first()
    if not application:
        return JsonResponse({"error": "Application not found."}, status=404)

    try:
        payload = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON."}, status=400)

    status = payload.get("status")
    valid_statuses = {choice[0] for choice in Application.STATUS_CHOICES}
    if status not in valid_statuses:
        return JsonResponse({"error": "Invalid status."}, status=400)

    old_status = application.status
    old_reason = application.status_reason
    application.status = status
    application.status_reason = (
        SELECTED_STATUS_MESSAGE
        if status == "selected"
        else payload.get("statusReason", application.status_reason)
    )
    application.notes = payload.get("notes", application.notes)
    application.save(update_fields=["status", "status_reason", "notes"])

    email_sent = False
    if application.status != old_status or application.status_reason != old_reason:
        try:
            email_sent = send_application_status_update(application)
        except Exception:
            email_sent = False

    return JsonResponse({"application": serialize_application(application, request), "emailSent": email_sent})


@csrf_exempt
@require_http_methods(["POST"])
@rate_limit("career-application", limit=5, window_seconds=900)
def applications(request):
    resume = request.FILES.get("resume")
    if not resume:
        return JsonResponse({"error": "Resume is required."}, status=400)
    if request.POST.get("applicationConsent") not in {"on", "true", "1"}:
        return JsonResponse({"error": "You must accept the Terms and Privacy Policy."}, status=400)
    resume_error = validate_resume(resume)
    if resume_error:
        return JsonResponse({"error": resume_error}, status=400)
    resume_content = resume.read()
    resume.seek(0)

    required_fields = [
        "name",
        "email",
        "phone",
        "currentAddress",
        "currentPostalCode",
        "permanentAddress",
        "permanentPostalCode",
        "relevantExperience",
        "totalExperience",
        "currentCtc",
        "expectedCtc",
        "role",
    ]
    missing = [field for field in required_fields if not request.POST.get(field)]
    if missing:
        return JsonResponse({"error": f"Missing fields: {', '.join(missing)}"}, status=400)

    postal_codes = {
        "Current PIN code": request.POST["currentPostalCode"].strip(),
        "Permanent PIN code": request.POST["permanentPostalCode"].strip(),
    }
    invalid_postal_codes = [label for label, value in postal_codes.items() if len(value) != 6 or not value.isdigit()]
    if invalid_postal_codes:
        return JsonResponse({"error": f"{', '.join(invalid_postal_codes)} must contain exactly 6 digits."}, status=400)

    job = None
    job_id = request.POST.get("jobId")
    if job_id:
        job = Job.objects.filter(id=job_id, is_active=True).first()

    application = Application.objects.create(
        job=job,
        role=request.POST["role"],
        name=request.POST["name"],
        email=request.POST["email"],
        phone=request.POST["phone"],
        current_address=request.POST["currentAddress"].strip(),
        current_postal_code=postal_codes["Current PIN code"],
        permanent_address=request.POST["permanentAddress"].strip(),
        permanent_postal_code=postal_codes["Permanent PIN code"],
        relevant_experience=request.POST["relevantExperience"],
        total_experience=request.POST["totalExperience"],
        current_ctc=request.POST["currentCtc"],
        expected_ctc=request.POST["expectedCtc"],
        career_gap=request.POST.get("careerGap", ""),
        message=request.POST.get("message", ""),
        resume=resume,
        resume_file=resume_content,
        resume_filename=resume.name,
        resume_content_type=getattr(resume, "content_type", "") or "application/octet-stream",
        consent_at=timezone.now(),
    )
    email_sent = False
    try:
        email_sent = send_application_confirmation(application)
    except Exception:
        email_sent = False

    return JsonResponse(
        {
            "id": application.id,
            "trackingId": get_application_number(application),
            "applicationNumber": get_application_number(application),
            "emailSent": email_sent,
            "message": "Application submitted.",
        },
        status=201,
    )


@csrf_exempt
@require_http_methods(["POST"])
@rate_limit("application-tracking", limit=20, window_seconds=900)
def track_application(request):
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON."}, status=400)

    tracking_id = get_application_id_from_number(payload.get("trackingId", ""))
    email = payload.get("email", "").strip()
    phone = payload.get("phone", "").strip()

    if not tracking_id or not email or not phone:
        return JsonResponse({"error": "Application number, email, and phone are required."}, status=400)

    application = Application.objects.filter(id=tracking_id, email__iexact=email, phone=phone).first()
    if not application:
        return JsonResponse({"error": "No application found with those details."}, status=404)

    return JsonResponse({"application": serialize_tracking_application(application)})


@csrf_exempt
@require_http_methods(["POST"])
@rate_limit("contact-inquiry", limit=5, window_seconds=900)
def inquiries(request):
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON."}, status=400)

    required_fields = ["name", "email", "phone", "service", "message"]
    missing = [field for field in required_fields if not payload.get(field)]
    if missing:
        return JsonResponse({"error": f"Missing fields: {', '.join(missing)}"}, status=400)
    if payload.get("privacyConsent") is not True:
        return JsonResponse({"error": "Privacy consent is required."}, status=400)

    inquiry = Inquiry.objects.create(
        name=payload["name"],
        email=payload["email"],
        phone=payload["phone"],
        service=payload["service"],
        message=payload["message"],
        consent_at=timezone.now(),
    )
    return JsonResponse({"id": inquiry.id, "message": "Inquiry submitted."}, status=201)
