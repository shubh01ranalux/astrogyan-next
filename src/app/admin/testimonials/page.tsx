"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { createClient } from "@/lib/supabase/client";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  text: string;
  rating: number;
  is_active: boolean;
  display_order: number | null;
};

const emptyForm = {
  name: "",
  role: "",
  text: "",
  rating: "5",
  is_active: true,
  display_order: "0",
};

export default function AdminTestimonialsPage() {
  const supabase = createClient();

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function fetchTestimonials() {
    setLoading(true);

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data) setTestimonials(data);

    setLoading(false);
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSaving(true);

    const payload = {
      name: form.name,
      role: form.role,
      text: form.text,
      rating: Number(form.rating),
      is_active: form.is_active,
      display_order: Number(form.display_order || 0),
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      await supabase
        .from("testimonials")
        .update(payload)
        .eq("id", editingId);
    } else {
      await supabase
        .from("testimonials")
        .insert(payload);
    }

    setForm(emptyForm);
    setEditingId(null);
    setSaving(false);

    fetchTestimonials();
  }

  function handleEdit(item: Testimonial) {
    setEditingId(item.id);

    setForm({
      name: item.name,
      role: item.role || "",
      text: item.text,
      rating: String(item.rating),
      is_active: item.is_active,
      display_order: String(item.display_order || 0),
    });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;

    await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    fetchTestimonials();
  }

  async function toggleActive(item: Testimonial) {
    await supabase
      .from("testimonials")
      .update({
        is_active: !item.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.id);

    fetchTestimonials();
  }

  return (
    <AdminLayout
      title="Testimonials"
      description="Manage client testimonials shown on Astrogyan."
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">

        <form
          onSubmit={handleSubmit}
          className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/65 p-6 shadow-sm backdrop-blur-md"
        >
          <h2 className="font-display text-3xl text-[#5C3A57]">
            {editingId
              ? "Edit Testimonial"
              : "Add Testimonial"}
          </h2>

          <div className="mt-6 space-y-4">

            <input
              className="field"
              placeholder="Client name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              required
            />

            <input
              className="field"
              placeholder="Role / Occupation"
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value,
                })
              }
            />

            <textarea
              className="field min-h-36 resize-none rounded-[1.5rem]"
              placeholder="Testimonial text"
              value={form.text}
              onChange={(e) =>
                setForm({
                  ...form,
                  text: e.target.value,
                })
              }
              required
            />

            <div className="grid gap-4 sm:grid-cols-2">

              <input
                className="field"
                type="number"
                min="1"
                max="5"
                placeholder="Rating"
                value={form.rating}
                onChange={(e) =>
                  setForm({
                    ...form,
                    rating: e.target.value,
                  })
                }
              />

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
              Active testimonial
            </label>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-[#5C3A57] px-6 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update"
                  : "Add"}
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
            Existing Testimonials
          </h2>

          <div className="mt-6 space-y-4">

            {loading && (
              <p className="text-[#6F5B69]">
                Loading...
              </p>
            )}

            {!loading &&
              testimonials.length === 0 && (
                <p className="text-[#6F5B69]">
                  No testimonials added yet.
                </p>
              )}

            {testimonials.map((item) => (
              <div
                key={item.id}
                className="rounded-[1.25rem] border border-[#E6C89C]/35 bg-[#F6EEE8]/70 p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                  <div>

                    <div className="flex items-center gap-3">

                      <h3 className="font-display text-2xl text-[#5C3A57]">
                        {item.name}
                      </h3>

                      <span className="text-[#B784A7]">
                        {"★".repeat(item.rating)}
                      </span>
                    </div>

                    {item.role && (
                      <p className="mt-1 text-sm text-[#B784A7]">
                        {item.role}
                      </p>
                    )}

                    <p className="mt-4 leading-7 text-[#6F5B69]">
                      {item.text}
                    </p>

                    <p className="mt-3 text-sm text-[#B784A7]">
                      Order: {item.display_order || 0}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">

                    <button
                      onClick={() => handleEdit(item)}
                      className="rounded-full border border-[#5C3A57]/20 px-4 py-2 text-sm text-[#5C3A57]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => toggleActive(item)}
                      className="rounded-full border border-[#E6C89C]/60 px-4 py-2 text-sm text-[#5C3A57]"
                    >
                      {item.is_active
                        ? "Hide"
                        : "Show"}
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item.id)
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