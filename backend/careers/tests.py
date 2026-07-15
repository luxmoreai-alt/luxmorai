import json

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from .models import BlogPost


class BlogAdminApiTests(TestCase):
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
