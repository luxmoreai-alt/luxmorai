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

Application confirmation and status emails use ZeptoMail SMTP. The sender address must be verified in your ZeptoMail agent. Set these environment variables before running Django:

```bash
EMAIL_HOST=smtp.zeptomail.in
EMAIL_PORT=587
EMAIL_USE_TLS=true
EMAIL_USE_SSL=false
EMAIL_HOST_USER=emailapikey
EMAIL_HOST_PASSWORD=your-zeptomail-smtp-password
DEFAULT_FROM_EMAIL=careers@luxmorai.com
FRONTEND_SITE_URL=https://yourdomain.com
```

Use either port `587` with TLS (shown above), or port `465` with
`EMAIL_USE_TLS=false` and `EMAIL_USE_SSL=true`. Never enable TLS and SSL at the
same time.
