"use client";

import { useState } from "react";
import Link from "next/link";
import {
  calculateFlamesReport,
  type FlamesReport,
} from "@/lib/calculators/fun/flames";
import { createClient } from "@/lib/supabase/client";
import LeadCaptureFields, {
  getCalculatorLeadData,
} from "@/components/calculators/common/LeadCaptureFields";
import { saveCalculatorLead } from "@/lib/calculators/shared/save-calculator-lead";

export default function FlamesCalculator() {
  const supabase = createClient();

  const [result, setResult] = useState<FlamesReport | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleCalculate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const formData = new FormData(e.currentTarget);
      const lead = getCalculatorLeadData(formData);
      const partnerName = String(formData.get("partner_name") || "");

      const report = calculateFlamesReport(lead.fullName, partnerName);
      setResult(report);

      await saveCalculatorLead({
        supabase,
        sourceSlug: "flames-calculator",
        sourceTitle: "FLAMES Calculator",
        sourceUrl: "/free-tools/flames-calculator",
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        gender: lead.gender,
        leadIntent: "Generated FLAMES relationship report",
        inputData: {
          name: lead.fullName,
          partner_name: partnerName,
        },
        resultData: {
          result: report.resultTitle,
          score: report.score,
          remaining_letters: report.remainingLetters,
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
            AstroGyan Fun Tool
          </p>

          <h2 className="mt-3 font-display text-3xl text-[#5C3A57]">
            FLAMES Calculator
          </h2>

          <p className="mt-4 leading-8 text-[#6F5B69]">
            Check the fun relationship vibration between your name and your
            partner’s name. This is a light-hearted compatibility tool, not a
            replacement for Kundli matching.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
              Calculation Method
            </p>
            <p className="mt-3 leading-7 text-[#5C3A57]">
              We compare both names, remove common letters, count the remaining
              letters and map the result to F-L-A-M-E-S.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="mt-6 space-y-5">
            <LeadCaptureFields />

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                Partner Name
              </span>
              <input
                name="partner_name"
                className="field w-full"
                placeholder="Enter partner name"
                required
              />
            </label>

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#5C3A57] px-8 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Calculating..." : "Calculate FLAMES"}
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
                Your FLAMES relationship report will appear here after
                calculation.
              </p>
            </div>
          ) : (
            <FlamesReportView result={result} />
          )}
        </div>
      </div>
    </section>
  );
}

function FlamesReportView({ result }: { result: FlamesReport }) {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.5rem] bg-[#FFF9F4] p-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
          Relationship Result
        </p>

        <h3 className="mt-3 font-display text-6xl text-[#5C3A57]">
          {result.resultTitle}
        </h3>

        <p className="mt-3 inline-flex rounded-full bg-[#E6C89C]/30 px-4 py-2 text-sm font-medium text-[#5C3A57]">
          Fun Score: {result.score}%
        </p>

        <p className="mt-5 leading-8 text-[#6F5B69]">{result.meaning}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MiniCard title="Your Name" value={result.name1} />
        <MiniCard title="Partner" value={result.name2} />
        <MiniCard title="Remaining" value={result.remainingLetters} />
      </div>

      <ResultBlock title="Relationship Energy">
        <p className="leading-8 text-[#6F5B69]">{result.relationshipEnergy}</p>
      </ResultBlock>

      <div className="grid gap-4 md:grid-cols-2">
        <InsightCard title="Strength" text={result.strength} />
        <InsightCard title="Challenge" text={result.challenge} />
      </div>

      <ResultBlock title="Advice">
        <p className="leading-8 text-[#5C3A57]">{result.advice}</p>
      </ResultBlock>

      <ResultBlock title="Best For">
        <div className="flex flex-wrap gap-2">
          {result.bestFor.map((item) => (
            <span
              key={item}
              className="rounded-full bg-[#FFF9F4] px-4 py-2 text-sm text-[#5C3A57]"
            >
              {item}
            </span>
          ))}
        </div>
      </ResultBlock>

      <div className="rounded-[1.5rem] bg-[#5C3A57] p-6 text-center text-white">
        <h3 className="font-display text-2xl">Want real compatibility analysis?</h3>
        <p className="mt-3 text-sm leading-7 text-[#F6EEE8]">
          FLAMES is a fun name-based tool. For serious relationship guidance,
          use Kundli matching and personalised compatibility analysis.
        </p>
        <Link
          href="/book?service=flames-relationship-consultation"
          className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#5C3A57]"
        >
          Book Relationship Consultation
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