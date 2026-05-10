import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function getTodayInIndia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const today = getTodayInIndia();

  /*
    Later we replace this block with real Panchang API call.
    For now this keeps the daily cache alive automatically.
  */
  const panchangPayload = {
    panchang_date: today,
    location: "Mumbai, India",
    sunrise: "06:05 AM",
    sunset: "07:05 PM",
    tithi: "Auto Panchang Pending",
    nakshatra: "Auto Nakshatra Pending",
    rahu_kaal: "01:30 PM - 03:00 PM",
    current_message:
      "Today’s Panchang is cached for Mumbai. Full automation will connect to API provider next.",
    raw_data: {},
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("daily_panchang_cache")
    .upsert(panchangPayload, {
      onConflict: "panchang_date",
    });

  if (error) {
    console.error(error);

    return NextResponse.json(
      { ok: false, error: "Unable to update Panchang cache." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    date: today,
    location: "Mumbai, India",
  });
}