"use client";

import { useState } from "react";
import Link from "next/link";
import {
  calculatePersonalYearReport,
  type PersonalYearReport,
} from "@/lib/calculators/numerology/personal-year";
import { createClient } from "@/lib/supabase/client";
import LeadCaptureFields, {
  getCalculatorLeadData,
} from "@/components/calculators/common/LeadCaptureFields";
import { saveCalculatorLead } from "@/lib/calculators/shared/save-calculator-lead";

export default function PersonalYearCalculator() {
  const supabase = createClient();

  const [result, setResult] = useState<PersonalYearReport | null>(null);
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

      const report = calculatePersonalYearReport(dobValue);
      setResult(report);

      await saveCalculatorLead({
        supabase,
        sourceSlug: "personal-year-calculator",
        sourceTitle: "Personal Year Calculator",
        sourceUrl: "/free-tools/personal-year-calculator",
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        gender: lead.gender,
        dateOfBirth: dobValue,
        leadIntent: "Generated Personal Year report",
        inputData: {
          date_of_birth: dobValue,
          current_year: report.currentYear,
        },
        resultData: {
          personal_year_number: report.personalYearNumber,
          title: report.title,
          total: report.total,
          lucky_colors: report.luckyColors,
          lucky_dates: report.luckyDates,
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
            Personal Year Calculator
          </h2>

          <p className="mt-4 leading-8 text-[#6F5B69]">
            Your Personal Year Number reveals the main theme of your current
            year based on your date of birth and the running calendar year.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
              Calculation Method
            </p>
            <p className="mt-3 leading-7 text-[#5C3A57]">
              We add your birth day, birth month and the current year, then
              reduce the total to a single digit from 1 to 9.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="mt-6 space-y-5">
            <LeadCaptureFields showDateOfBirth />

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#5C3A57] px-8 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Calculating..." : "Calculate Personal Year"}
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
                Your complete Personal Year report will appear here after
                calculation.
              </p>
            </div>
          ) : (
            <PersonalYearReportView result={result} />
          )}
        </div>
      </div>
    </section>
  );
}

function PersonalYearReportView({ result }: { result: PersonalYearReport }) {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.5rem] bg-[#FFF9F4] p-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
          Your Personal Year
        </p>

        <h3 className="mt-3 font-display text-7xl text-[#5C3A57]">
          {result.personalYearNumber}
        </h3>

        <p className="mt-2 font-display text-3xl text-[#5C3A57]">
          {result.title}
        </p>

        <p className="mt-5 leading-8 text-[#6F5B69]">{result.meaning}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MiniCard title="DOB" value={formatDob(result.dob)} />
        <MiniCard title="Year" value={result.currentYear} />
        <MiniCard title="Total" value={result.total} />
      </div>

      <ResultBlock title="Calculation Breakdown">
        <div className="space-y-3 text-[#6F5B69]">
          <p>
            <b className="text-[#5C3A57]">Digits used:</b>{" "}
            {result.calculationDigits.join(" + ")}
          </p>
          <p>
            <b className="text-[#5C3A57]">Total:</b> {result.total}
          </p>
          <p>
            <b className="text-[#5C3A57]">Personal Year Number:</b>{" "}
            {result.personalYearNumber}
          </p>
        </div>
      </ResultBlock>

      <ResultBlock title="Year Keywords">
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
        <InsightCard title="Career Theme" text={result.career} />
        <InsightCard title="Money Theme" text={result.money} />
        <InsightCard title="Love Theme" text={result.love} />
        <InsightCard title="Health Theme" text={result.health} />
      </div>

      <ResultBlock title="Main Focus">
        <p className="leading-8 text-[#6F5B69]">{result.focus}</p>
      </ResultBlock>

      <ResultBlock title="What to Avoid">
        <p className="leading-8 text-[#6F5B69]">{result.avoid}</p>
      </ResultBlock>

      <ResultBlock title="Personal Remedy">
        <p className="leading-8 text-[#5C3A57]">{result.remedy}</p>
      </ResultBlock>

      <div className="grid gap-4 md:grid-cols-2">
        <ListCard title="Lucky Colors" items={result.luckyColors} />
        <ListCard title="Lucky Dates" items={result.luckyDates.map(String)} />
      </div>

      <div className="rounded-[1.5rem] bg-[#5C3A57] p-6 text-center text-white">
        <h3 className="font-display text-2xl">Want yearly guidance?</h3>
        <p className="mt-3 text-sm leading-7 text-[#F6EEE8]">
          Personal Year shows the yearly numerology theme. For exact timing,
          career, relationship and remedies, book a personalised consultation.
        </p>
        <Link
          href="/book?service=personal-year-consultation"
          className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#5C3A57]"
        >
          Book Personal Year Consultation
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
      <p className="mt-2 font-display text-3xl text-[#5C3A57]">{value}</p>
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