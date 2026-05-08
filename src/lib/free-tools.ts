import { createClient } from "@/lib/supabase/server";

export type FreeTool = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  icon: string | null;
  button_text: string | null;
  link: string | null;
  status: string;
  is_active: boolean;
  display_order: number | null;
  created_at?: string;
  updated_at?: string;
};

export async function getFreeTools(): Promise<FreeTool[]> {
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

  return data || [];
}

export async function getFreeToolBySlug(
  slug: string
): Promise<FreeTool | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("free_tools")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}