"use client";

import ImageUpload from "@/components/admin/ImageUpload";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { createClient } from "@/lib/supabase/client";

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string | null;
  tags: string[] | null;
  is_published: boolean;
  cta_title: string | null;
  cta_description: string | null;
  cta_label: string | null;
  cta_url: string | null;
};

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  category: "Astrology",
  tags: "",
  is_published: false,
  cta_title: "",
  cta_description: "",
  cta_label: "",
  cta_url: "",
};

export default function AdminBlogsPage() {
  const supabase = createClient();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  function makeSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function fetchBlogs() {
    setLoading(true);

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setBlogs(data as Blog[]);

    setLoading(false);
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      slug: form.slug || makeSlug(form.title),
      excerpt: form.excerpt,
      content: form.content,
      cover_image: form.cover_image,
      category: form.category,
      tags: form.tags
        ? form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
      is_published: form.is_published,
      cta_title: form.cta_title,
      cta_description: form.cta_description,
      cta_label: form.cta_label,
      cta_url: form.cta_url,
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      await supabase.from("blogs").update(payload).eq("id", editingId);
    } else {
      await supabase.from("blogs").insert(payload);
    }

    setForm(emptyForm);
    setEditingId(null);
    setSaving(false);
    fetchBlogs();
  }

  function handleEdit(blog: Blog) {
    setEditingId(blog.id);
    setForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      content: blog.content,
      cover_image: blog.cover_image || "",
      category: blog.category || "Astrology",
      tags: blog.tags?.join(", ") || "",
      is_published: blog.is_published,
      cta_title: blog.cta_title || "",
      cta_description: blog.cta_description || "",
      cta_label: blog.cta_label || "",
      cta_url: blog.cta_url || "",
    });
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Delete this blog?");
    if (!confirmDelete) return;

    await supabase.from("blogs").delete().eq("id", id);
    fetchBlogs();
  }

  async function togglePublish(blog: Blog) {
    await supabase
      .from("blogs")
      .update({
        is_published: !blog.is_published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", blog.id);

    fetchBlogs();
  }

  return (
    <AdminLayout
      title="Blogs"
      description="Create, edit, publish, and manage SEO content for Astrogyan."
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/65 p-6 shadow-sm backdrop-blur-md"
        >
          <h2 className="font-display text-3xl text-[#5C3A57]">
            {editingId ? "Edit Blog" : "Add Blog"}
          </h2>

          <div className="mt-6 space-y-4">
            <input
              className="field"
              placeholder="Blog title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                  slug: makeSlug(e.target.value),
                })
              }
              required
            />

            <input
              className="field"
              placeholder="Slug"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
            />

            <input
              className="field"
              placeholder="Short excerpt"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            />

            <ImageUpload
              value={form.cover_image}
              onChange={(url) => setForm({ ...form, cover_image: url })}
              folder="blogs"
            />

            <input
              className="field"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <input
              className="field"
              placeholder="Tags separated by comma"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />

            <textarea
              className="field min-h-72 resize-none rounded-[0.4rem]"
              placeholder="Write blog content. Use ## for headings, - for bullets, [text](link) for links."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />

            <div className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/70 p-5">
              <h3 className="font-display text-2xl text-[#5C3A57]">
                Blog CTA Section
              </h3>

              <p className="mt-2 text-sm text-[#6F5B69]">
                Optional call-to-action shown at the end of this blog. Leave
                empty if this blog does not need a CTA.
              </p>

              <div className="mt-5 grid gap-4">
                <input
                  className="field w-full"
                  placeholder="CTA Title, e.g. Want to check this in your Kundli?"
                  value={form.cta_title}
                  onChange={(e) =>
                    setForm({ ...form, cta_title: e.target.value })
                  }
                />

                <textarea
                  className="field min-h-28 w-full resize-none"
                  placeholder="CTA Description"
                  value={form.cta_description}
                  onChange={(e) =>
                    setForm({ ...form, cta_description: e.target.value })
                  }
                />

                <input
                  className="field w-full"
                  placeholder="Button Label, e.g. Generate Free Kundli"
                  value={form.cta_label}
                  onChange={(e) =>
                    setForm({ ...form, cta_label: e.target.value })
                  }
                />

                <input
                  className="field w-full"
                  placeholder="CTA URL, e.g. /free-tools/kundali-report"
                  value={form.cta_url}
                  onChange={(e) =>
                    setForm({ ...form, cta_url: e.target.value })
                  }
                />
              </div>
            </div>

            <label className="flex items-center gap-3 text-[#5C3A57]">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) =>
                  setForm({ ...form, is_published: e.target.checked })
                }
              />
              Publish blog
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-[#5C3A57] px-6 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:opacity-60"
              >
                {saving ? "Saving..." : editingId ? "Update Blog" : "Add Blog"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                  className="rounded-full border border-[#5C3A57]/20 px-6 py-3 text-sm text-[#5C3A57]"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/65 p-6 shadow-sm backdrop-blur-md">
          <h2 className="font-display text-3xl text-[#5C3A57]">
            Existing Blogs
          </h2>

          <div className="mt-6 space-y-4">
            {loading && <p className="text-[#6F5B69]">Loading blogs...</p>}

            {!loading && blogs.length === 0 && (
              <p className="text-[#6F5B69]">No blogs added yet.</p>
            )}

            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="rounded-[1.25rem] border border-[#E6C89C]/35 bg-[#F6EEE8]/70 p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-2xl text-[#5C3A57]">
                        {blog.title}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          blog.is_published
                            ? "bg-[#7FB8B4]/25 text-[#315C58]"
                            : "bg-[#D8A7B1]/30 text-[#5C3A57]"
                        }`}
                      >
                        {blog.is_published ? "Published" : "Draft"}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-[#B784A7]">
                      /blog/{blog.slug}
                    </p>

                    <p className="mt-3 leading-7 text-[#6F5B69]">
                      {blog.excerpt || "No excerpt added."}
                    </p>

                    {blog.cta_title && (
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#B784A7]">
                        CTA Added
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="rounded-full border border-[#5C3A57]/20 px-4 py-2 text-sm text-[#5C3A57]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => togglePublish(blog)}
                      className="rounded-full border border-[#E6C89C]/60 px-4 py-2 text-sm text-[#5C3A57]"
                    >
                      {blog.is_published ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="rounded-full bg-red-100 px-4 py-2 text-sm text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 