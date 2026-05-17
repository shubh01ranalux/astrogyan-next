import { createClient } from "@/lib/supabase/server";
import { generateDailyPanchangInsights } from "@/lib/panchang-ai";

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
  ai_good_for?: string[] | null;
  ai_avoid?: string[] | null;
  ai_message?: string | null;
  raw_data?: any;
  choghadiya?: Record<string, ChoghadiyaItem> | null;
  shubh_choghadiya?: string | null;
  ashubh_choghadiya?: string | null;
};

type ChoghadiyaItem = {
  name: string;
  starts_at: string;
  ends_at: string;
};

function getTodayInIndia(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function formatPanchangDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateString}T00:00:00+05:30`));
}

function formatClockTime(value?: string | null): string {
  if (!value) return "—";

  const clean = String(value).trim();
  const match = clean.match(/^(\d{1,2}):(\d{2})(?::\d{2})?/);

  if (!match) return clean;

  let hour = Number(match[1]);
  const minute = match[2];

  const suffix = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${String(hour).padStart(2, "0")}:${minute} ${suffix}`;
}

function formatDateTimeToTime(value?: string | null): string {
  if (!value) return "—";

  const cleanValue = String(value).trim();

  if (/^\d{1,2}:\d{2}/.test(cleanValue)) {
    return formatClockTime(cleanValue);
  }

  const date = new Date(cleanValue.replace(" ", "T"));

  if (!Number.isNaN(date.getTime())) {
    return new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }).format(date);
  }

  return cleanValue;
}

function formatTime(value: any): string | null {
  if (!value) return null;

  if (typeof value === "string") {
    return formatClockTime(value);
  }

  if (typeof value === "object") {
    if ("hour" in value && "minute" in value) {
      return formatClockTime(`${value.hour}:${value.minute}`);
    }

    if ("start" in value && "end" in value) {
      return `${formatTime(value.start)} - ${formatTime(value.end)}`;
    }
  }

  return String(value);
}

function getName(value: any): string | null {
  if (!value) return null;

  if (typeof value === "string") {
    return value;
  }

  return (
    value.name ||
    value.value ||
    value.details?.name ||
    value.tithi_name ||
    value.nakshatra_name ||
    value.yoga_name ||
    value.karana_name ||
    null
  );
}

function getUpto(value: any): string | null {
  if (!value || typeof value !== "object") return null;

  const rawTime =
    value.ends_at ||
    value.endsAt ||
    value.end_time ||
    value.endTime ||
    value.upto ||
    value.end ||
    value.ends_at_iso ||
    null;

  return rawTime ? formatTime(rawTime) : null;
}

function getThen(value: any): string | null {
  if (!value || typeof value !== "object") return null;

  return (
    value.next?.name ||
    value.next_tithi?.name ||
    value.next_nakshatra?.name ||
    value.next_yoga?.name ||
    value.next_karana?.name ||
    null
  );
}

function formatNameUptoThen(value: any): string {
  const name = getName(value);
  const upto = getUpto(value);
  const then = getThen(value);

  if (name && upto && then) return `${name} upto ${upto} then ${then}`;
  if (name && upto) return `${name} upto ${upto}`;
  if (name) return name;

  return "—";
}

function getFromPossibleKeys(data: any, keys: string[]): any {
  for (const key of keys) {
    if (data?.[key]) return data[key];
  }

  return null;
}

function formatRange(value: any): string {
  if (!value) return "—";

  if (typeof value === "string") {
    return formatClockTime(value);
  }

  if (value.start && value.end) {
    return `${formatTime(value.start)} - ${formatTime(value.end)}`;
  }

  if (value.from && value.to) {
    return `${formatTime(value.from)} - ${formatTime(value.to)}`;
  }

  return String(value);
}

function formatChoghadiyaItem(item: ChoghadiyaItem): string {
  return `${item.name}: ${formatDateTimeToTime(
    item.starts_at
  )} - ${formatDateTimeToTime(item.ends_at)}`;
}

