from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

APPLICATION_NUMBER_PREFIX = "9840570"


def get_application_number(application):
    return f"{APPLICATION_NUMBER_PREFIX}{application.id}"


def get_email_context(application):
    site_url = settings.FRONTEND_SITE_URL.rstrip("/")
    track_url = f"{site_url}/careers#career-track"
    return {
        "application": application,
        "application_number": get_application_number(application),
        "track_url": track_url,
        "logo_url": f"{site_url}/luxmorai-logo.png",
        "careers_url": f"{site_url}/careers",
        "contact_url": "mailto:hr@luxmorai.com",
    }


def send_career_email(application, subject, template_name):
    if not settings.EMAIL_HOST_PASSWORD:
        return False

    context = get_email_context(application)
    html_body = render_to_string("careers/application_confirmation.html", context)
    if template_name:
        html_body = render_to_string(template_name, context)
    text_body = strip_tags(html_body)

    message = EmailMultiAlternatives(
        subject=subject,
        body=text_body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[application.email],
        reply_to=[settings.DEFAULT_FROM_EMAIL],
    )
    message.attach_alternative(html_body, "text/html")
    message.send()
    return True


def send_application_confirmation(application):
    return send_career_email(
        application,
        f"Luxmorai application received - {get_application_number(application)}",
        "careers/application_confirmation.html",
    )


def send_application_status_update(application):
    return send_career_email(
        application,
        f"Luxmorai application status update - {get_application_number(application)}",
        "careers/application_status_update.html",
    )
