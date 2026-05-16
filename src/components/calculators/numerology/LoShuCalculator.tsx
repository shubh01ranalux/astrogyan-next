"use client";

import { useState } from "react";
import Link from "next/link";
import {
  calculateLoShuGrid,
  type LoShuResult,
} from "@/lib/calculators/numerology/lo-shu";
import { createClient } from "@/lib/supabase/client";
import LeadCaptureFields, {
  getCalculatorLeadData,
} from "@/components/calculators/common/LeadCaptureFields";
import { saveCalculatorLead } from "@/lib/calculators/shared/save-calculator-lead";

export default function LoShuCalculator() {
  const supabase = createClient();

  const [result, setResult] = useState<LoShuResult | null>(null);
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

      const report = calculateLoShuGrid(dobValue);
      setResult(report);

      await saveCalculatorLead({
        supabase,
        sourceSlug: "lo-shu-grid-calculator",
        sourceTitle: "Lo Shu Grid Calculator",
        sourceUrl: "/free-tools/lo-shu-grid-calculator",
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        gender: lead.gender,
        dateOfBirth: dobValue,
        leadIntent: "Generated Lo Shu Grid report",
        inputData: {
          date_of_birth: dobValue,
        },
        resultData: {
          personality_number: report.personalityNumber,
          destiny_number: report.destinyNumber,
          present_numbers: report.presentNumbers,
          missing_numbers: report.missingNumbers,
          repeated_numbers: report.repeatedNumbers,
          present_arrows: report.presentArrows.map((item) => item.title),
          missing_arrows: report.missingArrows.map((item) => item.title),
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
            Lo Shu Grid Calculator
          </h2>

          <p className="mt-4 leading-8 text-[#6F5B69]">
            Enter your date of birth to generate your complete AstroGyan Lo Shu
            Grid report with personality number, destiny number, present
            numbers, missing numbers, repeated energies, arrows, strengths and
            remedies.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
              Calculation Method
            </p>
            <p className="mt-3 leading-7 text-[#5C3A57]">
              We extract all non-zero digits from the date of birth, calculate
              the Personality Number from the birth day, calculate the Destiny
              Number from the full date, and place all active digits into the
              traditional Lo Shu Grid.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="mt-6 space-y-5">
            <LeadCaptureFields showDateOfBirth />

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#5C3A57] px-8 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Calculating..." : "Calculate Lo Shu Grid"}
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
                Your detailed AstroGyan Lo Shu report will appear here after
                calculation.
              </p>
            </div>
          ) : (
            <LoShuReport result={result} />
          )}
        </div>
      </div>
    </section>
  );
}

