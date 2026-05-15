import AdminLayout from "@/components/admin/AdminLayout";
import { adminModules } from "@/data/admin";
import { requireAdminAccess } from "@/lib/admin-permissions";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

async function getAdminUsers() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

async function createAdminUser(formData: FormData) {
  "use server";

  await requireAdminAccess("admins");

  const email = String(formData.get("email") || "");
  const fullName = String(formData.get("full_name") || "");
  const userId = String(formData.get("user_id") || "");
  const role = String(formData.get("role") || "receptionist");
  const allowedModules = formData.getAll("allowed_modules").map(String);

  if (!email || !userId) return;

  const supabase = await createClient();

  await supabase.from("admin_users").insert({
    email,
    full_name: fullName,
    user_id: userId,
    role,
    allowed_modules: allowedModules,
    is_active: true,
  });

  revalidatePath("/admin/admins");
}

async function updateAdminUser(formData: FormData) {
  "use server";

  await requireAdminAccess("admins");

  const id = String(formData.get("id") || "");
  const fullName = String(formData.get("full_name") || "");
  const role = String(formData.get("role") || "receptionist");
  const isActive = formData.get("is_active") === "on";
  const allowedModules = formData.getAll("allowed_modules").map(String);

  const supabase = await createClient();

  await supabase
    .from("admin_users")
    .update({
      full_name: fullName,
      role,
      allowed_modules: allowedModules,
      is_active: isActive,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath("/admin/admins");
}

export default async function AdminUsersPage() {
  await requireAdminAccess("admins");

  const users = await getAdminUsers();

  return (
    <AdminLayout
      title="Admin Users"
      description="Manage admin roles, receptionist access, and module permissions."
    >
      <div className="mb-8 rounded-[2rem] border border-[#E6C89C]/40 bg-white/70 p-6 shadow-sm">
        <h2 className="font-display text-2xl text-[#5C3A57]">
          Add Admin User
        </h2>

        <p className="mt-2 text-sm text-[#9A7B8F]">
          First create the user in Supabase Authentication, then paste their
          auth user ID here.
        </p>

        <form action={createAdminUser} className="mt-6 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="email"
              placeholder="Email"
              className="rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none"
              required
            />

            <input
              name="full_name"
              placeholder="Full Name"
              className="rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none"
            />

            <input
              name="user_id"
              placeholder="Supabase Auth User ID"
              className="rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none md:col-span-2"
              required
            />

            <select
              name="role"
              defaultValue="receptionist"
              className="rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none"
            >
              <option value="super_admin">Super Admin</option>
              <option value="receptionist">Receptionist</option>
              <option value="content_manager">Content Manager</option>
            </select>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-[#5C3A57]">
              Allowed Modules
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {adminModules.map((module) => (
                <label
                  key={module.value}
                  className="flex items-center gap-2 rounded-xl border border-[#E6C89C]/40 bg-[#FFF9F4] px-4 py-3 text-sm text-[#5C3A57]"
                >
                  <input
                    type="checkbox"
                    name="allowed_modules"
                    value={module.value}
                    defaultChecked={module.value === "bookings"}
                    className="h-4 w-4 accent-[#5C3A57]"
                  />
                  {module.label}
                </label>
              ))}
            </div>
          </div>

          <button className="w-fit rounded-full bg-[#5C3A57] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#B784A7]">
            Add Admin
          </button>
        </form>
      </div>

      <div className="space-y-5">
        {users.map((user) => (
          <form
            key={user.id}
            action={updateAdminUser}
            className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/70 p-6 shadow-sm"
          >
            <input type="hidden" name="id" value={user.id} />

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
                  Email
                </p>
                <p className="mt-2 font-medium text-[#5C3A57]">
                  {user.email}
                </p>
              </div>

              <input
                name="full_name"
                defaultValue={user.full_name || ""}
                placeholder="Full Name"
                className="rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none"
              />

              <select
                name="role"
                defaultValue={user.role}
                className="rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none"
              >
                <option value="super_admin">Super Admin</option>
                <option value="receptionist">Receptionist</option>
                <option value="content_manager">Content Manager</option>
              </select>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-sm font-semibold text-[#5C3A57]">
                Allowed Modules
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {adminModules.map((module) => (
                  <label
                    key={module.value}
                    className="flex items-center gap-2 rounded-xl border border-[#E6C89C]/40 bg-[#FFF9F4] px-4 py-3 text-sm text-[#5C3A57]"
                  >
                    <input
                      type="checkbox"
                      name="allowed_modules"
                      value={module.value}
                      defaultChecked={
                        user.role === "super_admin" ||
                        user.allowed_modules?.includes(module.value)
                      }
                      className="h-4 w-4 accent-[#5C3A57]"
                    />
                    {module.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-sm font-medium text-[#5C3A57]">
                <input
                  type="checkbox"
                  name="is_active"
                  defaultChecked={user.is_active}
                  className="h-4 w-4 accent-[#5C3A57]"
                />
                Active
              </label>

              <button className="rounded-full bg-[#5C3A57] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#B784A7]">
                Save User
              </button>
            </div>
          </form>
        ))}
      </div>
    </AdminLayout>
  );
}