"use client";

import { useState } from "react";
import Link from "next/link";
import {
  calculatePredictivePersonalityReport,
  type PredictivePersonalityReport,
} from "@/lib/calculators/numerology/predictive-personality";
import { createClient } from "@/lib/supabase/client";
import LeadCaptureFields, {
  getCalculatorLeadData,
} from "@/components/calculators/common/LeadCaptureFields";
import { saveCalculatorLead } from "@/lib/calculators/shared/save-calculator-lead";

export default function PredictivePersonalityCalculator() {
  const supabase = createClient();

  const [result, setResult] = useState<PredictivePersonalityReport | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleCalculate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const formData = new FormData(e.currentTarget);
      const lead = getCalculatorLeadData(formData);

      const report = calculatePredictivePersonalityReport(
        lead.fullName,
        lead.dateOfBirth
      );

      setResult(report);

      await saveCalculatorLead({
        supabase,
        sourceSlug: "predictive-personality-calculator",
        sourceTitle: "Predictive Personality Calculator",
        sourceUrl: "/free-tools/predictive-personality-calculator",
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        gender: lead.gender,
        dateOfBirth: lead.dateOfBirth,
        leadIntent: "Generated Predictive Personality report",
        inputData: {
          full_name: lead.fullName,
          date_of_birth: lead.dateOfBirth,
        },
        resultData: {
          name_number: report.nameNumber,
          destiny_number: report.destinyNumber,
          title: report.title,
          keywords: report.keywords,
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
            AstroGyan Numerology
          </p>

          <h2 className="mt-3 font-display text-3xl text-[#5C3A57]">
            Predictive Personality Calculator
          </h2>

          <p className="mt-4 leading-8 text-[#6F5B69]">
            Get a personality prediction using your full name and date of birth.
            This combines your name vibration with your destiny number to show
            personality, career, money, relationship and challenge patterns.
          </p>

          <form onSubmit={handleCalculate} className="mt-6 space-y-5">
            <LeadCaptureFields showDateOfBirth />

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#5C3A57] px-8 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Calculating..." : "Calculate Personality"}
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
                Your personality prediction report will appear here after
                calculation.
              </p>
            </div>
          ) : (
            <PredictiveReportView result={result} />
          )}
        </div>
      </div>
    </section>
  );
}

function PredictiveReportView({
  result,
}: {
  result: PredictivePersonalityReport;
}) {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.5rem] bg-[#FFF9F4] p-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
          Your Personality Pattern
        </p>

        <h3 className="mt-3 font-display text-3xl text-[#5C3A57]">
          {result.title}
        </h3>

        <p className="mt-5 leading-8 text-[#6F5B69]">{result.coreNature}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MiniCard title="Name No." value={result.nameNumber} />
        <MiniCard title="Destiny No." value={result.destinyNumber} />
        <MiniCard title="DOB" value={formatDob(result.dob)} />
      </div>

      <ResultBlock title="Personality Keywords">
        <div className="flex flex-wrap gap-2">
          {result.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full bg-[#FFF9F4] px-4 py-2 text-sm text-[#5C3A57]"
            >
              {keyword}
            </span>
          ))}
        </div>
      </ResultBlock>

      <div className="grid gap-4 md:grid-cols-2">
        <InsightCard title="Outer Personality" text={result.outerPersonality} />
        <InsightCard title="Life Direction" text={result.lifeDirection} />
        <InsightCard title="Career Pattern" text={result.careerPattern} />
        <InsightCard title="Money Pattern" text={result.moneyPattern} />
        <InsightCard
          title="Relationship Pattern"
          text={result.relationshipPattern}
        />
        <InsightCard title="Main Strength" text={result.strength} />
      </div>

      <ResultBlock title="Main Challenge">
        <p className="leading-8 text-[#6F5B69]">{result.challenge}</p>
      </ResultBlock>

      <ResultBlock title="Personal Remedy">
        <p className="leading-8 text-[#5C3A57]">{result.remedy}</p>
      </ResultBlock>

      <div className="rounded-[1.5rem] bg-[#5C3A57] p-6 text-center text-white">
        <h3 className="font-display text-2xl">
          Want deeper personality guidance?
        </h3>
        <p className="mt-3 text-sm leading-7 text-[#F6EEE8]">
          This calculator gives a numerology-based personality overview. For
          deeper career, relationship and life timing guidance, book a personal
          consultation.
        </p>
        <Link
          href="/book?service=predictive-personality-consultation"
          className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#5C3A57]"
        >
          Book Personality Consultation
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

function formatDob(dob: string) {
  const [year, month, day] = dob.split("-");
  return `${day}/${month}/${year}`;
}