"use client";

import { useState } from "react";
import Link from "next/link";
import AstrologyLeadFields, {
  getAstrologyLeadData,
} from "@/components/calculators/common/AstrologyLeadFields";
import { createClient } from "@/lib/supabase/client";
import { saveCalculatorLead } from "@/lib/calculators/shared/save-calculator-lead";
import {
  calculateNakshatraReport,
  type NakshatraReport,
} from "@/lib/calculators/astrology/nakshatra";

export default function NakshatraCalculator() {
  const supabase = createClient();

  const [result, setResult] = useState<NakshatraReport | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleCalculate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const formData = new FormData(e.currentTarget);
      const lead = getAstrologyLeadData(formData);

      if (!lead.birthLatitude || !lead.birthLongitude) {
  throw new Error("Please select a birth place from the suggestions.");
}

const kundaliResponse = await fetch("/api/kundali/basic-report", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: lead.fullName,
    birthDate: lead.dateOfBirth,
    birthTime: lead.birthTime,
    birthPlace: lead.birthPlace,
    latitude: lead.birthLatitude,
    longitude: lead.birthLongitude,
    timezone: lead.birthTimezone,
  }),
});

const kundaliJson = await kundaliResponse.json();

if (!kundaliJson.ok) {
  throw new Error(
    kundaliJson.error || "Unable to calculate astrology details."
  );
}

const report = calculateNakshatraReport({
  fullName: lead.fullName,
  dateOfBirth: lead.dateOfBirth,
  birthTime: lead.birthTime,
  birthPlace: lead.birthPlace,
  birthLatitude: lead.birthLatitude,
  birthLongitude: lead.birthLongitude,
  birthTimezone: lead.birthTimezone,
  kundaliData: kundaliJson.data,
});

      setResult(report);

      await saveCalculatorLead({
        supabase,
        sourceSlug: "nakshatra-calculator",
        sourceTitle: "Nakshatra Calculator",
        sourceUrl: "/free-tools/nakshatra-calculator",
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        gender: lead.gender,
        dateOfBirth: lead.dateOfBirth,
        leadIntent: "Generated Nakshatra report",
        inputData: {
          date_of_birth: lead.dateOfBirth,
          birth_time: lead.birthTime,
          birth_place: lead.birthPlace,
          birth_latitude: lead.birthLatitude,
          birth_longitude: lead.birthLongitude,
          birth_timezone: lead.birthTimezone,
        },
        resultData: {
          nakshatra: report.nakshatra,
          pada: report.pada,
          lord: report.lord,
          deity: report.deity,
          confidence: report.confidence,
        },
      });
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="px-6 pb-24 sm:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/65 p-6 shadow-sm backdrop-blur-md sm:p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
            AstroGyan Vedic Astrology
          </p>

          <h2 className="mt-3 font-display text-3xl text-[#5C3A57]">
            Nakshatra Calculator
          </h2>

          <p className="mt-4 leading-8 text-[#6F5B69]">
            Calculate your birth Nakshatra using birth date, birth time and
            birth place. Nakshatra reveals your mind pattern, nature, instincts,
            talents and karmic tendencies.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
              Accuracy Note
            </p>
            <p className="mt-3 leading-7 text-[#5C3A57]">
              Exact Nakshatra requires sidereal Moon longitude from an
              astrology ephemeris/API. This page is ready for API integration
              and stores complete birth details for accurate consultation.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="mt-6 space-y-5">
            <AstrologyLeadFields />

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#5C3A57] px-8 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Calculating..." : "Calculate Nakshatra"}
            </button>

            {error && (
              <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                {error}
              </p>
            )}
          </form>
        </div>

        <div className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/65 p-6 shadow-sm backdrop-blur-md sm:p-8">
          {!result ? (
            <div className="flex h-full min-h-[360px] items-center justify-center rounded-[1.5rem] border border-dashed border-[#E6C89C]/60 bg-[#FFF9F4]/70 p-8 text-center">
              <p className="max-w-md leading-8 text-[#6F5B69]">
                Your Nakshatra report will appear here after calculation.
              </p>
            </div>
          ) : (
            <NakshatraReportView result={result} />
          )}
        </div>
      </div>
    </section>
  );
}

function NakshatraReportView({ result }: { result: NakshatraReport }) {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.5rem] bg-[#FFF9F4] p-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
          Your Birth Nakshatra
        </p>

        <h3 className="mt-3 font-display text-6xl text-[#5C3A57]">
          {result.nakshatra}
        </h3>

        <p className="mt-3 inline-flex rounded-full bg-[#E6C89C]/30 px-4 py-2 text-sm font-medium text-[#5C3A57]">
          Pada {result.pada} • Lord {result.lord}
        </p>

        <p className="mt-5 leading-8 text-[#6F5B69]">{result.meaning}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MiniCard title="Deity" value={result.deity} />
        <MiniCard title="Symbol" value={result.symbol} />
        <MiniCard title="Status" value={result.confidence} />
      </div>

      <ResultBlock title="Input Summary">
        <div className="space-y-3 text-[#6F5B69]">
          <p>
            <b className="text-[#5C3A57]">Name:</b> {result.fullName}
          </p>
          <p>
            <b className="text-[#5C3A57]">DOB:</b>{" "}
            {formatDob(result.dateOfBirth)}
          </p>
          <p>
            <b className="text-[#5C3A57]">Birth Time:</b> {result.birthTime}
          </p>
          <p>
            <b className="text-[#5C3A57]">Birth Place:</b> {result.birthPlace}
          </p>
        </div>
      </ResultBlock>

      <ResultBlock title="How It Is Calculated">
        <p className="leading-8 text-[#6F5B69]">{result.howCalculated}</p>
      </ResultBlock>

      <ResultBlock title="Nakshatra Nature">
        <p className="leading-8 text-[#6F5B69]">{result.nature}</p>
      </ResultBlock>

      <div className="grid gap-4 md:grid-cols-2">
        <InsightCard title="Personality Pattern" text={result.personality} />
        <InsightCard title="Career Pattern" text={result.career} />
        <InsightCard
          title="Relationship Pattern"
          text={result.relationship}
        />
        <InsightCard title="Remedy" text={result.remedy} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ListCard title="What To Do" items={result.whatToDo} />
        <ListCard title="What To Avoid" items={result.whatToAvoid} />
      </div>

      <p className="rounded-2xl bg-[#FFF9F4] p-4 text-sm leading-7 text-[#6F5B69]">
        This is an automated Vedic astrology report based on the birth details
        provided. For exact prediction, chart verification, personalised remedies
        and timing-based guidance, please book a consultation.
      </p>

      <div className="rounded-[1.5rem] bg-[#5C3A57] p-6 text-center text-white">
        <h3 className="font-display text-2xl">
          Want exact Nakshatra reading?
        </h3>
        <p className="mt-3 text-sm leading-7 text-[#F6EEE8]">
          For accurate Nakshatra, Pada, Dasha, compatibility and remedies, book
          a personalised consultation.
        </p>
        <Link
          href="/book?service=nakshatra-consultation"
          className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#5C3A57]"
        >
          Book Nakshatra Consultation
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

function formatDob(dob: string) {
  const [year, month, day] = dob.split("-");
  return `${day}/${month}/${year}`;
}