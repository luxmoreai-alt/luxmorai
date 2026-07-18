from django.contrib import admin
from django.utils.html import format_html

from .models import Application, BlogPost, Inquiry, Job


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "experience", "employment_type", "is_active", "updated_at")
    list_filter = ("category", "employment_type", "is_active")
    search_fields = ("title", "category", "description", "requirements")
    ordering = ("category", "title")


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "role", "email", "phone", "status", "created_at", "resume_link")
    list_filter = ("status", "role", "created_at")
    search_fields = (
        "name",
        "email",
        "phone",
        "role",
        "current_address",
        "current_postal_code",
        "permanent_address",
        "permanent_postal_code",
    )
    readonly_fields = ("created_at", "consent_at", "resume_link")

    @admin.display(description="Resume")
    def resume_link(self, obj):
        if not obj.resume:
            return "-"
        return format_html('<a href="{}" target="_blank" rel="noopener">View resume</a>', obj.resume.url)


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "keyword", "is_published", "updated_at")
    list_filter = ("is_published", "created_at", "updated_at")
    search_fields = ("title", "slug", "description", "keyword")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "service", "email", "phone", "created_at")
    list_filter = ("service", "created_at")
    search_fields = ("name", "email", "phone", "service", "message")
    readonly_fields = ("created_at", "consent_at")
