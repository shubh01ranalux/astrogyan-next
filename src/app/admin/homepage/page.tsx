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
      description="Control homepage sections visibility and order."
    >
      <div className="space-y-5">
        {sections.map((section) => (
          <form
            key={section.id}
            action={updateSection}
            className="flex flex-col gap-5 rounded-[2rem] border border-[#E6C89C]/40 bg-white/70 p-6 shadow-sm md:flex-row md:items-center md:justify-between"
          >
            <input type="hidden" name="id" value={section.id} />

            <div>
              <h2 className="font-display text-2xl text-[#5C3A57]">
                {section.label}
              </h2>

              <p className="mt-1 text-sm text-[#9A7B8F]">
                Key: {section.section_key}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <label className="flex items-center gap-2 text-sm text-[#5C3A57]">
                <input
                  type="checkbox"
                  name="is_enabled"
                  defaultChecked={section.is_enabled}
                />
                Enabled
              </label>

              <div className="flex items-center gap-2">
                <span className="text-sm text-[#5C3A57]">
                  Order
                </span>

                <input
                  type="number"
                  name="display_order"
                  defaultValue={section.display_order}
                  className="w-20 rounded-xl border border-[#E6C89C]/50 px-3 py-2"
                />
              </div>

              <button className="rounded-full bg-[#5C3A57] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#B784A7]">
                Save
              </button>
            </div>
          </form>
        ))}
      </div>
    </AdminLayout>
  );
}