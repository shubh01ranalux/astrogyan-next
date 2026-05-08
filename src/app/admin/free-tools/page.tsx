"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { createClient } from "@/lib/supabase/client";

type FreeTool = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  icon: string | null;
  button_text: string | null;
  link: string | null;
  status: string;
  is_active: boolean;
  display_order: number | null;
};

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  category: "Astrology",
  icon: "✦",
  button_text: "Open Tool",
  link: "",
  status: "Coming Soon",
  is_active: true,
  display_order: "0",
};

export default function AdminFreeToolsPage() {
  const supabase = createClient();

  const [tools, setTools] = useState<FreeTool[]>([]);
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

  async function fetchTools() {
    setLoading(true);

    const { data, error } = await supabase
      .from("free_tools")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data) setTools(data);

    setLoading(false);
  }

  useEffect(() => {
    fetchTools();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      slug: form.slug || makeSlug(form.title),
      description: form.description,
      category: form.category,
      icon: form.icon,
      button_text: form.button_text,
      link: form.link || null,
      status: form.status,
      is_active: form.is_active,
      display_order: Number(form.display_order || 0),
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      await supabase
        .from("free_tools")
        .update(payload)
        .eq("id", editingId);
    } else {
      await supabase
        .from("free_tools")
        .insert(payload);
    }

    setForm(emptyForm);
    setEditingId(null);
    setSaving(false);

    fetchTools();
  }

  function handleEdit(tool: FreeTool) {
    setEditingId(tool.id);

    setForm({
      title: tool.title,
      slug: tool.slug,
      description: tool.description,
      category: tool.category,
      icon: tool.icon || "✦",
      button_text: tool.button_text || "Open Tool",
      link: tool.link || "",
      status: tool.status,
      is_active: tool.is_active,
      display_order: String(tool.display_order || 0),
    });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this tool?")) return;

    await supabase
      .from("free_tools")
      .delete()
      .eq("id", id);

    fetchTools();
  }

  async function toggleActive(tool: FreeTool) {
    await supabase
      .from("free_tools")
      .update({
        is_active: !tool.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", tool.id);

    fetchTools();
  }

  return (
    <AdminLayout
      title="Free Tools"
      description="Manage Astrogyan free tools, calculators, and spiritual utilities."
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">

        <form
          onSubmit={handleSubmit}
          className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/65 p-6 shadow-sm backdrop-blur-md"
        >
          <h2 className="font-display text-3xl text-[#5C3A57]">
            {editingId ? "Edit Tool" : "Add Tool"}
          </h2>

          <div className="mt-6 space-y-4">

            <input
              className="field"
              placeholder="Tool title"
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
              onChange={(e) =>
                setForm({
                  ...form,
                  slug: e.target.value,
                })
              }
              required
            />

            <textarea
              className="field min-h-32 resize-none rounded-[1.5rem]"
              placeholder="Tool description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              required
            />

            <div className="grid gap-4 sm:grid-cols-2">

              <input
                className="field"
                placeholder="Category"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
              />

              <input
                className="field"
                placeholder="Icon"
                value={form.icon}
                onChange={(e) =>
                  setForm({
                    ...form,
                    icon: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <input
                className="field"
                placeholder="Button text"
                value={form.button_text}
                onChange={(e) =>
                  setForm({
                    ...form,
                    button_text: e.target.value,
                  })
                }
              />

              <input
                className="field"
                placeholder="Tool link"
                value={form.link}
                onChange={(e) =>
                  setForm({
                    ...form,
                    link: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <select
                className="field"
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value,
                  })
                }
              >
                <option>Coming Soon</option>
                <option>Live</option>
                <option>Beta</option>
              </select>

              <input
                className="field"
                type="number"
                placeholder="Display order"
                value={form.display_order}
                onChange={(e) =>
                  setForm({
                    ...form,
                    display_order: e.target.value,
                  })
                }
              />
            </div>

            <label className="flex items-center gap-3 text-[#5C3A57]">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) =>
                  setForm({
                    ...form,
                    is_active: e.target.checked,
                  })
                }
              />
              Active tool
            </label>

            <div className="flex flex-wrap gap-3">

              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-[#5C3A57] px-6 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Tool"
                  : "Add Tool"}
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
            Existing Tools
          </h2>

          <div className="mt-6 space-y-4">

            {loading && (
              <p className="text-[#6F5B69]">
                Loading tools...
              </p>
            )}

            {!loading &&
              tools.length === 0 && (
                <p className="text-[#6F5B69]">
                  No tools added yet.
                </p>
              )}

            {tools.map((tool) => (
              <div
                key={tool.id}
                className="rounded-[1.25rem] border border-[#E6C89C]/35 bg-[#F6EEE8]/70 p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                  <div>

                    <div className="flex items-center gap-3">

                      <span className="text-2xl">
                        {tool.icon || "✦"}
                      </span>

                      <h3 className="font-display text-2xl text-[#5C3A57]">
                        {tool.title}
                      </h3>

                      <span className="rounded-full bg-[#D8A7B1]/25 px-3 py-1 text-xs text-[#5C3A57]">
                        {tool.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-[#B784A7]">
                      /free-tools/{tool.slug}
                    </p>

                    <p className="mt-3 leading-7 text-[#6F5B69]">
                      {tool.description}
                    </p>

                    <p className="mt-3 text-sm text-[#5C3A57]">
                      {tool.category} · Order:{" "}
                      {tool.display_order || 0}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">

                    <button
                      onClick={() => handleEdit(tool)}
                      className="rounded-full border border-[#5C3A57]/20 px-4 py-2 text-sm text-[#5C3A57]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => toggleActive(tool)}
                      className="rounded-full border border-[#E6C89C]/60 px-4 py-2 text-sm text-[#5C3A57]"
                    >
                      {tool.is_active
                        ? "Hide"
                        : "Show"}
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(tool.id)
                      }
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