"use client";

import { useState } from "react";
import Link from "next/link";
import {
  calculateNameNumerologyReport,
  type NameNumerologyReport,
} from "@/lib/calculators/numerology/name-numerology";
import { createClient } from "@/lib/supabase/client";
import LeadCaptureFields, {
  getCalculatorLeadData,
} from "@/components/calculators/common/LeadCaptureFields";
import { saveCalculatorLead } from "@/lib/calculators/shared/save-calculator-lead";

export default function NameNumerologyCalculator() {
  const supabase = createClient();

  const [result, setResult] = useState<NameNumerologyReport | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleCalculate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const formData = new FormData(e.currentTarget);
      const lead = getCalculatorLeadData(formData);
      const calculationName = lead.fullName;

      const report = calculateNameNumerologyReport(calculationName);
      setResult(report);

      await saveCalculatorLead({
        supabase,
        sourceSlug: "name-numerology-calculator",
        sourceTitle: "Name Numerology Calculator",
        sourceUrl: "/free-tools/name-numerology-calculator",
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        gender: lead.gender,
        leadIntent: "Generated Name Numerology report",
        inputData: {
          calculation_name: calculationName,
        },
        resultData: {
          name_number: report.nameNumber,
          total: report.total,
          title: report.title,
          lucky_colors: report.luckyColors,
          lucky_dates: report.luckyDates,
          favorable_numbers: report.favorableNumbers,
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
            Name Numerology Calculator
          </h2>

          <p className="mt-4 leading-8 text-[#6F5B69]">
            Calculate the vibration of your name using Chaldean numerology and
            get a complete AstroGyan report with personality traits, career
            direction, relationship pattern, money energy, lucky colours and
            remedies.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
              Calculation Method
            </p>
            <p className="mt-3 leading-7 text-[#5C3A57]">
              Each alphabet is converted into its Chaldean numerology value. The
              total is then reduced to a single digit, while Master Numbers 11,
              22 and 33 are preserved.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="mt-6 space-y-5">
            <LeadCaptureFields />


            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#5C3A57] px-8 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Calculating..." : "Calculate Name Number"}
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
                Your complete Name Numerology report will appear here after
                calculation.
              </p>
            </div>
          ) : (
            <NameNumerologyReport result={result} />
          )}
        </div>
      </div>
    </section>
  );
}

function NameNumerologyReport({ result }: { result: NameNumerologyReport }) {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.5rem] bg-[#FFF9F4] p-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
          Your Name Number
        </p>

        <h3 className="mt-3 font-display text-7xl text-[#5C3A57]">
          {result.nameNumber}
        </h3>

        <p className="mt-2 font-display text-3xl text-[#5C3A57]">
          {result.title}
        </p>

        {result.isMasterNumber && (
          <p className="mt-3 inline-flex rounded-full bg-[#E6C89C]/30 px-4 py-2 text-sm font-medium text-[#5C3A57]">
            Master Number Energy
          </p>
        )}

        <p className="mt-5 leading-8 text-[#6F5B69]">{result.meaning}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MiniCard title="Name" value={result.name} />
        <MiniCard title="Total" value={result.total} />
        <MiniCard title="Name Number" value={result.nameNumber} />
      </div>

      <ResultBlock title="Calculation Breakdown">
        <div className="grid gap-3 sm:grid-cols-2">
          {result.letters.map((item, index) => (
            <div
              key={`${item.letter}-${index}`}
              className="rounded-2xl bg-[#FFF9F4] px-4 py-3 text-[#5C3A57]"
            >
              {item.letter} = {item.value}
            </div>
          ))}
        </div>

        <p className="mt-5 leading-7 text-[#6F5B69]">
          Total: <b className="text-[#5C3A57]">{result.total}</b> → Name Number:{" "}
          <b className="text-[#5C3A57]">{result.nameNumber}</b>
        </p>
      </ResultBlock>

      <ResultBlock title="Core Personality">
        <p className="leading-8 text-[#6F5B69]">{result.personality}</p>
        <div className="mt-4 flex flex-wrap gap-2">
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
        <InsightCard title="Career Direction" text={result.career} />
        <InsightCard title="Relationship Pattern" text={result.relationship} />
        <InsightCard title="Money & Growth" text={result.money} />
        <InsightCard title="Main Challenge" text={result.challenge} />
      </div>

      <ResultBlock title="Personal Remedy">
        <p className="leading-8 text-[#5C3A57]">{result.remedy}</p>
      </ResultBlock>

      <div className="grid gap-4 md:grid-cols-2">
        <ListCard title="Lucky Colors" items={result.luckyColors} />
        <ListCard title="Lucky Dates" items={result.luckyDates.map(String)} />
        <ListCard
          title="Favourable Numbers"
          items={result.favorableNumbers.map(String)}
        />
      </div>

      <div className="rounded-[1.5rem] bg-[#5C3A57] p-6 text-center text-white">
        <h3 className="font-display text-2xl">Want name correction guidance?</h3>
        <p className="mt-3 text-sm leading-7 text-[#F6EEE8]">
          Name Numerology gives the vibration of your current name. For spelling
          correction, business name, baby name or brand name selection, book a
          personal consultation.
        </p>
        <Link
          href="/book?service=name-numerology-calculator"
          className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#5C3A57]"
        >
          Book Personal Consultation
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