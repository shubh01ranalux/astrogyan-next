import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { getTodayPanchang, parsePanchangDetails } from "@/lib/panchang";
import { getSiteSettings } from "@/lib/site-settings";

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 border-b border-[#E6C89C]/30 py-3 last:border-b-0">
      <p className="font-semibold text-[#D56F4E]">{label}</p>
      <p className="whitespace-pre-line font-medium leading-7 text-[#5C3A57]">
        {value}
      </p>
    </div>
  );
}

export default async function PanchangPage() {
  const [panchang, settings] = await Promise.all([
    getTodayPanchang(),
    getSiteSettings(),
  ]);

  const details = parsePanchangDetails(panchang);

  const goodFor = Array.isArray(details.goodFor)
    ? details.goodFor
    : String(details.goodFor)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar
        logo={settings.site_logo}
        title={settings.site_name || "Astrogyan"}
      />

      <PageHero
        eyebrow="Daily Panchang"
        title="Today’s Panchang"
        description="View daily tithi, nakshatra, rahu kaal, choghadiya and auspicious timings for Mumbai."
      />

      <section className="px-6 pb-24 sm:px-10">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-[#E6C89C]/50 bg-white/75 p-6 shadow-xl backdrop-blur-md sm:p-10">
          <div className="text-center">
            <p className="font-display text-4xl text-[#5C3A57]">
              दैनिक Panchang
            </p>

            <div className="mx-auto mt-6 w-fit rounded-full border border-[#E6C89C]/50 bg-[#FFF9F4] px-8 py-4 shadow-sm">
              <h2 className="font-display text-3xl text-[#1D1A6D]">
                {details.date}
              </h2>
            </div>

            <p className="mt-8 text-2xl font-bold text-black">
              {details.mantra}
            </p>

            <p className="mt-3 text-sm uppercase tracking-[0.25em] text-[#B784A7]">
              {details.location}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-10 border-y border-[#E6C89C]/30 py-5">
            <div className="text-center">
              <p className="text-3xl">🌅</p>
              <p className="mt-2 text-lg font-bold text-[#5C3A57]">
                {details.sunrise}
              </p>
            </div>

            <div className="text-center">
              <p className="text-3xl">🌇</p>
              <p className="mt-2 text-lg font-bold text-[#5C3A57]">
                {details.sunset}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <DetailRow label="Tithi" value={details.tithi} />
            <DetailRow label="Paksha" value={details.paksha} />
            <DetailRow label="Moonsign" value={details.moonsign} />
            <DetailRow label="Sunsign" value={details.sunsign} />
            <DetailRow label="Nakshatra" value={details.nakshatra} />
            <DetailRow label="Yog" value={details.yoga} />
            <DetailRow label="Karan" value={details.karana} />
          </div>

          <div className="mt-8 rounded-[2rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
            <DetailRow label="Rahu Kaal" value={details.rahuKaal} />
            <DetailRow label="Choghadiya" value={details.choghadiyaList} />
          </div>

          <div className="mt-8 grid gap-5 rounded-[2rem] border border-[#E6C89C]/40 bg-white/70 p-5 sm:grid-cols-[140px_1fr]">
            <p className="font-semibold leading-7 text-[#D56F4E]">
              Today is good for:
            </p>

            <ul className="list-disc space-y-1 pl-5 font-semibold tracking-[0.15em] text-[#5C3A57]">
              {goodFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {details.aiMessage && (
            <p className="mt-8 rounded-[2rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5 text-center font-medium leading-8 text-[#5C3A57]">
              {details.aiMessage}
            </p>
          )}

          <p className="mt-10 text-center text-sm text-[#9A7B8F]">
            Panchang is automatically updated daily for Mumbai, India.
          </p>
        </div>
      </section>

      <Footer
        logo={settings.site_logo}
        title={settings.site_name || "Astrogyan"}
        subtitle={
          settings.site_tagline || "Ancient Vedic Wisdom for Modern Life"
        }
      />
    </main>
  );
}