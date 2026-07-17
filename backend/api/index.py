import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "luxbackend.settings")

from django.core.wsgi import get_wsgi_application

app = get_wsgi_application()

from django.contrib.auth import get_user_model
from django.core.management import call_command


def bootstrap_admin_user():
    call_command("migrate", interactive=False, verbosity=0)

    username = os.environ.get("DJANGO_ADMIN_USERNAME", "careers@admin.com")
    password = os.environ.get("DJANGO_ADMIN_PASSWORD")
    email = os.environ.get("DJANGO_ADMIN_EMAIL", username)

    if not password:
        return

    User = get_user_model()
    user, _ = User.objects.get_or_create(username=username, defaults={"email": email})
    user.email = email
    user.is_staff = True
    user.is_superuser = True
    user.set_password(password)
    user.save()


bootstrap_admin_user()
