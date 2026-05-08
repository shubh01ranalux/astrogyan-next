import AdminLayout from "@/components/admin/AdminLayout";
import { getSiteContentItems } from "@/lib/site-content";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

async function updateContent(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "");
  const value = String(formData.get("value") || "");

  const supabase = await createClient();

  await supabase
    .from("site_content")
    .update({
      value,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin/site-content");
}

export default async function SiteContentAdminPage() {
  const items = await getSiteContentItems();

  const groupedItems = items.reduce<Record<string, typeof items>>(
    (groups, item) => {
      const groupName = item.group_name || "General";

      if (!groups[groupName]) {
        groups[groupName] = [];
      }

      groups[groupName].push(item);
      return groups;
    },
    {}
  );

  return (
    <AdminLayout
      title="Site Content"
      description="Edit homepage text, section headings, CTA copy and footer content."
    >
      <div className="space-y-8">
        {Object.entries(groupedItems).map(([groupName, groupItems]) => (
          <section
            key={groupName}
            className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/70 p-6 shadow-sm"
          >
            <div className="mb-6 border-b border-[#E6C89C]/40 pb-4">
              <h2 className="font-display text-2xl text-[#5C3A57]">
                {groupName}
              </h2>
              <p className="mt-1 text-sm text-[#9A7B8F]">
                Manage all editable content for this website section.
              </p>
            </div>

            <div className="grid gap-5">
              {groupItems.map((item) => (
                <form
                  key={item.id}
                  action={updateContent}
                  className="rounded-2xl border border-[#E6C89C]/30 bg-[#FFF9F4] p-5"
                >
                  <input type="hidden" name="id" value={item.id} />

                  <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <label className="text-sm font-semibold text-[#5C3A57]">
                      {item.label}
                    </label>

                    <span className="rounded-full bg-[#EADDE5] px-3 py-1 text-xs text-[#5C3A57]">
                      {item.type}
                    </span>
                  </div>

                  {item.type === "textarea" ? (
                    <textarea
                      name="value"
                      defaultValue={item.value || ""}
                      rows={4}
                      className="w-full rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none transition focus:border-[#5C3A57]"
                    />
                  ) : (
                    <input
                      name="value"
                      defaultValue={item.value || ""}
                      className="w-full rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none transition focus:border-[#5C3A57]"
                    />
                  )}

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-[#9A7B8F]">
                      Key:{" "}
                      <code className="rounded bg-white px-2 py-1 text-[#5C3A57]">
                        {item.content_key}
                      </code>
                    </p>

                    <button className="rounded-full bg-[#5C3A57] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#B784A7]">
                      Save
                    </button>
                  </div>
                </form>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AdminLayout>
  );
}