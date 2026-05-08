"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { createClient } from "@/lib/supabase/client";

type Certificate = {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  is_active: boolean;
  display_order: number | null;
};

const emptyForm = {
  title: "",
  description: "",
  icon: "✦",
  is_active: true,
  display_order: "0",
};

export default function AdminCertificatesPage() {
  const supabase = createClient();

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function fetchCertificates() {
    setLoading(true);

    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data) setCertificates(data);

    setLoading(false);
  }

  useEffect(() => {
    fetchCertificates();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      description: form.description,
      icon: form.icon,
      is_active: form.is_active,
      display_order: Number(form.display_order || 0),
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      await supabase.from("certificates").update(payload).eq("id", editingId);
    } else {
      await supabase.from("certificates").insert(payload);
    }

    setForm(emptyForm);
    setEditingId(null);
    setSaving(false);
    fetchCertificates();
  }

  function handleEdit(item: Certificate) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      icon: item.icon || "✦",
      is_active: item.is_active,
      display_order: String(item.display_order || 0),
    });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this certificate?")) return;

    await supabase.from("certificates").delete().eq("id", id);
    fetchCertificates();
  }

  async function toggleActive(item: Certificate) {
    await supabase
      .from("certificates")
      .update({
        is_active: !item.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.id);

    fetchCertificates();
  }

  return (
    <AdminLayout
      title="Certificates"
      description="Manage certificates, trust badges, and credibility cards shown on the homepage."
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/65 p-6 shadow-sm backdrop-blur-md"
        >
          <h2 className="font-display text-3xl text-[#5C3A57]">
            {editingId ? "Edit Certificate" : "Add Certificate"}
          </h2>

          <div className="mt-6 space-y-4">
            <input
              className="field"
              placeholder="Certificate title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <textarea
              className="field min-h-32 resize-none rounded-[1.5rem]"
              placeholder="Certificate description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className="field"
                placeholder="Icon"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
              />

              <input
                className="field"
                type="number"
                placeholder="Display order"
                value={form.display_order}
                onChange={(e) =>
                  setForm({ ...form, display_order: e.target.value })
                }
              />
            </div>

            <label className="flex items-center gap-3 text-[#5C3A57]">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) =>
                  setForm({ ...form, is_active: e.target.checked })
                }
              />
              Active certificate
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
                  ? "Update Certificate"
                  : "Add Certificate"}
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
            Existing Certificates
          </h2>

          <div className="mt-6 space-y-4">
            {loading && <p className="text-[#6F5B69]">Loading...</p>}

            {!loading && certificates.length === 0 && (
              <p className="text-[#6F5B69]">No certificates added yet.</p>
            )}

            {certificates.map((item) => (
              <div
                key={item.id}
                className="rounded-[1.25rem] border border-[#E6C89C]/35 bg-[#F6EEE8]/70 p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon || "✦"}</span>
                      <h3 className="font-display text-2xl text-[#5C3A57]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 leading-7 text-[#6F5B69]">
                      {item.description}
                    </p>

                    <p className="mt-3 text-sm text-[#B784A7]">
                      Order: {item.display_order || 0} ·{" "}
                      {item.is_active ? "Active" : "Hidden"}
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
                      {item.is_active ? "Hide" : "Show"}
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
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