function getBestShubhChoghadiya(items: ChoghadiyaItem[]): string {
  const priority = ["Amrit", "Shubh", "Labh", "Char"];

  for (const name of priority) {
    const match = items.find((item) => item.name === name);
    if (match) return formatChoghadiyaItem(match);
  }

  return "—";
}

function getWorstAshubhChoghadiya(items: ChoghadiyaItem[]): string {
  const priority = ["Rog", "Kaal", "Udveg"];

  for (const name of priority) {
    const match = items.find((item) => item.name === name);
    if (match) return formatChoghadiyaItem(match);
  }

  return "—";
}

async function fetchMumbaiChoghadiyaFromApi() {
  const apiKey = process.env.FREE_ASTROLOGY_API_KEY;

  if (!apiKey) {
    console.error("Missing FREE_ASTROLOGY_API_KEY");
    return null;
  }

  const today = getTodayInIndia();

  const response = await fetch(
    "https://json.freeastrologyapi.com/choghadiya-timings",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        year: Number(today.slice(0, 4)),
        month: Number(today.slice(5, 7)),
        date: Number(today.slice(8, 10)),
        hours: 6,
        minutes: 0,
        seconds: 0,
        latitude: 19.076,
        longitude: 72.8777,
        timezone: 5.5,
        config: {
          observation_point: "topocentric",
          ayanamsha: "lahiri",
        },
      }),
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  );

  if (!response.ok) {
    console.error("Choghadiya API failed:", await response.text());
    return null;
  }

  const json = await response.json();

  const parsed =
    typeof json?.output === "string"
      ? JSON.parse(json.output)
      : json?.output || json;

  const items = Object.values(parsed || {}) as ChoghadiyaItem[];

  return {
    raw: parsed,
    items,
    shubh: getBestShubhChoghadiya(items),
    ashubh: getWorstAshubhChoghadiya(items),
  };
}

function getDynamicWeekdayMantra(weekday?: string | null): string {
  const day = String(weekday || "").toLowerCase();

  const mantras = {
    sunday: [
      "ॐ सूर्याय नमः।",
      "ॐ घृणि सूर्याय नमः।",
      "ॐ आदित्याय विद्महे दिवाकराय धीमहि।",
    ],
    monday: ["ॐ नमः शिवाय।", "हर हर महादेव।", "ॐ त्र्यम्बकं यजामहे।"],
    tuesday: [
      "ॐ हनुमते नमः।",
      "जय बजरंगबली।",
      "ॐ क्रां क्रीं क्रौं सः भौमाय नमः।",
    ],
    wednesday: ["ॐ गं गणपतये नमः।", "वक्रतुंड महाकाय।", "ॐ बुं बुधाय नमः।"],
    thursday: [
      "ॐ गुरवे नमः।",
      "ॐ बृं बृहस्पतये नमः।",
      "गुरुर्ब्रह्मा गुरुर्विष्णुः।",
    ],
    friday: [
      "ॐ श्री महालक्ष्म्यै नमः।",
      "जय माता दी।",
      "ॐ श्रीं ह्रीं श्रीं महालक्ष्म्यै नमः।",
    ],
    saturday: [
      "ॐ शं शनैश्चराय नमः।",
      "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः।",
      "नीलांजनसमाभासं रविपुत्रं यमाग्रजम्।",
    ],
  };

  const key = day as keyof typeof mantras;
  const selected = mantras[key] || mantras.monday;
  const today = new Date().getDate();

  return selected[today % selected.length];
}

