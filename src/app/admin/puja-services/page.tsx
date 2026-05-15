"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { createClient } from "@/lib/supabase/client";
import PujaImageUploadField from "@/components/admin/PujalmageUploadField";

type PujaService = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number | null;
  cost_with_samagri: number | null;
  cost_without_samagri: number | null;
  duration: string | null;
  benefits: string | null;
  image_url: string | null;
  is_active: boolean;
  display_order: number | null;
};

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  price: "",
  cost_with_samagri: "",
  cost_without_samagri: "",
  duration: "",
  benefits: "",
  image_url: "",
  is_active: true,
  display_order: "0",
};

export default function AdminPujaServicesPage() {
  const supabase = createClient();

  const [pujas, setPujas] = useState<PujaService[]>([]);
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

  async function fetchPujas() {
    setLoading(true);

    const { data, error } = await supabase
      .from("puja_services")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data) setPujas(data);

    setLoading(false);
  }

  useEffect(() => {
    fetchPujas();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      slug: form.slug || makeSlug(form.title),
      description: form.description,
      price: form.price ? Number(form.price) : null,
      cost_with_samagri: form.cost_with_samagri
        ? Number(form.cost_with_samagri)
        : null,
      cost_without_samagri: form.cost_without_samagri
        ? Number(form.cost_without_samagri)
        : null,
      duration: form.duration,
      benefits: form.benefits,
      image_url: form.image_url,
      is_active: form.is_active,
      display_order: Number(form.display_order || 0),
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      await supabase.from("puja_services").update(payload).eq("id", editingId);
    } else {
      await supabase.from("puja_services").insert(payload);
    }

    setForm(emptyForm);
    setEditingId(null);
    setSaving(false);
    fetchPujas();
  }

  function handleEdit(puja: PujaService) {
    setEditingId(puja.id);

    setForm({
      title: puja.title,
      slug: puja.slug,
      description: puja.description,
      price: puja.price ? String(puja.price) : "",
      cost_with_samagri: puja.cost_with_samagri
        ? String(puja.cost_with_samagri)
        : "",
      cost_without_samagri: puja.cost_without_samagri
        ? String(puja.cost_without_samagri)
        : "",
      duration: puja.duration || "",
      benefits: puja.benefits || "",
      image_url: puja.image_url || "",
      is_active: puja.is_active,
      display_order: String(puja.display_order || 0),
    });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this puja service?")) return;

    await supabase.from("puja_services").delete().eq("id", id);
    fetchPujas();
  }

  async function toggleActive(puja: PujaService) {
    await supabase
      .from("puja_services")
      .update({
        is_active: !puja.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", puja.id);

    fetchPujas();
  }

  return (
    <AdminLayout
      title="Puja Services"
      description="Add, edit, delete, and manage Astrogyan puja services."
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/65 p-6 shadow-sm backdrop-blur-md"
        >
          <h2 className="font-display text-3xl text-[#5C3A57]">
            {editingId ? "Edit Puja Service" : "Add Puja Service"}
          </h2>

          <div className="mt-6 space-y-4">
            <input
              className="field"
              placeholder="Puja title"
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

            <textarea
              className="field min-h-32 resize-none rounded-[1.5rem]"
              placeholder="Puja description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />

            <textarea
              className="field min-h-28 resize-none rounded-[1.5rem]"
              placeholder="Benefits / what is included"
              value={form.benefits}
              onChange={(e) => setForm({ ...form, benefits: e.target.value })}
            />

            <div className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-4">
              <p className="mb-3 text-sm font-semibold text-[#5C3A57]">
                Puja Image
              </p>

              <PujaImageUploadField
  value={form.image_url}
  onChange={(value) => setForm({ ...form, image_url: value })}
/>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <input
                className="field"
                type="number"
                placeholder="Base Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />

              <input
                className="field"
                type="number"
                placeholder="Cost without Samagri"
                value={form.cost_without_samagri}
                onChange={(e) =>
                  setForm({
                    ...form,
                    cost_without_samagri: e.target.value,
                  })
                }
              />

              <input
                className="field"
                type="number"
                placeholder="Cost with Samagri"
                value={form.cost_with_samagri}
                onChange={(e) =>
                  setForm({
                    ...form,
                    cost_with_samagri: e.target.value,
                  })
                }
              />
            </div>

            <input
              className="field"
              placeholder="Duration"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
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

            <label className="flex items-center gap-3 text-[#5C3A57]">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) =>
                  setForm({ ...form, is_active: e.target.checked })
                }
              />
              Active puja service
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-[#5C3A57] px-6 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:opacity-60"
              >
                {saving ? "Saving..." : editingId ? "Update Puja" : "Add Puja"}
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
            Existing Puja Services
          </h2>

          <div className="mt-6 space-y-4">
            {loading && <p className="text-[#6F5B69]">Loading pujas...</p>}

            {!loading && pujas.length === 0 && (
              <p className="text-[#6F5B69]">No puja services added yet.</p>
            )}

            {pujas.map((puja) => (
              <div
                key={puja.id}
                className="rounded-[1.25rem] border border-[#E6C89C]/35 bg-[#F6EEE8]/70 p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    {puja.image_url && (
  <div className="mb-4 h-40 w-full overflow-hidden rounded-[1.25rem] border border-[#E6C89C]/40 bg-white">
    <img
      src={puja.image_url}
      alt={puja.title}
      className="h-full w-full object-cover"
    />
  </div>
)}

                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-2xl text-[#5C3A57]">
                        {puja.title}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          puja.is_active
                            ? "bg-[#7FB8B4]/25 text-[#315C58]"
                            : "bg-[#D8A7B1]/30 text-[#5C3A57]"
                        }`}
                      >
                        {puja.is_active ? "Active" : "Hidden"}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-[#B784A7]">
                      /puja-services/{puja.slug}
                    </p>

                    <p className="mt-3 leading-7 text-[#6F5B69]">
                      {puja.description}
                    </p>

                    {puja.benefits && (
                      <p className="mt-3 rounded-[1rem] bg-white/60 p-4 text-sm leading-7 text-[#5C3A57]">
                        {puja.benefits}
                      </p>
                    )}

                    <div className="mt-3 grid gap-2 text-sm text-[#5C3A57] sm:grid-cols-2">
                      <p>Base: ₹{puja.price || 0}</p>
                      <p>
                        Without Samagri: ₹
                        {puja.cost_without_samagri || puja.price || 0}
                      </p>
                      <p>
                        With Samagri: ₹
                        {puja.cost_with_samagri || puja.price || 0}
                      </p>
                      <p>{puja.duration || "No duration"}</p>
                      <p>Order: {puja.display_order || 0}</p>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(puja)}
                      className="rounded-full border border-[#5C3A57]/20 px-4 py-2 text-sm text-[#5C3A57]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => toggleActive(puja)}
                      className="rounded-full border border-[#E6C89C]/60 px-4 py-2 text-sm text-[#5C3A57]"
                    >
                      {puja.is_active ? "Hide" : "Show"}
                    </button>

                    <button
                      onClick={() => handleDelete(puja.id)}
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