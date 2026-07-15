from django.urls import path

from . import views

urlpatterns = [
    path("jobs/", views.jobs, name="jobs"),
    path("blog-posts/", views.blog_posts, name="blog_posts"),
    path("blog-posts/<slug:slug>/", views.blog_post_detail, name="blog_post_detail"),
    path("blog-posts/<int:post_id>/image/", views.blog_post_image, name="blog_post_image"),
    path("applications/", views.applications, name="applications"),
    path("applications/track/", views.track_application, name="track_application"),
    path("inquiries/", views.inquiries, name="inquiries"),
    path("admin/blog-posts/", views.admin_blog_posts, name="admin_blog_posts"),
    path("admin/blog-posts/<int:post_id>/", views.admin_blog_post_detail, name="admin_blog_post_detail"),
    path("admin/blog-posts/<int:post_id>/toggle/", views.admin_blog_post_toggle, name="admin_blog_post_toggle"),
    path("admin/jobs/", views.admin_jobs, name="admin_jobs"),
    path("admin/jobs/<int:job_id>/toggle/", views.admin_job_toggle, name="admin_job_toggle"),
    path("admin/applications/", views.admin_applications, name="admin_applications"),
    path("admin/applications/<int:application_id>/resume/", views.admin_application_resume, name="admin_application_resume"),
    path(
        "admin/applications/<int:application_id>/status/",
        views.admin_application_status,
        name="admin_application_status",
    ),
]