async function fetchMumbaiPanchangFromApi() {
  const apiKey = process.env.FREE_ASTRO_API_KEY;

  if (!apiKey) {
    console.error("Missing FREE_ASTRO_API_KEY");
    return null;
  }

  const today = getTodayInIndia();

  const response = await fetch(
    "https://api.freeastroapi.com/api/v2/vedic/panchang",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        year: Number(today.slice(0, 4)),
        month: Number(today.slice(5, 7)),
        day: Number(today.slice(8, 10)),
        hour: 5,
        minute: 0,
        city: "Mumbai",
        latitude: 19.076,
        longitude: 72.8777,
        timezone: 5.5,
        config: {
          observation_point: "topocentric",
          ayanamsha: "lahiri",
        },
      }),
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  );

  if (!response.ok) {
    console.error("Panchang API failed:", await response.text());
    return null;
  }

  const json = await response.json();
  const data = json?.output || json?.data || json;

  const tithi = getFromPossibleKeys(data, ["tithi", "tithi_details"]);
  const nakshatra = getFromPossibleKeys(data, [
    "nakshatra",
    "nakshatra_details",
  ]);
  const rahu = getFromPossibleKeys(data, [
    "rahu_kalam",
    "rahukaal",
    "rahu_kaal",
  ]);

  return {
    sunrise: formatClockTime(data?.sunrise),
    sunset: formatClockTime(data?.sunset),
    tithi: getName(tithi),
    nakshatra: getName(nakshatra),
    rahu_kaal: formatRange(rahu),
    current_message: "Mumbai Panchang updated automatically for today.",
    raw_data: json,
  };
}

export function parsePanchangDetails(panchang: DailyPanchang | null) {
  const raw = panchang?.raw_data || {};
  const data = raw?.output || raw?.data || raw;

  const tithi = getFromPossibleKeys(data, ["tithi", "tithi_details"]);
  const nakshatra = getFromPossibleKeys(data, [
    "nakshatra",
    "nakshatra_details",
  ]);
  const yoga = getFromPossibleKeys(data, ["yoga", "yog", "yoga_details"]);
  const karana = getFromPossibleKeys(data, [
    "karana",
    "karan",
    "karana_details",
  ]);
  const rahu = getFromPossibleKeys(data, [
    "rahu_kalam",
    "rahukaal",
    "rahu_kaal",
  ]);

  return {
    date: panchang?.panchang_date
      ? formatPanchangDate(panchang.panchang_date)
      : "Today",

    location: panchang?.location || "Mumbai, India",

    sunrise:
      data?.sunrise ? formatClockTime(data.sunrise) : panchang?.sunrise || "—",

    sunset:
      data?.sunset ? formatClockTime(data.sunset) : panchang?.sunset || "—",

    tithi: data?.tithi
      ? `${data.tithi.name} upto ${formatClockTime(data.tithi.ends_at)}`
      : panchang?.tithi || formatNameUptoThen(tithi),

    paksha:
      data?.tithi?.paksha ||
      data?.paksha?.name ||
      data?.paksha ||
      tithi?.paksha?.name ||
      tithi?.paksha ||
      "—",

    moonsign:
      data?.request_time_panchang?.moon_sign?.name ||
      data?.moonsign?.name ||
      data?.moon_sign?.name ||
      data?.rashi?.name ||
      data?.moon_rashi?.name ||
      data?.moonsign ||
      data?.moon_sign ||
      data?.rashi ||
      data?.moon_rashi ||
      "—",

    sunsign:
      data?.request_time_panchang?.sun_sign?.name ||
      data?.sunsign?.name ||
      data?.sun_sign?.name ||
      data?.surya_rashi?.name ||
      data?.sunsign ||
      data?.sun_sign ||
      data?.surya_rashi ||
      "—",

    nakshatra: data?.nakshatra
      ? `${data.nakshatra.name} upto ${formatClockTime(data.nakshatra.ends_at)}`
      : panchang?.nakshatra || formatNameUptoThen(nakshatra),

    yoga: data?.yoga
      ? `${data.yoga.name} upto ${formatClockTime(data.yoga.ends_at)}`
      : formatNameUptoThen(yoga),

    karana: Array.isArray(data?.karanas)
      ? data.karanas
          .map((item: any, index: number) =>
            `${index === 0 ? item.name : `then ${item.name}`} upto ${formatClockTime(
              item.ends_at
            )}`
          )
          .join(" ")
      : formatNameUptoThen(data?.request_time_panchang?.karana || karana),

    shubh:
      panchang?.shubh_choghadiya ||
      (panchang?.choghadiya
        ? getBestShubhChoghadiya(
            Object.values(panchang.choghadiya) as ChoghadiyaItem[]
          )
        : "—"),

    rahuKaal: data?.rahu_kalam
      ? `${formatClockTime(data.rahu_kalam.start)} - ${formatClockTime(
          data.rahu_kalam.end
        )}`
      : panchang?.rahu_kaal || formatRange(rahu),

    ashubh:
      panchang?.ashubh_choghadiya ||
      (panchang?.choghadiya
        ? getWorstAshubhChoghadiya(
            Object.values(panchang.choghadiya) as ChoghadiyaItem[]
          )
        : "—"),

    goodFor:
      panchang?.ai_good_for && panchang.ai_good_for.length > 0
        ? panchang.ai_good_for
        : ["Meditation", "Planning", "Spiritual Focus"],

    avoid:
      panchang?.ai_avoid && panchang.ai_avoid.length > 0
        ? panchang.ai_avoid
        : ["Arguments", "Impulsive Decisions", "Negativity"],

    aiMessage:
      panchang?.ai_message ||
      panchang?.current_message ||
      "Today favors balanced spiritual and practical decisions.",

    lunarMonth: data?.lunar_month?.name || data?.lunar_month || "—",

    samvat: data?.lunar_month?.vikram_samvat
      ? String(data.lunar_month.vikram_samvat)
      : "—",

    weekday: data?.weekday?.name || data?.weekday || "—",

    choghadiyaList: panchang?.choghadiya
      ? Object.values(panchang.choghadiya)
          .filter((item: any) => item?.name)
          .map(
            (item: any) =>
              `${item.name}: ${formatDateTimeToTime(
                item?.starts_at
              )} - ${formatDateTimeToTime(item?.ends_at)}`
          )
          .join("\n")
      : "—",

    mantra: getDynamicWeekdayMantra(data?.weekday?.name || data?.weekday),
  };
}

