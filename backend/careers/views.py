import json
import re

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .email import send_application_confirmation, send_application_status_update
from .models import Application, Inquiry, Job

APPLICATION_NUMBER_PREFIX = "9840570"


def get_application_number(application):
    return f"{APPLICATION_NUMBER_PREFIX}{application.id}"


def get_application_id_from_number(value):
    number = re.sub(r"\D", "", str(value))
    if number.startswith(APPLICATION_NUMBER_PREFIX):
        return number[len(APPLICATION_NUMBER_PREFIX):]
    return number


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


def serialize_application(application, request):
    resume_url = request.build_absolute_uri(application.resume.url) if application.resume else ""
    return {
        "id": application.id,
        "applicationNumber": get_application_number(application),
        "jobId": application.job_id,
        "role": application.role,
        "name": application.name,
        "email": application.email,
        "phone": application.phone,
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


@csrf_exempt
@require_http_methods(["GET", "POST"])
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
def admin_job_toggle(request, job_id):
    job = Job.objects.filter(id=job_id).first()
    if not job:
        return JsonResponse({"error": "Job not found."}, status=404)

    job.is_active = not job.is_active
    job.save(update_fields=["is_active", "updated_at"])
    return JsonResponse({"job": serialize_job(job), "isActive": job.is_active})


@require_http_methods(["GET"])
def admin_applications(request):
    applications_list = Application.objects.select_related("job").all()
    return JsonResponse({"applications": [serialize_application(application, request) for application in applications_list]})


@csrf_exempt
@require_http_methods(["POST"])
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
    application.status_reason = payload.get("statusReason", application.status_reason)
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
def applications(request):
    resume = request.FILES.get("resume")
    if not resume:
        return JsonResponse({"error": "Resume is required."}, status=400)

    required_fields = [
        "name",
        "email",
        "phone",
        "relevantExperience",
        "totalExperience",
        "currentCtc",
        "expectedCtc",
        "role",
    ]
    missing = [field for field in required_fields if not request.POST.get(field)]
    if missing:
        return JsonResponse({"error": f"Missing fields: {', '.join(missing)}"}, status=400)

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
        relevant_experience=request.POST["relevantExperience"],
        total_experience=request.POST["totalExperience"],
        current_ctc=request.POST["currentCtc"],
        expected_ctc=request.POST["expectedCtc"],
        career_gap=request.POST.get("careerGap", ""),
        message=request.POST.get("message", ""),
        resume=resume,
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
def inquiries(request):
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON."}, status=400)

    required_fields = ["name", "email", "phone", "service", "message"]
    missing = [field for field in required_fields if not payload.get(field)]
    if missing:
        return JsonResponse({"error": f"Missing fields: {', '.join(missing)}"}, status=400)

    inquiry = Inquiry.objects.create(
        name=payload["name"],
        email=payload["email"],
        phone=payload["phone"],
        service=payload["service"],
        message=payload["message"],
    )
    return JsonResponse({"id": inquiry.id, "message": "Inquiry submitted."}, status=201)
