import Link from "next/link";
import { getTodayPanchang } from "@/lib/panchang";

function getMumbaiTime() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

export default async function PanchangTopBar() {
  const panchang = await getTodayPanchang();

  if (!panchang) return null;

  return (
    <div className="sticky top-[92px] z-30 border-b border-[#E6C89C]/20 bg-[#2A172A]/95 px-4 py-2 text-[#F6EEE8] shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center text-xs sm:text-sm">
        <span className="text-[#E6C89C]">
          Mumbai Panchang
        </span>

        <span>
          🕒 {getMumbaiTime()}
        </span>

        <span>
          तिथि: {panchang.tithi || "—"}
        </span>

        <span>
          नक्षत्र: {panchang.nakshatra || "—"}
        </span>

        <span>
          राहु काल: {panchang.rahu_kaal || "—"}
        </span>

        <Link
          href="/panchang"
          className="text-[#E6C89C] underline-offset-4 hover:underline"
        >
          View full Panchang
        </Link>
      </div>
    </div>
  );
}