import { createClient } from "@/lib/supabase/server";

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  location: "navbar" | "footer" | "both" | string;
  is_active: boolean;
  display_order: number;
};

export async function getNavigationItems(): Promise<NavigationItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("navigation_items")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

export async function getAllNavigationItems(): Promise<NavigationItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("navigation_items")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}