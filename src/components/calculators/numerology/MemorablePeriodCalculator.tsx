"use client";

import { useState } from "react";
import Link from "next/link";
import {
  calculateMemorablePeriodReport,
  type MemorablePeriodReport,
} from "@/lib/calculators/numerology/memorable-period";
import { createClient } from "@/lib/supabase/client";
import LeadCaptureFields, {
  getCalculatorLeadData,
} from "@/components/calculators/common/LeadCaptureFields";
import { saveCalculatorLead } from "@/lib/calculators/shared/save-calculator-lead";

export default function MemorablePeriodCalculator() {
  const supabase = createClient();

  const [result, setResult] = useState<MemorablePeriodReport | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleCalculate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const formData = new FormData(e.currentTarget);
      const lead = getCalculatorLeadData(formData);
      const dobValue = lead.dateOfBirth;

      const report = calculateMemorablePeriodReport(dobValue);
      setResult(report);

      await saveCalculatorLead({
        supabase,
        sourceSlug: "memorable-period-of-life-calculator",
        sourceTitle: "Memorable Period of Life Calculator",
        sourceUrl: "/free-tools/memorable-period-of-life-calculator",
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        gender: lead.gender,
        dateOfBirth: dobValue,
        leadIntent: "Generated Memorable Period of Life report",
        inputData: {
          date_of_birth: dobValue,
        },
        resultData: {
          destiny_number: report.destinyNumber,
          current_age: report.currentAge,
          memorable_ages: report.memorableAges,
          coming_memorable_ages: report.comingMemorableAges,
          title: report.title,
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
            Memorable Period of Life Calculator
          </h2>

          <p className="mt-4 leading-8 text-[#6F5B69]">
            Find the important age periods and milestone years of your life
            based on your date of birth and destiny number.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
              Calculation Method
            </p>
            <p className="mt-3 leading-7 text-[#5C3A57]">
              We calculate your Destiny Number from your date of birth and map
              it with numerology milestone ages and life phases.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="mt-6 space-y-5">
            <LeadCaptureFields showDateOfBirth />

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#5C3A57] px-8 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Calculating..." : "Calculate Life Periods"}
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
                Your memorable life period report will appear here after
                calculation.
              </p>
            </div>
          ) : (
            <MemorablePeriodReportView result={result} />
          )}
        </div>
      </div>
    </section>
  );
}

function MemorablePeriodReportView({
  result,
}: {
  result: MemorablePeriodReport;
}) {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.5rem] bg-[#FFF9F4] p-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
          Your Life Milestone Pattern
        </p>

        <h3 className="mt-3 font-display text-3xl text-[#5C3A57]">
          {result.title}
        </h3>

        <p className="mt-5 leading-8 text-[#6F5B69]">{result.meaning}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MiniCard title="Current Age" value={result.currentAge} />
        <MiniCard title="Destiny No." value={result.destinyNumber} />
        <MiniCard title="Digit Total" value={result.total} />
      </div>

      <ResultBlock title="Calculation Breakdown">
        <div className="space-y-3 text-[#6F5B69]">
          <p>
            <b className="text-[#5C3A57]">Digits used:</b>{" "}
            {result.digits.join(" + ")}
          </p>
          <p>
            <b className="text-[#5C3A57]">Total:</b> {result.total}
          </p>
          <p>
            <b className="text-[#5C3A57]">Destiny Number:</b>{" "}
            {result.destinyNumber}
          </p>
        </div>
      </ResultBlock>

      <ResultBlock title="Memorable Ages">
        <div className="flex flex-wrap gap-2">
          {result.memorableAges.map((age) => (
            <span
              key={age}
              className="rounded-full bg-[#FFF9F4] px-4 py-2 text-sm text-[#5C3A57]"
            >
              Age {age}
            </span>
          ))}
        </div>
      </ResultBlock>

      <ResultBlock title="Upcoming Memorable Ages">
        {result.comingMemorableAges.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {result.comingMemorableAges.map((age) => (
              <span
                key={age}
                className="rounded-full bg-[#E6C89C]/30 px-4 py-2 text-sm font-medium text-[#5C3A57]"
              >
                Age {age}
              </span>
            ))}
          </div>
        ) : (
          <p className="leading-8 text-[#6F5B69]">
            Your listed milestone ages have already passed. Focus now on wisdom,
            stability and purposeful contribution.
          </p>
        )}
      </ResultBlock>

      <ResultBlock title="Life Phases">
        <div className="space-y-4">
          {result.lifePhases.map((phase) => (
            <div key={phase.title} className="rounded-2xl bg-[#FFF9F4] p-5">
              <p className="font-display text-2xl text-[#5C3A57]">
                {phase.title} — {phase.ageRange}
              </p>
              <p className="mt-3 leading-7 text-[#6F5B69]">{phase.meaning}</p>
              <p className="mt-3 leading-7 text-[#5C3A57]">
                <b>Focus:</b> {phase.focus}
              </p>
              <p className="mt-2 leading-7 text-[#6F5B69]">
                <b>Caution:</b> {phase.caution}
              </p>
            </div>
          ))}
        </div>
      </ResultBlock>

      <div className="grid gap-4 md:grid-cols-2">
        <InsightCard title="Career Pattern" text={result.careerPattern} />
        <InsightCard
          title="Relationship Pattern"
          text={result.relationshipPattern}
        />
        <InsightCard title="Money Pattern" text={result.moneyPattern} />
        <InsightCard title="Personal Remedy" text={result.remedy} />
      </div>

      <div className="rounded-[1.5rem] bg-[#5C3A57] p-6 text-center text-white">
        <h3 className="font-display text-2xl">Want life timeline guidance?</h3>
        <p className="mt-3 text-sm leading-7 text-[#F6EEE8]">
          Milestone ages show broad life periods. For exact timing, career,
          marriage, finance and remedies, book a personalised consultation.
        </p>
        <Link
          href="/book?service=memorable-period-life-consultation"
          className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#5C3A57]"
        >
          Book Life Period Consultation
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