export async function upsertTodayPanchangFallback() {
  const supabase = await createClient();
  const today = getTodayInIndia();

  const apiData = await fetchMumbaiPanchangFromApi();
  const choghadiyaData = await fetchMumbaiChoghadiyaFromApi();

  const raw = apiData?.raw_data || {};
  const data = raw?.output || raw?.data || raw;

  const yoga = getFromPossibleKeys(data, ["yoga", "yog", "yoga_details"]);
  const karana = getFromPossibleKeys(data, [
    "karana",
    "karan",
    "karana_details",
  ]);

  const aiInsights = await generateDailyPanchangInsights({
    tithi: apiData?.tithi || "Unknown",
    nakshatra: apiData?.nakshatra || "Unknown",
    yoga: getName(yoga) || "Unknown",
    karana: getName(karana) || "Unknown",
  });

  const payload = {
    panchang_date: today,
    location: "Mumbai, India",
    sunrise: apiData?.sunrise || "—",
    sunset: apiData?.sunset || "—",
    tithi: apiData?.tithi || "Today’s Tithi",
    nakshatra: apiData?.nakshatra || "Today’s Nakshatra",
    rahu_kaal: apiData?.rahu_kaal || "Check full Panchang",
    current_message:
      apiData?.current_message ||
      "Mumbai Panchang is being prepared. View full Panchang for details.",
    ai_good_for: aiInsights.good_for || [],
    ai_avoid: aiInsights.avoid || [],
    ai_message: aiInsights.message || "",
    raw_data: apiData?.raw_data || {},
    updated_at: new Date().toISOString(),
    choghadiya: choghadiyaData?.raw || null,
    shubh_choghadiya: choghadiyaData?.shubh || "—",
    ashubh_choghadiya: choghadiyaData?.ashubh || "—",
  };

  const { data: savedData, error } = await supabase
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

  return savedData;
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