import { createClient } from "@/lib/supabase/server";

export type SiteSettingItem = {
  id: string;
  setting_key: string;
  label: string;
  value: string | null;
  type: string;
  group_name: string;
  updated_at?: string;
};

export async function getSiteSettings(): Promise<Record<string, string>> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("site_settings").select("*");

  if (error) {
    console.error(error);
    return {};
  }

  return (data || []).reduce<Record<string, string>>((acc, item) => {
    acc[item.setting_key] = item.value || "";
    return acc;
  }, {});
}

export async function getSiteSettingItems(): Promise<SiteSettingItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("group_name", { ascending: true })
    .order("label", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}