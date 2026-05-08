import { createClient } from "@/lib/supabase/server";

export type HomepageSection = {
  id: string;
  section_key: string;
  label: string;
  is_enabled: boolean;
  display_order: number;
};

export async function getHomepageSections(): Promise<
  HomepageSection[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("homepage_sections")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}