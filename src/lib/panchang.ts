import { createClient } from "@/lib/supabase/server";

export type DailyPanchang = {
  id: string;
  panchang_date: string;
  location: string;
  sunrise: string | null;
  sunset: string | null;
  tithi: string | null;
  nakshatra: string | null;
  rahu_kaal: string | null;
  current_message: string | null;
};

export async function getTodayPanchang(): Promise<DailyPanchang | null> {
  const supabase = await createClient();

  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const { data, error } = await supabase
    .from("daily_panchang_cache")
    .select("*")
    .eq("panchang_date", today)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}