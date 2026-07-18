from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("careers", "0007_alter_application_status"),
    ]

    operations = [
        migrations.AddField(
            model_name="application",
            name="consent_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="inquiry",
            name="consent_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
