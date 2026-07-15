import { Eye, EyeOff, FileText, LogOut, Pencil, Plus, RefreshCw, Upload, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ApiBlogPost,
  createAdminBlogPost,
  getAdminBlogPosts,
  toggleAdminBlogPost,
  updateAdminBlogPost,
} from "../lib/api";
import { useSeo } from "../lib/seo";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL ?? "careers@admin.com";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "Careers@admin@2026";
const BLOG_ADMIN_AUTH_KEY = "luxmorai-blog-admin-authenticated";

function parseKeywords(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function parseSections(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(/\n-{3,}\n/g)
    .map((block) => {
      const [headingLine, ...bodyLines] = block.trim().split("\n");
      return {
        heading: headingLine?.trim() ?? "",
        body: bodyLines.join("\n").trim(),
      };
    })
    .filter((section) => section.heading && section.body);
}

function formatSections(post: ApiBlogPost | null) {
  return post?.sections.map((section) => `${section.heading}\n${section.body}`).join("\n---\n") ?? "";
}

export function BlogAdmin() {
  useSeo({
    title: "Blog Admin | Luxmorai Technologies",
    description: "Private blog publishing panel for Luxmorai Technologies.",
    path: "/blog-admin",
    robots: "noindex, nofollow",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem(BLOG_ADMIN_AUTH_KEY) === "true");
  const [posts, setPosts] = useState<ApiBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingPost, setEditingPost] = useState<ApiBlogPost | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      toast.error("Invalid blog admin credentials.");
      return;
    }

    localStorage.setItem(BLOG_ADMIN_AUTH_KEY, "true");
    setIsAuthenticated(true);
    toast.success("Blog admin login successful.");
  }

  function logout() {
    localStorage.removeItem(BLOG_ADMIN_AUTH_KEY);
    setIsAuthenticated(false);
    setPosts([]);
  }

  async function loadPosts() {
    setLoading(true);
    try {
      setPosts(await getAdminBlogPosts());
    } catch {
      toast.error("Blog posts could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadPosts();
    }
  }, [isAuthenticated]);

  async function submitPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const sections = parseSections(data.get("sections"));

    if (sections.length === 0) {
      toast.error("Add at least one article section using the heading/body format.");
      return;
    }

    data.set("relatedKeywords", JSON.stringify(parseKeywords(data.get("relatedKeywords"))));
    data.set("sections", JSON.stringify(sections));
    data.set("isPublished", data.get("isPublished") === "on" ? "true" : "false");
    const selectedFile = data.get("imageFile");
    if (editingPost && !editingPost.imageUrl && data.get("image") && (!(selectedFile instanceof File) || !selectedFile.size)) {
      data.set("removeImage", "true");
    }

    setSaving(true);
    try {
      const post = editingPost
        ? await updateAdminBlogPost(editingPost.id, data)
        : await createAdminBlogPost(data);
      setPosts((current) =>
        editingPost ? current.map((item) => (item.id === post.id ? post : item)) : [post, ...current],
      );
      toast.success(editingPost ? "Blog post updated." : "Blog post saved.");
      form.reset();
      setEditingPost(null);
      setImagePreview("");
    } catch {
      toast.error("Blog post could not be saved.");
    } finally {
      setSaving(false);
    }
  }

  function startEditing(post: ApiBlogPost) {
    setEditingPost(post);
    setImagePreview(post.image);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEditing() {
    setEditingPost(null);
    setImagePreview("");
  }

  function previewImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setImagePreview(file ? URL.createObjectURL(file) : editingPost?.image ?? "");
  }

  async function togglePost(post: ApiBlogPost) {
    try {
      const result = await toggleAdminBlogPost(post.id);
      setPosts((current) => current.map((item) => (item.id === post.id ? result.post : item)));
      toast.success(result.isPublished ? "Blog post is published." : "Blog post is hidden.");
    } catch {
      toast.error("Blog post status could not be changed.");
    }
  }

  if (!isAuthenticated) {
    return (
      <section className="admin-page">
        <div className="admin-login-shell">
          <form className="admin-login-card" onSubmit={submitLogin}>
            <p className="eyebrow">Blog Admin</p>
            <h1>Blog Login</h1>
            <label>
              Email
              <input name="email" required type="email" autoComplete="username" />
            </label>
            <label>
              Password
              <input name="password" required type="password" autoComplete="current-password" />
            </label>
            <button className="primary-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-page">
      <div className="admin-shell">
        <div className="admin-hero">
          <div>
            <p className="eyebrow">Blog Admin</p>
            <h1>Publish Luxmorai blog articles</h1>
            <p>Create SEO-ready posts with images, keywords, summaries, article sections, and public draft control.</p>
          </div>
          <div className="admin-hero-actions">
            <button className="admin-icon-button" type="button" onClick={loadPosts} aria-label="Refresh blog posts">
              <RefreshCw />
            </button>
            <button className="admin-icon-button" type="button" onClick={logout} aria-label="Logout">
              <LogOut />
            </button>
          </div>
        </div>

        <div className="admin-stats">
          <div>
            <FileText />
            <span>Total posts</span>
            <strong>{posts.length}</strong>
          </div>
          <div>
            <Eye />
            <span>Published</span>
            <strong>{posts.filter((post) => post.isPublished).length}</strong>
          </div>
          <div>
            <EyeOff />
            <span>Drafts</span>
            <strong>{posts.filter((post) => !post.isPublished).length}</strong>
          </div>
        </div>

        {loading ? (
          <div className="admin-empty">Loading blog admin...</div>
        ) : (
          <div className="admin-grid blog-admin-grid">
            <form className="admin-form" key={editingPost?.id ?? "new"} onSubmit={submitPost}>
              <div className="blog-admin-form-heading">
                <h2>{editingPost ? "Edit Blog" : "Post a Blog"}</h2>
                {editingPost && (
                  <button className="admin-cancel-button" type="button" onClick={cancelEditing}>
                    <X className="h-4 w-4" /> Cancel
                  </button>
                )}
              </div>
              <input name="title" required defaultValue={editingPost?.title} placeholder="Blog title" />
              <input name="slug" defaultValue={editingPost?.slug} placeholder="SEO URL slug, optional" />
              <textarea name="description" required rows={3} defaultValue={editingPost?.description} placeholder="SEO description / card description" />
              <div className="admin-form-row">
                <input name="keyword" defaultValue={editingPost?.keyword} placeholder="Main keyword or category" />
                <input name="servicePath" defaultValue={editingPost?.servicePath ?? "/contact"} placeholder="CTA path, example /contact" />
              </div>
              <input name="relatedKeywords" defaultValue={editingPost?.relatedKeywords.join(", ")} placeholder="Related keywords, comma separated" />
              <input name="image" defaultValue={editingPost?.imageUrl} placeholder="Featured image URL (optional)" />
              <label className="blog-image-upload">
                <Upload className="h-5 w-5" />
                <span>
                  <strong>Upload from your computer</strong>
                  JPG, PNG, WebP or GIF, up to 5 MB
                </span>
                <input name="imageFile" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={previewImage} />
              </label>
              {imagePreview && <img className="blog-admin-image-preview" src={imagePreview} alt="Selected blog preview" />}
              <p className="admin-help">
                Upload a local image or enter a direct image URL. A newly uploaded file replaces the current image.
              </p>
              <input name="imageAlt" defaultValue={editingPost?.imageAlt} placeholder="Image alt text" />
              <textarea name="brief" rows={4} defaultValue={editingPost?.brief} placeholder="Brief overview shown inside the article" />
              <textarea
                name="sections"
                required
                rows={12}
                defaultValue={formatSections(editingPost)}
                placeholder={"Section heading\nSection body paragraph...\n---\nSecond section heading\nSecond section body paragraph..."}
              />
              <label className="admin-check">
                <input name="isPublished" type="checkbox" defaultChecked={editingPost?.isPublished ?? true} />
                Publish on blog page
              </label>
              <button className="primary-button" disabled={saving} type="submit">
                {editingPost ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {saving ? "Saving..." : editingPost ? "Save Changes" : "Publish Blog"}
              </button>
            </form>

            <div className="admin-list">
              <h2>Blog Posts</h2>
              {posts.length === 0 ? (
                <p className="admin-empty">No blog posts created yet.</p>
              ) : (
                posts.map((post) => (
                  <article className="admin-job-row" key={post.id}>
                    <div>
                      <strong>{post.title}</strong>
                      <span>
                        /blog/{post.slug} | {post.keyword || "No keyword"} | {post.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                    <div className="blog-admin-row-actions">
                      <button type="button" onClick={() => startEditing(post)}>
                        <Pencil className="h-4 w-4" /> Edit
                      </button>
                      <button type="button" onClick={() => togglePost(post)}>
                        {post.isPublished ? "Hide" : "Show"}
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
