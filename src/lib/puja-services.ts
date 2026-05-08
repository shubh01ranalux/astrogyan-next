import { createClient } from "@/lib/supabase/server";

export async function getPujaServices() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("puja_services")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}