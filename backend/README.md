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

The frontend always uses the same-origin `/api` path. The Vite development server
proxies that path to Django on `http://127.0.0.1:8000`, while the frontend Vercel
project proxies it to the deployed backend. Do not add backend hostnames to public
`VITE_*` environment variables.

## Required production security settings

Set these in the backend Vercel project before deployment:

```bash
DJANGO_ENV=production
DJANGO_DEBUG=false
DJANGO_SECRET_KEY=generate-a-long-random-secret
DJANGO_ALLOWED_HOSTS=luxmoraiback.vercel.app
FRONTEND_ORIGINS=https://luxmorai.com,https://www.luxmorai.com
DATABASE_URL=postgresql://database-user:database-password@database-host/database-name?sslmode=require
FRONTEND_SITE_URL=https://www.luxmorai.com
DJANGO_ADMIN_USERNAME=your-admin-email
DJANGO_ADMIN_PASSWORD=use-a-unique-strong-password
DJANGO_ADMIN_EMAIL=your-admin-email
ENABLE_DJANGO_ADMIN=false
```

Generate `DJANGO_SECRET_KEY` locally, copy the output directly into the backend
Vercel environment settings, and redeploy. Never commit the generated value:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

The Careers and Blog admin interfaces authenticate against Django and receive a
short-lived signed token. Frontend environment variables are never suitable for
passwords because all `VITE_*` values are included in the public browser bundle.

## Email settings

Application confirmation and status emails use ZeptoMail SMTP. The sender address must be verified in your ZeptoMail agent. Set these environment variables before running Django:

```bash
ZEPTOMAIL_SMTP_HOST=smtp.zeptomail.in
ZEPTOMAIL_SMTP_PORT=587
ZEPTOMAIL_USE_TLS=true
ZEPTOMAIL_USE_SSL=false
ZEPTOMAIL_SMTP_USER=emailapikey
ZEPTOMAIL_SMTP_PASSWORD=your-zeptomail-smtp-password
DEFAULT_FROM_EMAIL=careers@luxmorai.com
FRONTEND_SITE_URL=https://yourdomain.com
```

Use either port `587` with TLS (shown above), or port `465` with
`ZEPTOMAIL_USE_TLS=false` and `ZEPTOMAIL_USE_SSL=true`. Never enable TLS and SSL at the
same time.
