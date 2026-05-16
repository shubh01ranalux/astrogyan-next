"use client";

import { useState } from "react";
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

function getPlanetHouse(planet: any) {
  return planet?.house || planet?.house_number || planet?.bhava || "—";
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

function buildHouseMap(planets: any[]) {
  const houses: Record<number, string[]> = {};

  for (let i = 1; i <= 12; i++) houses[i] = [];

  planets.forEach((planet) => {
    const house = Number(getPlanetHouse(planet));

    if (house >= 1 && house <= 12) {
      houses[house].push(getPlanetName(planet));
    }
  });

  return houses;
}

export default function KundaliBasicReportClient() {
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<KundaliResult | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setResult(null);

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

      const reportResult = {
        input: payload,
        data: json.data,
      };

      setResult(reportResult);

      const planets = getPlanets(json.data);
      const ascendant = getAscendant(reportResult);
      const moon = getMoonPlanet(planets);

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
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const planets = result ? getPlanets(result.data) : [];
  const ascendant = result ? getAscendant(result) : {};
  const moon = getMoonPlanet(planets);
  const houses = buildHouseMap(planets);

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
              This tool uses FreeAstroAPI Vedic chart data with birth date,
              birth time, birthplace coordinates and Lahiri ayanamsha to prepare
              an automated Kundli report.
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
}: {
  result: KundaliResult;
  planets: any[];
  houses: Record<number, string[]>;
  ascendant: any;
  moon: any;
}) {
  return (
    <div className="space-y-8">
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
          birthplace coordinates and timezone. The chart shows the planetary
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
                <p className="mt-3 font-medium text-[#5C3A57]">
                  {houses[house]?.join(", ") || "—"}
                </p>
              </div>
            );
          })}
        </div>
      </ResultBlock>

      <ResultBlock title="Planetary Positions">
        <div className="space-y-3">
          {planets.map((planet, index) => (
            <div
              key={`${getPlanetName(planet)}-${index}`}
              className="rounded-2xl bg-[#FFF9F4] p-4 text-sm leading-7 text-[#5C3A57]"
            >
              <b>{getPlanetName(planet)}</b> · Sign: {getPlanetSign(planet)} ·
              House: {getPlanetHouse(planet)} · Degree: {getDegree(planet)} ·
              Nakshatra: {getPlanetNakshatra(planet)}
            </div>
          ))}
        </div>
      </ResultBlock>

      <div className="grid gap-4 md:grid-cols-2">
        <InsightCard
          title="Personality & Life Path"
          text="Lagna and 1st house placements show personality, body, confidence and how life begins to unfold."
        />
        <InsightCard
          title="Career Direction"
          text="The 10th house, 6th house, Saturn, Sun and Mercury placements should be checked for career, work style and professional growth."
        />
        <InsightCard
          title="Marriage & Relationships"
          text="The 7th house, Venus, Jupiter, Moon and Navamsa/D9 chart should be checked for relationship and marriage guidance."
        />
        <InsightCard
          title="Karmic Patterns"
          text="Rahu, Ketu, Saturn and the 8th/12th house patterns reveal karmic lessons, delays, detachment and transformation areas."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ListCard
          title="What To Do"
          items={[
            "Verify birth time carefully",
            "Read Lagna, Moon and house placements together",
            "Use remedies only after checking full chart",
            "Book full consultation for exact timing and Dasha guidance",
          ]}
        />

        <ListCard
          title="What To Avoid"
          items={[
            "Do not judge life from one planet only",
            "Do not wear gemstones without chart verification",
            "Do not ignore Dasha and transit timing",
            "Do not use automated report as final prediction",
          ]}
        />
      </div>

      <ResultBlock title="One Serious Remedy">
        <p className="leading-8 text-[#5C3A57]">
          Every Monday, offer water or milk to Shivling and pray for clarity,
          emotional balance and right guidance. Continue for 11 Mondays with
          discipline.
        </p>
      </ResultBlock>

      <p className="rounded-2xl bg-[#FFF9F4] p-4 text-sm leading-7 text-[#6F5B69]">
        This is an automated Vedic astrology report based on the birth details
        provided. For exact prediction, chart verification, personalised remedies
        and timing-based guidance, please book a consultation.
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
  );
}

function MiniCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-[#E6C89C]/40 bg-[#FFF9F4] p-4 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-[#B784A7]">
        {title}
      </p>
      <p className="mt-2 break-words font-display text-2xl text-[#5C3A57]">
        {value}
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

function InsightCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
      <h4 className="font-display text-2xl text-[#5C3A57]">{title}</h4>
      <p className="mt-3 leading-7 text-[#6F5B69]">{text}</p>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/75 p-5">
      <h4 className="font-display text-2xl text-[#5C3A57]">{title}</h4>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-[#FFF9F4] px-4 py-2 text-sm text-[#5C3A57]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}