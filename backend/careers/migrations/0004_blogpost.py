from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("careers", "0003_application_resume_storage"),
    ]

    operations = [
        migrations.CreateModel(
            name="BlogPost",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=220)),
                ("slug", models.SlugField(max_length=240, unique=True)),
                ("description", models.TextField()),
                ("image", models.URLField(blank=True, max_length=600)),
                ("image_alt", models.CharField(blank=True, max_length=220)),
                ("brief", models.TextField(blank=True)),
                ("keyword", models.CharField(blank=True, max_length=120)),
                ("related_keywords", models.JSONField(blank=True, default=list)),
                ("sections", models.JSONField(blank=True, default=list)),
                ("service_path", models.CharField(default="/contact", max_length=160)),
                ("is_published", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "ordering": ["-updated_at", "-created_at"],
            },
        ),
    ]
