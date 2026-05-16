"use client";

import { useState } from "react";
import Link from "next/link";
import {
  calculateLuckyVehicleNumberReport,
  type LuckyVehicleNumberReport,
} from "@/lib/calculators/numerology/lucky-vehicle-number";
import { createClient } from "@/lib/supabase/client";
import LeadCaptureFields, {
  getCalculatorLeadData,
} from "@/components/calculators/common/LeadCaptureFields";
import { saveCalculatorLead } from "@/lib/calculators/shared/save-calculator-lead";

export default function LuckyVehicleNumberCalculator() {
  const supabase = createClient();

  const [result, setResult] = useState<LuckyVehicleNumberReport | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleCalculate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const formData = new FormData(e.currentTarget);
      const lead = getCalculatorLeadData(formData);
      const vehicleNumber = String(formData.get("vehicle_number") || "");

      const report = calculateLuckyVehicleNumberReport(vehicleNumber);
      setResult(report);

      await saveCalculatorLead({
        supabase,
        sourceSlug: "lucky-vehicle-number-calculator",
        sourceTitle: "Lucky Vehicle Number Calculator",
        sourceUrl: "/free-tools/lucky-vehicle-number-calculator",
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        gender: lead.gender,
        leadIntent: "Generated Lucky Vehicle Number report",
        inputData: {
          vehicle_number: vehicleNumber,
        },
        resultData: {
          vehicle_number_value: report.vehicleNumberValue,
          total: report.total,
          rating: report.rating,
          title: report.title,
          favorable_numbers: report.favorableNumbers,
          lucky_colors: report.luckyColors,
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
            Lucky Vehicle Number Calculator
          </h2>

          <p className="mt-4 leading-8 text-[#6F5B69]">
            Check the numerology vibration of your car, bike or vehicle number
            and understand its travel, money, safety and balancing energy.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
              Calculation Method
            </p>
            <p className="mt-3 leading-7 text-[#5C3A57]">
              We convert letters and digits in your vehicle number into
              numerology values, add them and reduce the total to a single
              vehicle number vibration.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="mt-6 space-y-5">
            <LeadCaptureFields />

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                Vehicle Number
              </span>
              <input
                name="vehicle_number"
                className="field w-full uppercase"
                placeholder="Example: MH12AB1234"
                required
              />
            </label>

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#5C3A57] px-8 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Calculating..." : "Calculate Vehicle Number"}
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
                Your complete Vehicle Number report will appear here after
                calculation.
              </p>
            </div>
          ) : (
            <VehicleNumberReportView result={result} />
          )}
        </div>
      </div>
    </section>
  );
}

function VehicleNumberReportView({
  result,
}: {
  result: LuckyVehicleNumberReport;
}) {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.5rem] bg-[#FFF9F4] p-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
          Your Vehicle Number
        </p>

        <h3 className="mt-3 font-display text-7xl text-[#5C3A57]">
          {result.vehicleNumberValue}
        </h3>

        <p className="mt-2 font-display text-3xl text-[#5C3A57]">
          {result.title}
        </p>

        <p className="mt-3 inline-flex rounded-full bg-[#E6C89C]/30 px-4 py-2 text-sm font-medium text-[#5C3A57]">
          Rating: {result.rating}
        </p>

        <p className="mt-5 leading-8 text-[#6F5B69]">{result.meaning}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MiniCard title="Vehicle" value={result.cleanVehicleNumber} />
        <MiniCard title="Total" value={result.total} />
        <MiniCard title="Number" value={result.vehicleNumberValue} />
      </div>

      <ResultBlock title="Calculation Breakdown">
        <div className="grid gap-3 sm:grid-cols-2">
          {result.characters.map((item, index) => (
            <div
              key={`${item.character}-${index}`}
              className="rounded-2xl bg-[#FFF9F4] px-4 py-3 text-[#5C3A57]"
            >
              {item.character} = {item.value}
            </div>
          ))}
        </div>

        <p className="mt-5 leading-7 text-[#6F5B69]">
          Total: <b className="text-[#5C3A57]">{result.total}</b> → Vehicle
          Number:{" "}
          <b className="text-[#5C3A57]">{result.vehicleNumberValue}</b>
        </p>
      </ResultBlock>

      <div className="grid gap-4 md:grid-cols-2">
        <InsightCard title="Travel Energy" text={result.travelEnergy} />
        <InsightCard title="Money Energy" text={result.moneyEnergy} />
        <InsightCard title="Safety Energy" text={result.safetyEnergy} />
        <InsightCard title="Caution" text={result.caution} />
      </div>

      <ResultBlock title="Vehicle Remedy">
        <p className="leading-8 text-[#5C3A57]">{result.remedy}</p>
      </ResultBlock>

      <div className="grid gap-4 md:grid-cols-2">
        <ListCard title="Lucky Colors" items={result.luckyColors} />
        <ListCard
          title="Favourable Numbers"
          items={result.favorableNumbers.map(String)}
        />
      </div>

      <div className="rounded-[1.5rem] bg-[#5C3A57] p-6 text-center text-white">
        <h3 className="font-display text-2xl">Want vehicle number guidance?</h3>
        <p className="mt-3 text-sm leading-7 text-[#F6EEE8]">
          Vehicle numerology can be checked with your birth number, destiny
          number and purpose of vehicle use for more personalised guidance.
        </p>
        <Link
          href="/book?service=lucky-vehicle-number-consultation"
          className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#5C3A57]"
        >
          Book Vehicle Number Consultation
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