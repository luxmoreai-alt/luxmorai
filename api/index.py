import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
BACKEND_DIR = BASE_DIR / "backend"

if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "luxbackend.settings")

from django.core.wsgi import get_wsgi_application

app = get_wsgi_application()

from django.contrib.auth import get_user_model
from django.core.management import call_command


def bootstrap_admin_user():
    call_command("migrate", interactive=False, verbosity=0)

    username = os.environ.get("DJANGO_ADMIN_USERNAME", "careers@admin.com")
    password = os.environ.get("DJANGO_ADMIN_PASSWORD", "Careers@admin@2026")
    email = os.environ.get("DJANGO_ADMIN_EMAIL", username)

    User = get_user_model()
    user, _ = User.objects.get_or_create(username=username, defaults={"email": email})
    user.email = email
    user.is_staff = True
    user.is_superuser = True
    user.set_password(password)
    user.save()


bootstrap_admin_user()
