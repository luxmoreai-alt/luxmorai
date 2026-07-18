from django.db import models


class Job(models.Model):
    title = models.CharField(max_length=160)
    category = models.CharField(max_length=80)
    experience = models.CharField(max_length=80)
    employment_type = models.CharField(max_length=80, default="Full time")
    location = models.CharField(max_length=120, blank=True)
    description = models.TextField(blank=True)
    requirements = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["category", "title"]

    def __str__(self):
        return self.title


class BlogPost(models.Model):
    title = models.CharField(max_length=220)
    slug = models.SlugField(max_length=240, unique=True)
    description = models.TextField()
    image = models.URLField(max_length=600, blank=True)
    image_file = models.BinaryField(blank=True, null=True)
    image_filename = models.CharField(max_length=255, blank=True)
    image_content_type = models.CharField(max_length=120, blank=True)
    image_alt = models.CharField(max_length=220, blank=True)
    brief = models.TextField(blank=True)
    keyword = models.CharField(max_length=120, blank=True)
    related_keywords = models.JSONField(default=list, blank=True)
    sections = models.JSONField(default=list, blank=True)
    service_path = models.CharField(max_length=160, default="/contact")
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at", "-created_at"]

    def __str__(self):
        return self.title


class Application(models.Model):
    STATUS_CHOICES = [
        ("new", "New"),
        ("reviewing", "Reviewing"),
        ("shortlisted", "Shortlisted"),
        ("selected", "Selected"),
        ("rejected", "Rejected"),
        ("hired", "Hired"),
    ]

    job = models.ForeignKey(Job, on_delete=models.SET_NULL, null=True, blank=True, related_name="applications")
    role = models.CharField(max_length=160)
    name = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=40)
    current_address = models.TextField(default="")
    current_postal_code = models.CharField(max_length=6, default="")
    permanent_address = models.TextField(default="")
    permanent_postal_code = models.CharField(max_length=6, default="")
    relevant_experience = models.CharField(max_length=80)
    total_experience = models.CharField(max_length=80)
    current_ctc = models.CharField(max_length=80)
    expected_ctc = models.CharField(max_length=80)
    career_gap = models.CharField(max_length=255, blank=True)
    message = models.TextField(blank=True)
    resume = models.FileField(upload_to="resumes/")
    resume_file = models.BinaryField(blank=True, null=True)
    resume_filename = models.CharField(max_length=255, blank=True)
    resume_content_type = models.CharField(max_length=120, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    status_reason = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    consent_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.role}"


class Inquiry(models.Model):
    name = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=40)
    service = models.CharField(max_length=160)
    message = models.TextField()
    consent_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "inquiries"

    def __str__(self):
        return f"{self.name} - {self.service}"
