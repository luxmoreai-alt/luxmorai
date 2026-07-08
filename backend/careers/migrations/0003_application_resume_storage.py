from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("careers", "0002_application_status_reason"),
    ]

    operations = [
        migrations.AddField(
            model_name="application",
            name="resume_content_type",
            field=models.CharField(blank=True, max_length=120),
        ),
        migrations.AddField(
            model_name="application",
            name="resume_file",
            field=models.BinaryField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="application",
            name="resume_filename",
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
