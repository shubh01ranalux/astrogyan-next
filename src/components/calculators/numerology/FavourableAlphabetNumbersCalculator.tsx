"use client";

import { useState } from "react";
import Link from "next/link";
import {
  calculateFavourableAlphabetNumbersReport,
  type FavourableAlphabetNumbersReport,
} from "@/lib/calculators/numerology/favourable-alphabet-numbers";
import { createClient } from "@/lib/supabase/client";
import LeadCaptureFields, {
  getCalculatorLeadData,
} from "@/components/calculators/common/LeadCaptureFields";
import { saveCalculatorLead } from "@/lib/calculators/shared/save-calculator-lead";

export default function FavourableAlphabetNumbersCalculator() {
  const supabase = createClient();

  const [result, setResult] =
    useState<FavourableAlphabetNumbersReport | null>(null);
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

      const report = calculateFavourableAlphabetNumbersReport(dobValue);
      setResult(report);

      await saveCalculatorLead({
        supabase,
        sourceSlug: "favourable-alphabet-numbers-calculator",
        sourceTitle: "Favourable Alphabet and Numbers Calculator",
        sourceUrl: "/free-tools/favourable-alphabet-numbers-calculator",
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        gender: lead.gender,
        dateOfBirth: dobValue,
        leadIntent: "Generated Favourable Alphabet and Numbers report",
        inputData: {
          date_of_birth: dobValue,
        },
        resultData: {
          destiny_number: report.destinyNumber,
          favourable_alphabets: report.favourableAlphabets,
          favourable_numbers: report.favourableNumbers,
          lucky_dates: report.luckyDates,
          avoid_numbers: report.avoidNumbers,
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
            Favourable Alphabet & Numbers Calculator
          </h2>

          <p className="mt-4 leading-8 text-[#6F5B69]">
            Find favourable alphabets, numbers and dates based on your date of
            birth. Useful for names, usernames, brand names, business names and
            important planning.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
              Calculation Method
            </p>
            <p className="mt-3 leading-7 text-[#5C3A57]">
              We calculate your Destiny Number from your complete date of birth
              and map it with compatible alphabets, numbers and date vibrations.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="mt-6 space-y-5">
            <LeadCaptureFields showDateOfBirth />

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#5C3A57] px-8 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Calculating..." : "Calculate Favourable Values"}
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
                Your favourable alphabets and numbers report will appear here
                after calculation.
              </p>
            </div>
          ) : (
            <FavourableReportView result={result} />
          )}
        </div>
      </div>
    </section>
  );
}

function FavourableReportView({
  result,
}: {
  result: FavourableAlphabetNumbersReport;
}) {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.5rem] bg-[#FFF9F4] p-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
          Your Favourable Alphabets
        </p>

        <h3 className="mt-3 font-display text-5xl text-[#5C3A57]">
          {result.favourableAlphabets.join(" • ")}
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
        <ListCard title="Favourable Alphabets" items={result.favourableAlphabets} />
        <ListCard
          title="Favourable Numbers"
          items={result.favourableNumbers.map(String)}
        />
        <ListCard title="Lucky Dates" items={result.luckyDates.map(String)} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <InsightCard title="Name Use" text={result.nameUse} />
        <InsightCard title="Business Use" text={result.businessUse} />
        <InsightCard title="Relationship Use" text={result.relationshipUse} />
        <InsightCard title="Caution" text={result.caution} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ListCard
          title="Support Numbers"
          items={result.supportNumbers.map(String)}
        />
        <ListCard
          title="Use Carefully"
          items={result.avoidNumbers.map(String)}
        />
      </div>

      <ResultBlock title="Numerology Remedy">
        <p className="leading-8 text-[#5C3A57]">{result.remedy}</p>
      </ResultBlock>

      <div className="rounded-[1.5rem] bg-[#5C3A57] p-6 text-center text-white">
        <h3 className="font-display text-2xl">
          Want name or brand correction?
        </h3>
        <p className="mt-3 text-sm leading-7 text-[#F6EEE8]">
          Favourable alphabets and numbers are useful for names, business names,
          baby names, usernames, launch dates and brand identity.
        </p>
        <Link
          href="/book?service=favourable-alphabet-numbers-consultation"
          className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#5C3A57]"
        >
          Book Alphabet & Number Consultation
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