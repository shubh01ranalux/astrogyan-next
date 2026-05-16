"use client";

import { useState } from "react";
import Link from "next/link";
import {
  calculateUnluckyDatesReport,
  type UnluckyDatesReport,
} from "@/lib/calculators/numerology/unlucky-dates";
import { createClient } from "@/lib/supabase/client";
import LeadCaptureFields, {
  getCalculatorLeadData,
} from "@/components/calculators/common/LeadCaptureFields";
import { saveCalculatorLead } from "@/lib/calculators/shared/save-calculator-lead";

export default function UnluckyDatesCalculator() {
  const supabase = createClient();

  const [result, setResult] = useState<UnluckyDatesReport | null>(null);
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

      const report = calculateUnluckyDatesReport(dobValue);
      setResult(report);

      await saveCalculatorLead({
        supabase,
        sourceSlug: "unlucky-dates-calculator",
        sourceTitle: "Unlucky Dates Calculator",
        sourceUrl: "/free-tools/unlucky-dates-calculator",
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        gender: lead.gender,
        dateOfBirth: dobValue,
        leadIntent: "Generated Unlucky Dates report",
        inputData: {
          date_of_birth: dobValue,
        },
        resultData: {
          destiny_number: report.destinyNumber,
          caution_dates: report.cautionDates,
          neutral_dates: report.neutralDates,
          balancing_dates: report.balancingDates,
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
            Unlucky Dates Calculator
          </h2>

          <p className="mt-4 leading-8 text-[#6F5B69]">
            Find dates that may need extra awareness based on your date of
            birth, along with balancing dates, safe uses and practical remedies.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
              Calculation Method
            </p>
            <p className="mt-3 leading-7 text-[#5C3A57]">
              We calculate your Destiny Number from your complete date of birth
              and map it with date vibrations that may feel less supportive.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="mt-6 space-y-5">
            <LeadCaptureFields showDateOfBirth />

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#5C3A57] px-8 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Calculating..." : "Calculate Unlucky Dates"}
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
                Your complete Unlucky Dates report will appear here after
                calculation.
              </p>
            </div>
          ) : (
            <UnluckyDatesReportView result={result} />
          )}
        </div>
      </div>
    </section>
  );
}

function UnluckyDatesReportView({ result }: { result: UnluckyDatesReport }) {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.5rem] bg-[#FFF9F4] p-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
          Dates to Use Carefully
        </p>

        <h3 className="mt-3 font-display text-5xl text-[#5C3A57]">
          {result.cautionDates.join(" • ")}
        </h3>

        <p className="mt-3 font-display text-2xl text-[#5C3A57]">
          {result.title}
        </p>

        <p className="mt-5 leading-8 text-[#6F5B69]">{result.meaning}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MiniCard title="DOB" value={formatDob(result.dob)} />
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

      <div className="grid gap-4 md:grid-cols-3">
        <ListCard title="Use Carefully" items={result.cautionDates.map(String)} />
        <ListCard title="Neutral Dates" items={result.neutralDates.map(String)} />
        <ListCard
          title="Balancing Dates"
          items={result.balancingDates.map(String)}
        />
      </div>

      <ResultBlock title="Why These Dates Need Awareness">
        <p className="leading-8 text-[#6F5B69]">{result.whyCareful}</p>
      </ResultBlock>

      <div className="grid gap-4 md:grid-cols-2">
        <InsightCard title="Career Caution" text={result.careerCaution} />
        <InsightCard title="Money Caution" text={result.moneyCaution} />
        <InsightCard
          title="Relationship Caution"
          text={result.relationshipCaution}
        />
        <ListCard title="Safe Use" items={result.safeUse} />
      </div>

      <ResultBlock title="Avoid Using These Dates For">
        <div className="flex flex-wrap gap-2">
          {result.avoidFor.map((item) => (
            <span
              key={item}
              className="rounded-full bg-[#FFF9F4] px-4 py-2 text-sm text-[#5C3A57]"
            >
              {item}
            </span>
          ))}
        </div>
      </ResultBlock>

      <ResultBlock title="Date Remedy">
        <p className="leading-8 text-[#5C3A57]">{result.remedy}</p>
      </ResultBlock>

      <div className="rounded-[1.5rem] bg-[#5C3A57] p-6 text-center text-white">
        <h3 className="font-display text-2xl">Want safer date planning?</h3>
        <p className="mt-3 text-sm leading-7 text-[#F6EEE8]">
          Unlucky dates show where extra awareness is needed. For exact date
          selection, muhurat and personalised timing, book a consultation.
        </p>
        <Link
          href="/book?service=unlucky-dates-consultation"
          className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#5C3A57]"
        >
          Book Unlucky Dates Consultation
        </Link>
      </div>
    </div>
  );
}

function MiniCard({ title, value }: { title: string | number; value: string | number }) {
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