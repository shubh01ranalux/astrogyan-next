"use client";

import { useState } from "react";
import Link from "next/link";
import AstrologyLeadFields, {
  getAstrologyLeadData,
} from "@/components/calculators/common/AstrologyLeadFields";
import { createClient } from "@/lib/supabase/client";
import { saveCalculatorLead } from "@/lib/calculators/shared/save-calculator-lead";
import {
  calculateSadeSatiReport,
  type SadeSatiReport,
} from "@/lib/calculators/astrology/sade-sati";

function getTodayDate() {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

function getCurrentTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function SadeSatiCalculator() {
  const supabase = createClient();

  const [result, setResult] = useState<SadeSatiReport | null>(null);
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

      const natalKundaliData = await fetchKundali({
        name: lead.fullName,
        birthDate: lead.dateOfBirth,
        birthTime: lead.birthTime,
        birthPlace: lead.birthPlace,
        latitude: lead.birthLatitude,
        longitude: lead.birthLongitude,
        timezone: lead.birthTimezone,
      });

      await wait(1200);

      const transitKundaliData = await fetchKundali({
        name: lead.fullName,
        birthDate: getTodayDate(),
        birthTime: getCurrentTime(),
        birthPlace: lead.birthPlace,
        latitude: lead.birthLatitude,
        longitude: lead.birthLongitude,
        timezone: lead.birthTimezone,
      });

      const report = calculateSadeSatiReport({
        fullName: lead.fullName,
        dateOfBirth: lead.dateOfBirth,
        birthTime: lead.birthTime,
        birthPlace: lead.birthPlace,
        natalKundaliData,
        transitKundaliData,
      });

      setResult(report);

      await saveCalculatorLead({
        supabase,
        sourceSlug: "sade-sati-calculator",
        sourceTitle: "Sade Sati Calculator",
        sourceUrl: "/free-tools/sade-sati-calculator",
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        gender: lead.gender,
        dateOfBirth: lead.dateOfBirth,
        leadIntent: "Generated Sade Sati report",
        inputData: {
          date_of_birth: lead.dateOfBirth,
          birth_time: lead.birthTime,
          birth_place: lead.birthPlace,
          birth_latitude: lead.birthLatitude,
          birth_longitude: lead.birthLongitude,
          birth_timezone: lead.birthTimezone,
        },
        resultData: {
          moon_sign: report.moonSign,
          saturn_sign: report.saturnSign,
          house_from_moon: report.houseFromMoon,
          is_active: report.isActive,
          phase: report.phase,
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
            Sade Sati Calculator
          </h2>

          <p className="mt-4 leading-8 text-[#6F5B69]">
            Check whether your Sade Sati is active by comparing your natal Moon
            sign with Saturn’s current transit sign using Vedic calculation.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
              Calculation Method
            </p>
            <p className="mt-3 leading-7 text-[#5C3A57]">
              This tool uses your birth chart to find your Moon sign and a
              current transit chart to find Saturn’s present sign. Sade Sati is
              active when Saturn is in the 12th, 1st or 2nd sign from your Moon.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="mt-6 space-y-5">
            <AstrologyLeadFields />

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#5C3A57] px-8 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Calculating..." : "Calculate Sade Sati"}
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
                Your Sade Sati report will appear here after calculation.
              </p>
            </div>
          ) : (
            <SadeSatiReportView result={result} />
          )}
        </div>
      </div>
    </section>
  );
}

function SadeSatiReportView({ result }: { result: SadeSatiReport }) {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.5rem] bg-[#FFF9F4] p-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
          Sade Sati Status
        </p>

        <h3 className="mt-3 font-display text-4xl text-[#5C3A57]">
          {result.title}
        </h3>

        <p
          className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-medium ${
            result.isActive
              ? "bg-amber-100 text-amber-800"
              : "bg-emerald-100 text-emerald-800"
          }`}
        >
          {result.isActive ? "Active" : "Not Active"} • {result.phase}
        </p>

        <p className="mt-5 leading-8 text-[#6F5B69]">{result.meaning}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MiniCard title="Moon Sign" value={result.moonSign} />
        <MiniCard title="Saturn Sign" value={result.saturnSign} />
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
        <p className="mt-4 leading-8 text-[#5C3A57]">
          Saturn is currently in the{" "}
          <b>{result.houseFromMoon} house from your Moon sign</b>.
        </p>
      </ResultBlock>

      <div className="grid gap-4 md:grid-cols-2">
        <InsightCard title="Career Impact" text={result.careerImpact} />
        <InsightCard title="Money Impact" text={result.moneyImpact} />
        <InsightCard
          title="Relationship Impact"
          text={result.relationshipImpact}
        />
        <InsightCard title="Health Impact" text={result.healthImpact} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ListCard title="What To Do" items={result.whatToDo} />
        <ListCard title="What To Avoid" items={result.whatToAvoid} />
      </div>

      <ResultBlock title="One Serious Remedy">
        <p className="leading-8 text-[#5C3A57]">{result.remedy}</p>
      </ResultBlock>

      <p className="rounded-2xl bg-[#FFF9F4] p-4 text-sm leading-7 text-[#6F5B69]">
        This is an automated Vedic astrology report based on the birth details
        provided. For exact prediction, chart verification, personalised remedies
        and timing-based guidance, please book a consultation.
      </p>

      <div className="rounded-[1.5rem] bg-[#5C3A57] p-6 text-center text-white">
        <h3 className="font-display text-2xl">Want exact Sade Sati guidance?</h3>
        <p className="mt-3 text-sm leading-7 text-[#F6EEE8]">
          Sade Sati results depend on your full chart, Saturn strength, Moon
          condition, Dasha and current transits. Book a personalised reading for
          accurate guidance.
        </p>
        <Link
          href="/book?service=sade-sati-consultation"
          className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#5C3A57]"
        >
          Book Sade Sati Consultation
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