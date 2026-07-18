from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("careers", "0005_blogpost_image_file"),
    ]

    operations = [
        migrations.AddField(
            model_name="application",
            name="current_address",
            field=models.TextField(default=""),
        ),
        migrations.AddField(
            model_name="application",
            name="current_postal_code",
            field=models.CharField(default="", max_length=6),
        ),
        migrations.AddField(
            model_name="application",
            name="permanent_address",
            field=models.TextField(default=""),
        ),
        migrations.AddField(
            model_name="application",
            name="permanent_postal_code",
            field=models.CharField(default="", max_length=6),
        ),
    ]
