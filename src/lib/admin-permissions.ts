import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AdminUser = {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  role: string;
  allowed_modules: string[] | null;
  is_active: boolean;
};

export async function getCurrentAdminUser(): Promise<AdminUser | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) return null;

  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function requireAdminAccess(moduleKey: string) {
  const admin = await getCurrentAdminUser();

  if (!admin) {
    redirect("/admin/login");
  }

  if (admin.role === "super_admin") {
    return admin;
  }

  if (!admin.allowed_modules?.includes(moduleKey)) {
    redirect("/admin");
  }

  return admin;
}

export function canAccessModule(
  admin: AdminUser | null,
  moduleKey: string
) {
  if (!admin) return false;
  if (admin.role === "super_admin") return true;

  return admin.allowed_modules?.includes(moduleKey) || false;
}