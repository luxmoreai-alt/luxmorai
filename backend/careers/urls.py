from django.urls import path

from . import views

urlpatterns = [
    path("jobs/", views.jobs, name="jobs"),
    path("applications/", views.applications, name="applications"),
    path("applications/track/", views.track_application, name="track_application"),
    path("inquiries/", views.inquiries, name="inquiries"),
    path("admin/jobs/", views.admin_jobs, name="admin_jobs"),
    path("admin/jobs/<int:job_id>/toggle/", views.admin_job_toggle, name="admin_job_toggle"),
    path("admin/applications/", views.admin_applications, name="admin_applications"),
    path(
        "admin/applications/<int:application_id>/status/",
        views.admin_application_status,
        name="admin_application_status",
    ),
]
