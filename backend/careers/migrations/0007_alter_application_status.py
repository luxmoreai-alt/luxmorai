from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("careers", "0006_application_addresses"),
    ]

    operations = [
        migrations.AlterField(
            model_name="application",
            name="status",
            field=models.CharField(
                choices=[
                    ("new", "New"),
                    ("reviewing", "Reviewing"),
                    ("shortlisted", "Shortlisted"),
                    ("selected", "Selected"),
                    ("rejected", "Rejected"),
                    ("hired", "Hired"),
                ],
                default="new",
                max_length=20,
            ),
        ),
    ]
