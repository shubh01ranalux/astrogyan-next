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

function getTodayInIndia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export async function upsertTodayPanchangFallback() {
  const supabase = await createClient();
  const today = getTodayInIndia();

  const payload = {
    panchang_date: today,
    location: "Mumbai, India",
    sunrise: "06:05 AM",
    sunset: "07:05 PM",
    tithi: "Today’s Tithi",
    nakshatra: "Today’s Nakshatra",
    rahu_kaal: "Check full Panchang",
    current_message:
      "Mumbai Panchang is being prepared. View full Panchang for details.",
    raw_data: {},
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("daily_panchang_cache")
    .upsert(payload, {
      onConflict: "panchang_date",
    })
    .select("*")
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function getTodayPanchang(): Promise<DailyPanchang | null> {
  const supabase = await createClient();
  const today = getTodayInIndia();

  const { data, error } = await supabase
    .from("daily_panchang_cache")
    .select("*")
    .eq("panchang_date", today)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  if (data) return data;

  return upsertTodayPanchangFallback();
}