function LoShuReport({ result }: { result: LoShuResult }) {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.5rem] bg-[#FFF9F4] p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
          Your Result
        </p>
        <h3 className="mt-3 font-display text-3xl text-[#5C3A57]">
          Complete Lo Shu Grid Report
        </h3>
        <p className="mt-4 leading-8 text-[#6F5B69]">{result.summary}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MiniCard title="DOB" value={formatDob(result.dob)} />
        <MiniCard title="Personality" value={result.personalityNumber} />
        <MiniCard title="Destiny" value={result.destinyNumber} />
      </div>

      <ResultBlock title="Calculation Breakdown">
        <div className="space-y-3 text-[#6F5B69]">
          <p>
            <b className="text-[#5C3A57]">Digits from DOB:</b>{" "}
            {result.rawDigits.join(", ")}
          </p>
          <p>
            <b className="text-[#5C3A57]">Numbers placed in grid:</b>{" "}
            {result.filledNumbers.join(", ")}
          </p>
          <p>
            <b className="text-[#5C3A57]">Present numbers:</b>{" "}
            {result.presentNumbers.join(", ") || "None"}
          </p>
          <p>
            <b className="text-[#5C3A57]">Missing numbers:</b>{" "}
            {result.missingNumbers.join(", ") || "None"}
          </p>
        </div>
      </ResultBlock>

      <ResultBlock title="Lo Shu Grid">
        <div className="grid grid-cols-3 gap-3">
          {result.grid.map((cell) => (
            <div
              key={cell.number}
              className={`rounded-2xl border p-4 text-center ${
                cell.count
                  ? "border-[#E6C89C] bg-white"
                  : "border-[#E6C89C]/40 bg-[#FFF9F4]/70 opacity-75"
              }`}
            >
              <p className="font-display text-3xl text-[#5C3A57]">
                {cell.count ? Array(cell.count).fill(cell.number).join(" ") : cell.number}
              </p>
              <p className="mt-2 text-xs text-[#6F5B69]">{cell.title}</p>
            </div>
          ))}
        </div>
      </ResultBlock>

      <ResultBlock title="Repeated Number Intensity">
        {result.repeatedNumbers.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {result.repeatedNumbers.map((item) => (
              <div key={item.number} className="rounded-2xl bg-[#FFF9F4] p-4">
                <p className="font-display text-2xl text-[#5C3A57]">
                  {item.number} repeated {item.count} times
                </p>
                <p className="mt-2 text-sm leading-7 text-[#6F5B69]">
                  This amplifies the qualities and lessons of number {item.number}.
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#6F5B69]">No repeated numbers found.</p>
        )}
      </ResultBlock>

      <ResultBlock title="Present Numbers Meaning">
        <div className="space-y-4">
          {result.grid
            .filter((cell) => cell.count > 0)
            .map((cell) => (
              <NumberMeaning key={cell.number} cell={cell} mode="present" />
            ))}
        </div>
      </ResultBlock>

      <ResultBlock title="Missing Numbers & Remedies">
        <div className="space-y-4">
          {result.grid
            .filter((cell) => cell.count === 0)
            .map((cell) => (
              <NumberMeaning key={cell.number} cell={cell} mode="missing" />
            ))}
        </div>
      </ResultBlock>

      <ResultBlock title="Present Arrows / Planes">
        {result.presentArrows.length ? (
          <div className="space-y-3">
            {result.presentArrows.map((arrow) => (
              <ArrowCard key={arrow.key} arrow={arrow} />
            ))}
          </div>
        ) : (
          <p className="text-[#6F5B69]">No complete present arrows found.</p>
        )}
      </ResultBlock>

      <ResultBlock title="Missing Arrows / Weak Planes">
        {result.missingArrows.length ? (
          <div className="space-y-3">
            {result.missingArrows.map((arrow) => (
              <ArrowCard key={arrow.key} arrow={arrow} />
            ))}
          </div>
        ) : (
          <p className="text-[#6F5B69]">No fully missing arrows found.</p>
        )}
      </ResultBlock>

      <div className="rounded-[1.5rem] bg-[#5C3A57] p-6 text-center text-white">
        <h3 className="font-display text-2xl">Want a deeper reading?</h3>
        <p className="mt-3 text-sm leading-7 text-[#F6EEE8]">
          Lo Shu gives a numerology overview. For personalised life, career,
          marriage and timing guidance, combine it with Kundli analysis.
        </p>
        <Link
          href="/book?service=lo-shu-grid-calculator"
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

function NumberMeaning({
  cell,
  mode,
}: {
  cell: LoShuResult["grid"][number];
  mode: "present" | "missing";
}) {
  return (
    <div className="rounded-2xl bg-[#FFF9F4] p-5">
      <p className="font-display text-2xl text-[#5C3A57]">
        {cell.number} — {cell.title}
      </p>
      <p className="mt-2 text-sm text-[#B784A7]">
        {cell.keywords.join(" • ")}
      </p>

      <p className="mt-4 leading-7 text-[#6F5B69]">
        {mode === "present" ? cell.strength : cell.missingMeaning}
      </p>

      {mode === "missing" && (
        <p className="mt-3 leading-7 text-[#5C3A57]">
          <b>Remedy:</b> {cell.remedy}
        </p>
      )}

      <div className="mt-4 grid gap-2 text-sm text-[#6F5B69] sm:grid-cols-2">
        <p><b>Element:</b> {cell.element}</p>
        <p><b>Planet:</b> {cell.planet}</p>
        <p><b>Direction:</b> {cell.direction}</p>
        <p><b>Colors:</b> {cell.colors.join(", ")}</p>
      </div>
    </div>
  );
}

function ArrowCard({ arrow }: { arrow: LoShuResult["presentArrows"][number] }) {
  return (
    <div className="rounded-2xl bg-[#FFF9F4] p-5">
      <p className="font-display text-2xl text-[#5C3A57]">
        {arrow.title} — {arrow.numbers.join(" • ")}
      </p>
      <p className="mt-3 leading-7 text-[#6F5B69]">{arrow.meaning}</p>
      <p className="mt-2 leading-7 text-[#5C3A57]">
        <b>Guidance:</b> {arrow.guidance}
      </p>
    </div>
  );
}

function formatDob(dob: string) {
  const [year, month, day] = dob.split("-");
  return `${day}/${month}/${year}`;
}