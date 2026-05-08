import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { createClient } from "@/lib/supabase/server";
import { getHomepageSections } from "@/lib/homepage-sections";
import { revalidatePath } from "next/cache";

async function updateSection(formData: FormData) {
  "use server";

  const id = String(formData.get("id"));
  const isEnabled = formData.get("is_enabled") === "on";
  const displayOrder = Number(formData.get("display_order"));

  const supabase = await createClient();

  await supabase
    .from("homepage_sections")
    .update({
      is_enabled: isEnabled,
      display_order: displayOrder,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin/homepage");
}

export default async function HomepageAdminPage() {
  const sections = await getHomepageSections();

  return (
    <AdminLayout
      title="Homepage Manager"
      description="Show, hide and reorder homepage sections without editing code."
    >
      <div className="mb-6 flex flex-wrap gap-3">
        <Link
          href="/"
          target="_blank"
          className="rounded-full bg-[#5C3A57] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#B784A7]"
        >
          Open Homepage
        </Link>

        <Link
          href="/admin/site-content"
          className="rounded-full border border-[#5C3A57]/20 px-5 py-3 text-sm font-medium text-[#5C3A57] transition hover:bg-[#5C3A57] hover:text-white"
        >
          Edit Homepage Content
        </Link>
      </div>

      <div className="space-y-5">
        {sections.map((section) => (
          <form
            key={section.id}
            action={updateSection}
            className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/70 p-6 shadow-sm"
          >
            <input type="hidden" name="id" value={section.id} />

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-2xl text-[#5C3A57]">
                    {section.label}
                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      section.is_enabled
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {section.is_enabled ? "Visible" : "Hidden"}
                  </span>
                </div>

                <p className="mt-2 text-sm text-[#9A7B8F]">
                  Key:{" "}
                  <code className="rounded bg-[#FFF9F4] px-2 py-1 text-[#5C3A57]">
                    {section.section_key}
                  </code>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <label className="flex items-center gap-2 text-sm font-medium text-[#5C3A57]">
                  <input
                    type="checkbox"
                    name="is_enabled"
                    defaultChecked={section.is_enabled}
                    className="h-4 w-4 accent-[#5C3A57]"
                  />
                  Show Section
                </label>

                <label className="flex items-center gap-2 text-sm font-medium text-[#5C3A57]">
                  Order
                  <input
                    type="number"
                    name="display_order"
                    defaultValue={section.display_order}
                    min={1}
                    className="w-20 rounded-xl border border-[#E6C89C]/50 bg-white px-3 py-2 text-[#5C3A57] outline-none focus:border-[#5C3A57]"
                  />
                </label>

                <button
                  type="submit"
                  className="rounded-full bg-[#5C3A57] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#B784A7]"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        ))}
      </div>
    </AdminLayout>
  );
}