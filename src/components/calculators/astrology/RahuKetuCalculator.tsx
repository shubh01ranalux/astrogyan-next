"use client";

import { useState } from "react";
import Link from "next/link";
import AstrologyLeadFields, {
  getAstrologyLeadData,
} from "@/components/calculators/common/AstrologyLeadFields";
import { createClient } from "@/lib/supabase/client";
import { saveCalculatorLead } from "@/lib/calculators/shared/save-calculator-lead";
import {
  calculateRahuKetuReport,
  type RahuKetuReport,
} from "@/lib/calculators/astrology/rahu-ketu";

export default function RahuKetuCalculator() {
  const supabase = createClient();

  const [result, setResult] = useState<RahuKetuReport | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function fetchKundali(payload: {
    name: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    latitude: number;
    longitude: number;
    timezone: number;
  }) {
    const response = await fetch("/api/kundali/basic-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();

    if (!json.ok) {
      throw new Error(json.error || "Unable to calculate Kundali details.");
    }

    return json.data;
  }

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

      const kundaliData = await fetchKundali({
        name: lead.fullName,
        birthDate: lead.dateOfBirth,
        birthTime: lead.birthTime,
        birthPlace: lead.birthPlace,
        latitude: lead.birthLatitude,
        longitude: lead.birthLongitude,
        timezone: lead.birthTimezone,
      });

      const report = calculateRahuKetuReport({
        fullName: lead.fullName,
        dateOfBirth: lead.dateOfBirth,
        birthTime: lead.birthTime,
        birthPlace: lead.birthPlace,
        kundaliData,
      });

      setResult(report);

      await saveCalculatorLead({
        supabase,
        sourceSlug: "rahu-ketu-calculator",
        sourceTitle: "Rahu Ketu Calculator",
        sourceUrl: "/free-tools/rahu-ketu-calculator",
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        gender: lead.gender,
        dateOfBirth: lead.dateOfBirth,
        leadIntent: "Generated Rahu Ketu report",
        inputData: {
          date_of_birth: lead.dateOfBirth,
          birth_time: lead.birthTime,
          birth_place: lead.birthPlace,
          birth_latitude: lead.birthLatitude,
          birth_longitude: lead.birthLongitude,
          birth_timezone: lead.birthTimezone,
        },
        resultData: {
          rahu_sign: report.rahuSign,
          rahu_house: report.rahuHouse,
          ketu_sign: report.ketuSign,
          ketu_house: report.ketuHouse,
          axis: report.axis,
          status: report.status,
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
            Rahu Ketu Calculator
          </h2>

          <p className="mt-4 leading-8 text-[#6F5B69]">
            Calculate Rahu and Ketu placement from your Vedic birth chart and
            understand your karmic desire, detachment pattern, axis lessons and
            remedy.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
              Calculation Method
            </p>
            <p className="mt-3 leading-7 text-[#5C3A57]">
              This tool uses FreeAstroAPI Kundali data to extract Rahu and Ketu
              signs and houses. Rahu and Ketu are always opposite each other and
              form a karmic axis in the chart.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="mt-6 space-y-5">
            <AstrologyLeadFields />

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#5C3A57] px-8 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Calculating..." : "Calculate Rahu Ketu"}
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
                Your Rahu Ketu report will appear here after calculation.
              </p>
            </div>
          ) : (
            <RahuKetuReportView result={result} />
          )}
        </div>
      </div>
    </section>
  );
}

function RahuKetuReportView({ result }: { result: RahuKetuReport }) {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.5rem] bg-[#FFF9F4] p-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
          Rahu Ketu Axis
        </p>

        <h3 className="mt-3 font-display text-5xl text-[#5C3A57]">
          {result.rahuHouse} / {result.ketuHouse}
        </h3>

        <p className="mt-3 inline-flex rounded-full bg-[#E6C89C]/30 px-4 py-2 text-sm font-medium text-[#5C3A57]">
          Rahu in {result.rahuSign} • Ketu in {result.ketuSign}
        </p>

        <p className="mt-5 leading-8 text-[#6F5B69]">{result.meaning}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MiniCard title="Rahu" value={`${result.rahuSign}, H${result.rahuHouse}`} />
        <MiniCard title="Ketu" value={`${result.ketuSign}, H${result.ketuHouse}`} />
        <MiniCard title="Status" value={result.status} />
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

      <div className="grid gap-4 md:grid-cols-2">
        <InsightCard title="Rahu Meaning" text={result.rahuMeaning} />
        <InsightCard title="Ketu Meaning" text={result.ketuMeaning} />
      </div>

      <ResultBlock title="Karmic Lesson">
        <p className="leading-8 text-[#6F5B69]">{result.karmicLesson}</p>
      </ResultBlock>

      <div className="grid gap-4 md:grid-cols-2">
        <InsightCard title="Career Impact" text={result.careerImpact} />
        <InsightCard title="Money Impact" text={result.moneyImpact} />
        <InsightCard
          title="Relationship Impact"
          text={result.relationshipImpact}
        />
        <InsightCard title="One Serious Remedy" text={result.remedy} />
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
        <h3 className="font-display text-2xl">Want exact Rahu Ketu guidance?</h3>
        <p className="mt-3 text-sm leading-7 text-[#F6EEE8]">
          Rahu Ketu results depend on sign, house, aspects, conjunctions and
          Dasha. Book a personalised reading for exact karmic guidance.
        </p>
        <Link
          href="/book?service=rahu-ketu-consultation"
          className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#5C3A57]"
        >
          Book Rahu Ketu Consultation
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