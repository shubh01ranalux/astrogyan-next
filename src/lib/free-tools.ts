import { createClient } from "@/lib/supabase/server";

export async function getFreeTools() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("free_tools")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}