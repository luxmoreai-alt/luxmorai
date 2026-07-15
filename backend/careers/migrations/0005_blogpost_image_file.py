from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("careers", "0004_blogpost"),
    ]

    operations = [
        migrations.AddField(
            model_name="blogpost",
            name="image_file",
            field=models.BinaryField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="blogpost",
            name="image_filename",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name="blogpost",
            name="image_content_type",
            field=models.CharField(blank=True, max_length=120),
        ),
    ]
