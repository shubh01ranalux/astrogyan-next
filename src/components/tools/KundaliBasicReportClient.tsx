"use client";

import { type RefObject, useRef, useState } from "react";
import Link from "next/link";
import AstrologyLeadFields, {
  getAstrologyLeadData,
} from "@/components/calculators/common/AstrologyLeadFields";
import { createClient } from "@/lib/supabase/client";
import { saveCalculatorLead } from "@/lib/calculators/shared/save-calculator-lead";
import {
  getMoonPlanet,
  getPlanetName,
  getPlanetNakshatra,
  getPlanetSign,
  getPlanets,
  getOutput,
} from "@/lib/calculators/astrology/kundali-extractors";

type KundaliResult = {
  input: any;
  data: any;
};

type KundaliAIInsights = {
  personality: string;
  career: string;
  marriage: string;
  karmic_patterns: string;
  what_to_do: string[];
  what_to_avoid: string[];
  remedy: string;
};

type HouseMap = Record<
  number,
  {
    currentSign: string | number;
    planets: any[];
  }
>;

const ZODIAC_SIGN_NUMBERS: Record<string, number> = {
  Aries: 1,
  Taurus: 2,
  Gemini: 3,
  Cancer: 4,
  Leo: 5,
  Virgo: 6,
  Libra: 7,
  Scorpio: 8,
  Sagittarius: 9,
  Capricorn: 10,
  Aquarius: 11,
  Pisces: 12,
};

const fallbackInsights: KundaliAIInsights = {
  personality:
    "Your Lagna, Moon sign and planetary placements create a unique life pattern. A full reading is recommended for deeper interpretation.",
  career:
    "Career direction should be judged through the 10th house, 6th house, Saturn, Sun and Mercury placements.",
  marriage:
    "Marriage and relationship patterns should be judged through the 7th house, Venus, Jupiter, Moon and Navamsa.",
  karmic_patterns:
    "Rahu, Ketu and Saturn show important karmic lessons, delays, growth areas and transformation patterns.",
  what_to_do: [
    "Verify birth time carefully",
    "Read Lagna, Moon and houses together",
    "Book detailed consultation for Dasha and timing",
  ],
  what_to_avoid: [
    "Do not judge life from one planet only",
    "Do not wear gemstones without chart verification",
    "Do not treat automated report as final prediction",
  ],
  remedy:
    "Every Monday, offer water to Shivling and pray for clarity, emotional balance and right guidance for 11 Mondays.",
};

function getAscendant(result: any) {
  const output = getOutput(result?.data);
  return output?.ascendant || output?.lagna || {};
}

function getAscendantSign(ascendant: any) {
  return (
    ascendant?.sign?.name ||
    ascendant?.sign ||
    ascendant?.rashi?.name ||
    ascendant?.rashi ||
    ascendant?.zodiac_sign_name ||
    ascendant?.zodiac ||
    "—"
  );
}

function getAscendantCurrentSign(ascendant: any) {
  const raw =
    ascendant?.current_sign ||
    ascendant?.currentSign ||
    ascendant?.sign_id ||
    ascendant?.rashi_number ||
    ascendant?.zodiac_number ||
    ascendant?.sign?.number ||
    ascendant?.rashi?.number;

  if (raw) return Number(raw);

  const signName = getAscendantSign(ascendant);
  return ZODIAC_SIGN_NUMBERS[signName] || null;
}

function getPlanetHouse(planet: any) {
  return planet?.house || planet?.house_number || planet?.bhava || "—";
}

function getPlanetCurrentSign(planet: any) {
  return (
    planet?.current_sign ||
    planet?.currentSign ||
    planet?.sign_id ||
    planet?.rashi_number ||
    planet?.zodiac_number ||
    "—"
  );
}

function getPlanetRetroStatus(planet: any) {
  return Boolean(
    planet?.isRetro ||
      planet?.is_retro ||
      planet?.retrograde ||
      planet?.isRetrograde
  );
}

function getPlanetDisplayName(planet: any) {
  const name = getPlanetName(planet);
  return getPlanetRetroStatus(planet) ? `${name}*` : name;
}

function getDegree(planet: any) {
  const degree =
    planet?.degree ||
    planet?.degrees ||
    planet?.sign_degree ||
    planet?.absolute_degree;

  if (!degree && degree !== 0) return "—";

  return typeof degree === "number" ? degree.toFixed(2) : String(degree);
}

function getDerivedHouseSign(lagnaSignNumber: number | null, house: number) {
  if (!lagnaSignNumber) return "—";
  return ((lagnaSignNumber + house - 2) % 12) + 1;
}

