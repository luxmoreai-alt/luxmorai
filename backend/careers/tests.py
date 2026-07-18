import json
from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from .models import Application, BlogPost, Job
from .security import create_admin_token


class AdminApiTestCase(TestCase):
    def setUp(self):
        super().setUp()
        self.admin_user = get_user_model().objects.create_superuser(
            username="admin@example.com",
            email="admin@example.com",
            password="Strong-Test-Password-2026!",
        )
        self.client.defaults["HTTP_AUTHORIZATION"] = f"Bearer {create_admin_token(self.admin_user)}"


class BlogAdminApiTests(AdminApiTestCase):
    def blog_form(self, **overrides):
        data = {
            "title": "Local image post",
            "slug": "local-image-post",
            "description": "A post created by the blog admin.",
            "image": "",
            "imageAlt": "Example image",
            "brief": "Overview",
            "keyword": "Testing",
            "relatedKeywords": json.dumps(["blog", "image"]),
            "sections": json.dumps([{"heading": "First section", "body": "Section content"}]),
            "servicePath": "/contact",
            "isPublished": "true",
        }
        data.update(overrides)
        return data

    def test_create_post_with_local_image_and_serve_it(self):
        image = SimpleUploadedFile("cover.gif", b"GIF89a-test-image", content_type="image/gif")
        response = self.client.post("/api/admin/blog-posts/", self.blog_form(imageFile=image))

        self.assertEqual(response.status_code, 201)
        post = BlogPost.objects.get()
        self.assertEqual(post.image_filename, "cover.gif")
        self.assertTrue(post.image_file)
        self.assertIn(f"/api/blog-posts/{post.id}/image/", response.json()["post"]["image"])

        image_response = self.client.get(f"/api/blog-posts/{post.id}/image/")
        self.assertEqual(image_response.status_code, 200)
        self.assertEqual(image_response["Content-Type"], "image/gif")

    def test_edit_post_preserves_uploaded_image(self):
        post = BlogPost.objects.create(
            title="Old title",
            slug="old-title",
            description="Old description",
            image_file=b"GIF89a-test-image",
            image_filename="cover.gif",
            image_content_type="image/gif",
        )

        response = self.client.post(
            f"/api/admin/blog-posts/{post.id}/",
            self.blog_form(title="Updated title", slug="updated-title"),
        )

        self.assertEqual(response.status_code, 200)
        post.refresh_from_db()
        self.assertEqual(post.title, "Updated title")
        self.assertEqual(post.slug, "updated-title")
        self.assertTrue(post.image_file)


class ApplicationStatusApiTests(AdminApiTestCase):
    @patch("careers.views.send_application_status_update", return_value=True)
    def test_selected_status_uses_offer_letter_message(self, send_status_email):
        application = Application.objects.create(
            role="Software Developer",
            name="Selected Candidate",
            email="candidate@example.com",
            phone="9876543210",
            current_address="Current address",
            current_postal_code="500016",
            permanent_address="Permanent address",
            permanent_postal_code="500017",
            relevant_experience="2 years",
            total_experience="3 years",
            current_ctc="5 LPA",
            expected_ctc="7 LPA",
            resume="resumes/test.pdf",
        )

        response = self.client.post(
            f"/api/admin/applications/{application.id}/status/",
            data=json.dumps({"status": "selected", "statusReason": ""}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        application.refresh_from_db()
        self.assertEqual(application.status, "selected")
        self.assertIn("offer letter will be released within one business day", application.status_reason)
        send_status_email.assert_called_once_with(application)


class ConsentApiTests(TestCase):
    def test_contact_inquiry_requires_privacy_consent(self):
        response = self.client.post(
            "/api/inquiries/",
            data=json.dumps(
                {
                    "name": "Website Visitor",
                    "email": "visitor@example.com",
                    "phone": "9876543210",
                    "service": "Software Development",
                    "message": "Project inquiry",
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"], "Privacy consent is required.")

    def test_career_application_requires_terms_and_privacy_consent(self):
        resume = SimpleUploadedFile("resume.pdf", b"test resume", content_type="application/pdf")
        response = self.client.post("/api/applications/", {"resume": resume})

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"], "You must accept the Terms and Privacy Policy.")


class AdminAuthenticationApiTests(TestCase):
    def setUp(self):
        super().setUp()
        self.password = "Strong-Test-Password-2026!"
        self.user = get_user_model().objects.create_superuser(
            username="admin@example.com",
            email="admin@example.com",
            password=self.password,
        )

    def test_every_admin_data_route_is_rejected_without_token(self):
        job = Job.objects.create(title="Private job", category="IT", experience="2 years")
        post = BlogPost.objects.create(title="Private post", slug="private-post", description="Private")
        application = Application.objects.create(
            role="Developer",
            name="Private Candidate",
            email="private@example.com",
            phone="9876543210",
            current_address="Current",
            current_postal_code="500016",
            permanent_address="Permanent",
            permanent_postal_code="500017",
            relevant_experience="2 years",
            total_experience="3 years",
            current_ctc="5 LPA",
            expected_ctc="7 LPA",
            resume="resumes/private.pdf",
        )
        routes = [
            ("get", "/api/admin/auth/session/"),
            ("get", "/api/admin/blog-posts/"),
            ("post", "/api/admin/blog-posts/"),
            ("post", f"/api/admin/blog-posts/{post.id}/"),
            ("post", f"/api/admin/blog-posts/{post.id}/toggle/"),
            ("get", "/api/admin/jobs/"),
            ("post", "/api/admin/jobs/"),
            ("post", f"/api/admin/jobs/{job.id}/toggle/"),
            ("get", "/api/admin/applications/"),
            ("get", f"/api/admin/applications/{application.id}/resume/"),
            ("post", f"/api/admin/applications/{application.id}/status/"),
        ]

        for method, path in routes:
            with self.subTest(method=method, path=path):
                response = getattr(self.client, method)(path, content_type="application/json")
                self.assertEqual(response.status_code, 401)
                self.assertEqual(response.json()["error"], "Authentication required.")

    def test_login_returns_token_that_authorizes_admin_api(self):
        login = self.client.post(
            "/api/admin/auth/login/",
            data=json.dumps({"email": self.user.username, "password": self.password}),
            content_type="application/json",
        )

        self.assertEqual(login.status_code, 200)
        token = login.json()["token"]
        response = self.client.get("/api/admin/applications/", HTTP_AUTHORIZATION=f"Bearer {token}")
        self.assertEqual(response.status_code, 200)
