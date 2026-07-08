# Luxmorai Django Backend

This backend powers careers job posts, applications with resume uploads, and contact inquiries.

## Local setup

```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Admin panel: `http://127.0.0.1:8000/admin/`

Frontend API URL:

```bash
VITE_API_URL=http://127.0.0.1:8000/api
```

## Email settings

Application confirmation emails use Zoho SMTP. Set these environment variables before running Django:

```bash
EMAIL_HOST=smtp.zoho.in
EMAIL_PORT=587
EMAIL_USE_TLS=true
EMAIL_HOST_USER=careers@luxmorai.com
EMAIL_HOST_PASSWORD=your-zoho-app-password
DEFAULT_FROM_EMAIL=careers@luxmorai.com
FRONTEND_SITE_URL=https://yourdomain.com
```