function buildHouseMap(planets: any[], ascendant?: any) {
  const houses: HouseMap = {};
  const lagnaSignNumber = getAscendantCurrentSign(ascendant);

  for (let i = 1; i <= 12; i++) {
    houses[i] = {
      currentSign: getDerivedHouseSign(lagnaSignNumber, i),
      planets: [],
    };
  }

  planets.forEach((planet: any) => {
    const house = Number(getPlanetHouse(planet));

    if (house >= 1 && house <= 12) {
      houses[house].planets.push(planet);

      const planetCurrentSign = getPlanetCurrentSign(planet);

      if (planetCurrentSign !== "—") {
        houses[house].currentSign = planetCurrentSign;
      }
    }
  });

  return houses;
}

export default function KundaliBasicReportClient() {
  const supabase = createClient();
  const reportRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<KundaliResult | null>(null);
  const [aiInsights, setAiInsights] = useState<KundaliAIInsights | null>(null);
  const [error, setError] = useState("");

async function handleDownloadPdf() {
  if (!reportRef.current) return;

  const html2canvas = (await import("html2canvas")).default;
  const jsPDF = (await import("jspdf")).default;

  const canvas = await html2canvas(reportRef.current, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#F6EEE8",
    onclone: (clonedDocument) => {
      clonedDocument.querySelectorAll("*").forEach((node) => {
        const el = node as HTMLElement;

        el.style.color = "#5C3A57";
        el.style.backgroundColor = "#FFF9F4";
        el.style.borderColor = "#E6C89C";
        el.style.boxShadow = "none";
        el.style.textShadow = "none";
      });

      const root = clonedDocument.querySelector("[data-kundali-pdf]");
      if (root) {
        (root as HTMLElement).style.backgroundColor = "#F6EEE8";
      }
    },
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`${result?.input?.name || "kundali"}-astrogyan-kundli-report.pdf`);
}

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setResult(null);
      setAiInsights(null);

      const formData = new FormData(e.currentTarget);
      const lead = getAstrologyLeadData(formData);

      if (!lead.birthLatitude || !lead.birthLongitude) {
        throw new Error("Please select a birth place from the suggestions.");
      }

      const payload = {
        name: lead.fullName,
        birthDate: lead.dateOfBirth,
        birthTime: lead.birthTime,
        birthPlace: lead.birthPlace,
        latitude: lead.birthLatitude,
        longitude: lead.birthLongitude,
        timezone: lead.birthTimezone,
      };

      const response = await fetch("/api/kundali/basic-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();

      if (!json.ok) {
        throw new Error(json.error || "Unable to generate Kundli report.");
      }

      const reportResult: KundaliResult = {
        input: payload,
        data: json.data,
      };

      const planets = getPlanets(json.data);
      const ascendant = getAscendant(reportResult);
      const moon = getMoonPlanet(planets);
      const houses = buildHouseMap(planets, ascendant);

      const aiResponse = await fetch("/api/kundali/ai-insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: lead.fullName,
          lagna: getAscendantSign(ascendant),
          moonSign: getPlanetSign(moon),
          nakshatra: getPlanetNakshatra(moon),
          houses,
          planets: planets.map(
            (planet: any) =>
              `${getPlanetDisplayName(planet)} in ${getPlanetSign(
                planet
              )}, House ${getPlanetHouse(planet)}, Sign Number ${getPlanetCurrentSign(
                planet
              )}, Degree ${getDegree(planet)}, Nakshatra ${getPlanetNakshatra(
                planet
              )}`
          ),
        }),
      });

      const aiJson = await aiResponse.json();

      setResult(reportResult);

      if (aiJson.ok) {
        setAiInsights(aiJson.data);
      } else {
        setAiInsights(fallbackInsights);
      }

      await saveCalculatorLead({
        supabase,
        sourceSlug: "kundali-calculator",
        sourceTitle: "Kundali Calculator",
        sourceUrl: "/free-tools/kundali-report",
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        gender: lead.gender,
        dateOfBirth: lead.dateOfBirth,
        leadIntent: "Generated Kundali report",
        inputData: {
          date_of_birth: lead.dateOfBirth,
          birth_time: lead.birthTime,
          birth_place: lead.birthPlace,
          birth_latitude: lead.birthLatitude,
          birth_longitude: lead.birthLongitude,
          birth_timezone: lead.birthTimezone,
        },
        resultData: {
          lagna: getAscendantSign(ascendant),
          moon_sign: getPlanetSign(moon),
          nakshatra: getPlanetNakshatra(moon),
          planets_count: planets.length,
          status: "Vedic Calculated",
        },
      });
    } catch (err) {
      setResult(null);
      setAiInsights(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const planets = result ? getPlanets(result.data) : [];
  const ascendant = result ? getAscendant(result) : {};
  const moon = getMoonPlanet(planets);
  const houses = buildHouseMap(planets, ascendant);
  const insights = aiInsights || fallbackInsights;

  return (
    <section className="px-6 pb-24 sm:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-[2rem] border border-[#E6C89C]/40 bg-white/65 p-6 shadow-sm backdrop-blur-md sm:p-8"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
            AstroGyan Vedic Astrology
          </p>

          <h2 className="mt-3 font-display text-3xl text-[#5C3A57]">
            Kundali Calculator
          </h2>

          <p className="mt-4 leading-8 text-[#6F5B69]">
            The Kundali Calculator uses your date, time and place of birth to
            generate your Vedic birth chart. It calculates planetary positions,
            houses, Lagna, Moon sign and Nakshatra at the exact time of birth.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
              Calculation Method
            </p>
            <p className="mt-3 leading-7 text-[#5C3A57]">
              This tool uses automated Vedic chart data with birth date, birth
              time, birthplace coordinates and Lahiri ayanamsha for a
              personalised interpretation from the exact chart placements.
            </p>
          </div>

          <div className="mt-6 space-y-5">
            <AstrologyLeadFields />

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#5C3A57] px-8 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate Kundli"}
            </button>

            {error && (
              <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                {error}
              </p>
            )}
          </div>
        </form>

        <div className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/65 p-6 shadow-sm backdrop-blur-md sm:p-8">
          {!result ? (
            <div className="flex min-h-[420px] items-center justify-center rounded-[1.5rem] border border-dashed border-[#E6C89C]/60 bg-[#FFF9F4]/70 p-8 text-center">
              <div>
                <p className="text-5xl">☉</p>
                <h2 className="mt-5 font-display text-3xl text-[#5C3A57]">
                  Your Kundli Report Will Appear Here
                </h2>
                <p className="mt-3 leading-7 text-[#6F5B69]">
                  Generate a Vedic birth chart with Lagna, Moon sign,
                  Nakshatra, houses and planetary positions.
                </p>
              </div>
            </div>
          ) : (
            <KundaliReportView
              result={result}
              planets={planets}
              houses={houses}
              ascendant={ascendant}
              moon={moon}
              insights={insights}
              reportRef={reportRef}
              onDownloadPdf={handleDownloadPdf}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function KundaliReportView({
  result,
  planets,
  houses,
  ascendant,
  moon,
  insights,
  reportRef,
  onDownloadPdf,
}: {
  result: KundaliResult;
  planets: any[];
  houses: HouseMap;
  ascendant: any;
  moon: any;
  insights: KundaliAIInsights;
  reportRef: RefObject<HTMLDivElement | null>;
  onDownloadPdf: () => void;
}) {
  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onDownloadPdf}
          className="rounded-full bg-[#5C3A57] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:bg-[#B784A7]"
        >
          Download PDF
        </button>
      </div>

      <div
  ref={reportRef}
  data-kundali-pdf
  className="space-y-8 rounded-[1.5rem] bg-white/40 p-4"
>
        <div className="rounded-[1.5rem] bg-[#FFF9F4] p-6 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
            AstroGyan Kundli Report
          </p>

          <h3 className="mt-3 font-display text-4xl text-[#5C3A57]">
            {result.input.name}
          </h3>

          <p className="mt-3 text-sm leading-7 text-[#6F5B69]">
            {result.input.birthDate} · {result.input.birthTime} ·{" "}
            {result.input.birthPlace}
          </p>

          <p className="mt-4 inline-flex rounded-full bg-[#E6C89C]/30 px-4 py-2 text-sm font-medium text-[#5C3A57]">
            Vedic Calculated
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <MiniCard title="Lagna" value={getAscendantSign(ascendant)} />
          <MiniCard title="Moon Sign" value={getPlanetSign(moon)} />
          <MiniCard title="Nakshatra" value={getPlanetNakshatra(moon)} />
        </div>

        <ResultBlock title="How This Kundli Was Calculated">
          <p className="leading-8 text-[#6F5B69]">
            This Kundli is calculated using your birth date, exact birth time,
            birthplace coordinates and timezone. The chart shows planetary
            positions and houses at the moment of birth. Lagna shows your body,
            identity and life direction. Moon sign shows your mind and emotional
            nature. Houses show where planetary results express in life.
          </p>
        </ResultBlock>

        <ResultBlock title="House-wise Planet Placements">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 12 }).map((_, index) => {
              const house = index + 1;

              return (
                <div
                  key={house}
                  className="rounded-2xl border border-[#E6C89C]/40 bg-[#FFF9F4] p-4"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-[#B784A7]">
                    House {house}
                  </p>

                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B784A7]">
                      Sign {houses[house]?.currentSign || "—"}
                    </p>

                    {houses[house]?.planets?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {houses[house].planets.map(
                          (planet: any, planetIndex: number) => (
                            <span
                              key={`${getPlanetName(planet)}-${planetIndex}`}
                              className="rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-[#5C3A57]"
                            >
                              {getPlanetDisplayName(planet)}
                            </span>
                          )
                        )}
                      </div>
                    ) : (
                      <p className="font-medium text-[#5C3A57]">—</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-center text-xs text-[#8B7285]">
            * indicates retrograde planets.
          </p>
        </ResultBlock>

        <ResultBlock title="Planetary Positions">
          <div className="space-y-3">
            {planets.map((planet: any, index: number) => (
              <div
                key={`${getPlanetName(planet)}-${index}`}
                className="rounded-2xl bg-[#FFF9F4] p-4 text-sm leading-7 text-[#5C3A57]"
              >
                <b>{getPlanetDisplayName(planet)}</b> · Sign:{" "}
                {getPlanetSign(planet)} · House: {getPlanetHouse(planet)} ·
                Zodiac No: {getPlanetCurrentSign(planet)} · Degree:{" "}
                {getDegree(planet)} · Nakshatra: {getPlanetNakshatra(planet)}
              </div>
            ))}
          </div>
        </ResultBlock>

        <div className="grid gap-4 md:grid-cols-2">
          <InsightCard
            title="Personality & Life Path"
            text={insights.personality}
          />
          <InsightCard title="Career Direction" text={insights.career} />
          <InsightCard
            title="Marriage & Relationships"
            text={insights.marriage}
          />
          <InsightCard
            title="Karmic Patterns"
            text={insights.karmic_patterns}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ListCard title="What To Do" items={insights.what_to_do || []} />
          <ListCard
            title="What To Avoid"
            items={insights.what_to_avoid || []}
          />
        </div>

        <ResultBlock title="One Serious Remedy">
          <p className="leading-8 text-[#5C3A57]">{insights.remedy}</p>
        </ResultBlock>

        <p className="rounded-2xl bg-[#FFF9F4] p-4 text-sm leading-7 text-[#6F5B69]">
          This is an automated Vedic astrology report based on the birth details
          provided. For exact prediction, chart verification, personalised
          remedies and timing-based guidance, please book a consultation.
        </p>

        <div className="rounded-[1.5rem] bg-[#5C3A57] p-6 text-center text-white">
          <h3 className="font-display text-2xl">Want full Kundli reading?</h3>
          <p className="mt-3 text-sm leading-7 text-[#F6EEE8]">
            For exact career, marriage, health, Dasha, transit, remedies and
            gemstone guidance, book a personalised Kundli consultation.
          </p>
          <Link
            href="/book?service=kundli-reading"
            className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#5C3A57]"
          >
            Book Kundli Reading
          </Link>
        </div>
      </div>
    </div>
  );
}

function MiniCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-[#E6C89C]/40 bg-[#FFF9F4] p-4 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-[#B784A7]">
        {title}
      </p>
      <p className="mt-2 break-words font-display text-2xl text-[#5C3A57]">
        {value || "—"}
      </p>
    </div>
  );
}

function ResultBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/75 p-6">
      <h3 className="font-display text-2xl text-[#5C3A57]">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function InsightCard({ title, text }: { title: string; text?: string }) {
  return (
    <div className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
      <h4 className="font-display text-2xl text-[#5C3A57]">{title}</h4>
      <p className="mt-3 leading-7 text-[#6F5B69]">
        {text || "Insight will appear after interpretation."}
      </p>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/75 p-5">
      <h4 className="font-display text-2xl text-[#5C3A57]">{title}</h4>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.length ? (
          items.map((item) => (
            <span
              key={item}
              className="rounded-full bg-[#FFF9F4] px-4 py-2 text-sm text-[#5C3A57]"
            >
              {item}
            </span>
          ))
        ) : (
          <p className="leading-7 text-[#6F5B69]">
            Guidance will appear after interpretation.
          </p>
        )}
      </div>
    </div>
  );
}