"use client";

import { useState } from "react";
import Link from "next/link";
import {
  calculateLoveReport,
  type LoveReport,
} from "@/lib/calculators/fun/love";
import { createClient } from "@/lib/supabase/client";
import LeadCaptureFields, {
  getCalculatorLeadData,
} from "@/components/calculators/common/LeadCaptureFields";
import { saveCalculatorLead } from "@/lib/calculators/shared/save-calculator-lead";

export default function LoveCalculator() {
  const supabase = createClient();

  const [result, setResult] = useState<LoveReport | null>(null);
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

      const report = calculateLoveReport(lead.fullName, partnerName);
      setResult(report);

      await saveCalculatorLead({
        supabase,
        sourceSlug: "love-calculator",
        sourceTitle: "Love Calculator",
        sourceUrl: "/free-tools/love-calculator",
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        gender: lead.gender,
        leadIntent: "Generated Love Compatibility report",
        inputData: {
          name: lead.fullName,
          partner_name: partnerName,
        },
        resultData: {
          love_score: report.loveScore,
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
            AstroGyan Fun Tool
          </p>

          <h2 className="mt-3 font-display text-3xl text-[#5C3A57]">
            Love Calculator
          </h2>

          <p className="mt-4 leading-8 text-[#6F5B69]">
            Check a fun love compatibility score using your name and your
            partner’s name. This is a light-hearted tool for engagement, not a
            replacement for Kundli matching.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
              Calculation Method
            </p>
            <p className="mt-3 leading-7 text-[#5C3A57]">
              We generate a stable name-based love score from both names and
              map it to a relationship-style compatibility report.
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
              {saving ? "Calculating..." : "Calculate Love Score"}
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
                Your Love Compatibility report will appear here after
                calculation.
              </p>
            </div>
          ) : (
            <LoveReportView result={result} />
          )}
        </div>
      </div>
    </section>
  );
}

function LoveReportView({ result }: { result: LoveReport }) {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.5rem] bg-[#FFF9F4] p-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
          Love Compatibility Score
        </p>

        <h3 className="mt-3 font-display text-7xl text-[#5C3A57]">
          {result.loveScore}%
        </h3>

        <p className="mt-2 font-display text-3xl text-[#5C3A57]">
          {result.title}
        </p>

        <p className="mt-5 leading-8 text-[#6F5B69]">{result.meaning}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <MiniCard title="Your Name" value={result.name1} />
        <MiniCard title="Partner Name" value={result.name2} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <InsightCard title="Emotional Bond" text={result.emotionalBond} />
        <InsightCard title="Communication" text={result.communication} />
        <InsightCard title="Attraction" text={result.attraction} />
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
        <h3 className="font-display text-2xl">Want serious compatibility analysis?</h3>
        <p className="mt-3 text-sm leading-7 text-[#F6EEE8]">
          Love Calculator is a fun name-based tool. For real relationship
          guidance, use Kundli matching and personalised compatibility analysis.
        </p>
        <Link
          href="/book?service=love-compatibility-consultation"
          className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#5C3A57]"
        >
          Book Love Compatibility Consultation
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