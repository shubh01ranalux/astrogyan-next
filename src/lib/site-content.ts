import { createClient } from "@/lib/supabase/server";

export type SiteContentItem = {
  id: string;
  content_key: string;
  label: string;
  value: string | null;
  type: string;
  group_name: string;
  updated_at?: string;
};

export async function getSiteContent(): Promise<Record<string, string>> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_content")
    .select("*");

  if (error) {
    console.error(error);
    return {};
  }

  return (data || []).reduce<Record<string, string>>((acc, item) => {
    acc[item.content_key] = item.value || "";
    return acc;
  }, {});
}

export async function getSiteContentItems(): Promise<SiteContentItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_content")
    .select("*")
    .order("group_name", { ascending: true })
    .order("label", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}