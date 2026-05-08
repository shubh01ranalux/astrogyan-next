import AdminLayout from "@/components/admin/AdminLayout";
import { createClient } from "@/lib/supabase/server";
import { getAllNavigationItems } from "@/lib/navigation";
import { revalidatePath } from "next/cache";

async function createNavigationItem(formData: FormData) {
  "use server";

  const label = String(formData.get("label") || "");
  const href = String(formData.get("href") || "");
  const location = String(formData.get("location") || "both");
  const displayOrder = Number(formData.get("display_order") || 0);

  if (!label || !href) return;

  const supabase = await createClient();

  await supabase.from("navigation_items").insert({
    label,
    href,
    location,
    is_active: true,
    display_order: displayOrder,
  });

  revalidatePath("/");
  revalidatePath("/admin/navigation");
}

async function updateNavigationItem(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "");
  const label = String(formData.get("label") || "");
  const href = String(formData.get("href") || "");
  const location = String(formData.get("location") || "both");
  const isActive = formData.get("is_active") === "on";
  const displayOrder = Number(formData.get("display_order") || 0);

  const supabase = await createClient();

  await supabase
    .from("navigation_items")
    .update({
      label,
      href,
      location,
      is_active: isActive,
      display_order: displayOrder,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin/navigation");
}

async function deleteNavigationItem(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "");

  const supabase = await createClient();

  await supabase.from("navigation_items").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin/navigation");
}

export default async function NavigationAdminPage() {
  const items = await getAllNavigationItems();

  return (
    <AdminLayout
      title="Navigation Manager"
      description="Add, edit, hide and reorder website navigation links."
    >
      <div className="mb-8 rounded-[2rem] border border-[#E6C89C]/40 bg-white/70 p-6 shadow-sm">
        <h2 className="font-display text-2xl text-[#5C3A57]">
          Add Navigation Link
        </h2>

        <form
          action={createNavigationItem}
          className="mt-5 grid gap-4 md:grid-cols-5"
        >
          <input
            name="label"
            placeholder="Label"
            className="rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none"
          />

          <input
            name="href"
            placeholder="/example"
            className="rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none"
          />

          <select
            name="location"
            defaultValue="both"
            className="rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none"
          >
            <option value="both">Both</option>
            <option value="navbar">Navbar</option>
            <option value="footer">Footer</option>
          </select>

          <input
            name="display_order"
            type="number"
            placeholder="Order"
            defaultValue={items.length + 1}
            className="rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none"
          />

          <button className="rounded-xl bg-[#5C3A57] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#B784A7]">
            Add Link
          </button>
        </form>
      </div>

      <div className="space-y-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/70 p-6 shadow-sm"
          >
            <form
              action={updateNavigationItem}
              className="grid gap-4 md:grid-cols-6"
            >
              <input type="hidden" name="id" value={item.id} />

              <input
                name="label"
                defaultValue={item.label}
                className="rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none"
              />

              <input
                name="href"
                defaultValue={item.href}
                className="rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none"
              />

              <select
                name="location"
                defaultValue={item.location}
                className="rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none"
              >
                <option value="both">Both</option>
                <option value="navbar">Navbar</option>
                <option value="footer">Footer</option>
              </select>

              <input
                name="display_order"
                type="number"
                defaultValue={item.display_order}
                className="rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none"
              />

              <label className="flex items-center gap-2 text-sm font-medium text-[#5C3A57]">
                <input
                  type="checkbox"
                  name="is_active"
                  defaultChecked={item.is_active}
                  className="h-4 w-4 accent-[#5C3A57]"
                />
                Active
              </label>

              <button className="rounded-xl bg-[#5C3A57] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#B784A7]">
                Save
              </button>
            </form>

            <form action={deleteNavigationItem} className="mt-4">
              <input type="hidden" name="id" value={item.id} />
              <button className="rounded-full bg-red-100 px-4 py-2 text-sm text-red-700">
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}