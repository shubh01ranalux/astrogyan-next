"use client";

import { useState } from "react";
import Link from "next/link";
import PlaceSearchInput from "@/components/forms/PlaceSearchInput";
import { createClient } from "@/lib/supabase/client";
import { saveCalculatorLead } from "@/lib/calculators/shared/save-calculator-lead";
import type { BabyNameReport } from "@/lib/calculators/astrology/baby-name-generator";

const STYLES = [
  "Traditional Sanskrit",
  "Modern",
  "Luxury",
  "Gen-Z",
  "Spiritual",
  "Rare Unique",
  "Short Cute",
  "Royal",
  "Minimal",
  "International Friendly",
];

export default function BabyNameGenerator() {
  const supabase = createClient();

  const [mode, setMode] = useState<"birth" | "parents">("birth");
  const [result, setResult] = useState<BabyNameReport | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function fetchKundali(payload: {
    name: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    latitude: number;
    longitude: number;
    timezone: number;
  }) {
    const response = await fetch("/api/kundali/basic-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();

    if (!json.ok) {
      throw new Error(json.error || "Unable to calculate baby birth chart.");
    }

    return json.data;
  }

  async function handleGenerate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setResult(null);

      const formData = new FormData(e.currentTarget);

      const parentName = String(formData.get("parent_name") || "");
      const phone = String(formData.get("phone") || "");
      const email = String(formData.get("email") || "");
      const babyGender = String(formData.get("baby_gender") || "");
      const preferredStyle = String(formData.get("preferred_style") || "");

      let report: BabyNameReport;

      if (mode === "birth") {
        const babyName = String(formData.get("baby_name") || "Baby");
        const babyDob = String(formData.get("baby_date_of_birth") || "");
        const babyTime = String(formData.get("baby_birth_time") || "");
        const babyPlace = String(formData.get("birth_place") || "");
        const babyLat = Number(formData.get("birth_latitude") || "");
        const babyLon = Number(formData.get("birth_longitude") || "");
        const babyTimezone = Number(formData.get("birth_timezone") || "5.5");

        if (!babyDob || !babyTime || !babyPlace || !babyLat || !babyLon) {
          throw new Error("Please enter complete baby birth details and select birth place from suggestions.");
        }

        const kundaliData = await fetchKundali({
          name: babyName,
          birthDate: babyDob,
          birthTime: babyTime,
          birthPlace: babyPlace,
          latitude: babyLat,
          longitude: babyLon,
          timezone: babyTimezone,
        });

        const aiResponse = await fetch("/api/baby-name/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mode: "nakshatra",
            babyGender,
            preferredStyle,
            kundaliData,
          }),
        });

        const aiJson = await aiResponse.json();

        if (!aiJson.ok) {
          throw new Error(aiJson.error || "Unable to generate baby names.");
        }

        report = aiJson.data;

        await saveCalculatorLead({
          supabase,
          sourceSlug: "baby-name-generator",
          sourceTitle: "Baby Name Generator",
          sourceUrl: "/free-tools/baby-name-generator",
          fullName: parentName,
          phone,
          email,
          gender: babyGender,
          leadIntent: "Generated Nakshatra-based baby names",
          inputData: {
            mode: "nakshatra",
            baby_name: babyName,
            baby_gender: babyGender,
            preferred_style: preferredStyle,
            baby_date_of_birth: babyDob,
            baby_birth_time: babyTime,
            baby_birth_place: babyPlace,
            baby_birth_latitude: babyLat,
            baby_birth_longitude: babyLon,
            baby_birth_timezone: babyTimezone,
          },
          resultData: {
            mode: report.mode,
            nakshatra: report.nakshatra,
            moon_sign: report.moonSign,
            lucky_initials: report.luckyInitials,
            best_recommendation: report.bestRecommendation,
          },
        });
      } else {
        const motherName = String(formData.get("mother_name") || "");
        const motherDob = String(formData.get("mother_dob") || "");
        const fatherName = String(formData.get("father_name") || "");
        const fatherDob = String(formData.get("father_dob") || "");

        if (!motherName || !motherDob || !fatherName || !fatherDob) {
          throw new Error("Please enter both parents' names and dates of birth.");
        }

        const aiResponse = await fetch("/api/baby-name/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mode: "parent_numerology",
            motherName,
            motherDob,
            fatherName,
            fatherDob,
            babyGender,
            preferredStyle,
          }),
        });

        const aiJson = await aiResponse.json();

        if (!aiJson.ok) {
          throw new Error(aiJson.error || "Unable to generate baby names.");
        }

        report = aiJson.data;

        await saveCalculatorLead({
          supabase,
          sourceSlug: "baby-name-generator",
          sourceTitle: "Baby Name Generator",
          sourceUrl: "/free-tools/baby-name-generator",
          fullName: parentName || `${motherName} & ${fatherName}`,
          phone,
          email,
          gender: babyGender,
          leadIntent: "Generated parent numerology baby names",
          inputData: {
            mode: "parent_numerology",
            mother_name: motherName,
            mother_dob: motherDob,
            father_name: fatherName,
            father_dob: fatherDob,
            baby_gender: babyGender,
            preferred_style: preferredStyle,
          },
          resultData: {
            mode: report.mode,
            parent_numerology: report.parentNumerology,
            lucky_initials: report.luckyInitials,
            best_recommendation: report.bestRecommendation,
          },
        });
      }

      setResult(report);
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
            AstroGyan AI Naming Engine
          </p>

          <h2 className="mt-3 font-display text-3xl text-[#5C3A57]">
            Baby Name Generator
          </h2>

          <p className="mt-4 leading-8 text-[#6F5B69]">
            Generate meaningful baby names using Nakshatra astrology or parents’
            combined numerology. Names are created with a traditional-modern,
            luxury and Gen-Z friendly style.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setMode("birth")}
              className={`rounded-full border px-5 py-3 text-sm font-medium transition ${
                mode === "birth"
                  ? "border-[#5C3A57] bg-[#5C3A57] text-white"
                  : "border-[#5C3A57]/20 bg-white text-[#5C3A57]"
              }`}
            >
              Baby Birth Details Available
            </button>

            <button
              type="button"
              onClick={() => setMode("parents")}
              className={`rounded-full border px-5 py-3 text-sm font-medium transition ${
                mode === "parents"
                  ? "border-[#5C3A57] bg-[#5C3A57] text-white"
                  : "border-[#5C3A57]/20 bg-white text-[#5C3A57]"
              }`}
            >
              Use Parents’ Numerology
            </button>
          </div>

          <form onSubmit={handleGenerate} className="mt-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="parent_name"
                className="field w-full"
                placeholder="Parent / Contact Name"
                required
              />

              <input
                name="phone"
                className="field w-full"
                placeholder="Phone Number"
                required
              />

              <input
                name="email"
                type="email"
                className="field w-full"
                placeholder="Email Address"
                required
              />

              <select name="baby_gender" className="field w-full" required>
                <option value="">Baby Gender Preference</option>
                <option>Boy</option>
                <option>Girl</option>
                <option>Neutral</option>
              </select>

              <select name="preferred_style" className="field w-full sm:col-span-2" required>
                <option value="">Preferred Name Style</option>
                {STYLES.map((style) => (
                  <option key={style}>{style}</option>
                ))}
              </select>
            </div>

            {mode === "birth" ? (
              <div className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
                <h3 className="font-display text-2xl text-[#5C3A57]">
                  Baby Birth Details
                </h3>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <input
                    name="baby_name"
                    className="field w-full"
                    placeholder="Baby Name / Baby"
                  />

                  <input
                    name="baby_date_of_birth"
                    type="date"
                    className="field w-full"
                    required
                  />

                  <input
                    name="baby_birth_time"
                    type="time"
                    className="field w-full"
                    required
                  />

                  <div className="sm:col-span-2">
                    <PlaceSearchInput />
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
                <h3 className="font-display text-2xl text-[#5C3A57]">
                  Parents’ Details
                </h3>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <input
                    name="mother_name"
                    className="field w-full"
                    placeholder="Mother Name"
                    required
                  />

                  <input
                    name="mother_dob"
                    type="date"
                    className="field w-full"
                    required
                  />

                  <input
                    name="father_name"
                    className="field w-full"
                    placeholder="Father Name"
                    required
                  />

                  <input
                    name="father_dob"
                    type="date"
                    className="field w-full"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#5C3A57] px-8 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Generating Names..." : "Generate Baby Names"}
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
            <div className="flex h-full min-h-[420px] items-center justify-center rounded-[1.5rem] border border-dashed border-[#E6C89C]/60 bg-[#FFF9F4]/70 p-8 text-center">
              <p className="max-w-md leading-8 text-[#6F5B69]">
                Your AI-generated baby name report will appear here.
              </p>
            </div>
          ) : (
            <BabyNameReportView result={result} />
          )}
        </div>
      </div>
    </section>
  );
}

function BabyNameReportView({ result }: { result: BabyNameReport }) {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.5rem] bg-[#FFF9F4] p-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
          Best Recommendation
        </p>

        <h3 className="mt-3 font-display text-5xl text-[#5C3A57]">
          {result.bestRecommendation}
        </h3>

        <p className="mt-3 inline-flex rounded-full bg-[#E6C89C]/30 px-4 py-2 text-sm font-medium text-[#5C3A57]">
          {result.energySource}
        </p>

        <p className="mt-5 leading-8 text-[#6F5B69]">
          {result.whyThisSuits}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MiniCard title="Mode" value={result.mode === "nakshatra" ? "Nakshatra" : "Parent Numerology"} />
        <MiniCard title="Gender" value={result.babyGender} />
        <MiniCard title="Style" value={result.preferredStyle} />
      </div>

      {result.parentNumerology && (
        <ResultBlock title="Parents’ Combined Numerology">
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniCard title="Mother No." value={result.parentNumerology.motherNumber} />
            <MiniCard title="Father No." value={result.parentNumerology.fatherNumber} />
            <MiniCard title="Combined No." value={result.parentNumerology.combinedNumber} />
          </div>
          <p className="mt-5 leading-8 text-[#6F5B69]">
            Energy: {result.parentNumerology.energy}
          </p>
        </ResultBlock>
      )}

      {result.nakshatra && (
        <ResultBlock title="Nakshatra Details">
          <p className="leading-8 text-[#6F5B69]">
            Nakshatra: <b className="text-[#5C3A57]">{result.nakshatra}</b>
            {" "}• Moon Sign:{" "}
            <b className="text-[#5C3A57]">{result.moonSign}</b>
          </p>
        </ResultBlock>
      )}

      <ResultBlock title="Lucky Initials / Sounds">
        <div className="flex flex-wrap gap-2">
          {result.luckyInitials.map((item) => (
            <span
              key={item}
              className="rounded-full bg-[#FFF9F4] px-4 py-2 text-sm text-[#5C3A57]"
            >
              {item}
            </span>
          ))}
        </div>
      </ResultBlock>

      <ResultBlock title="Suggested Names">
        <div className="space-y-4">
          {result.names.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-[#E6C89C]/40 bg-[#FFF9F4] p-5"
            >
              <h4 className="font-display text-3xl text-[#5C3A57]">
                {item.name}
              </h4>
              <p className="mt-2 leading-7 text-[#6F5B69]">
                <b>Meaning:</b> {item.meaning}
              </p>
              <p className="mt-2 leading-7 text-[#6F5B69]">
                <b>Starting Sound:</b> {item.starting_sound}
              </p>
              <p className="mt-2 leading-7 text-[#6F5B69]">
                <b>Vibe:</b> {item.personality_vibe}
              </p>
              <p className="mt-2 text-sm text-[#B784A7]">{item.style}</p>
            </div>
          ))}
        </div>
      </ResultBlock>

      <div className="grid gap-4 md:grid-cols-2">
        <ListCard title="What To Do" items={result.whatToDo} />
        <ListCard title="What To Avoid" items={result.whatToAvoid} />
      </div>

      <ResultBlock title="One Naming Remedy">
        <p className="leading-8 text-[#5C3A57]">{result.remedy}</p>
      </ResultBlock>

      <p className="rounded-2xl bg-[#FFF9F4] p-4 text-sm leading-7 text-[#6F5B69]">
        This is an automated baby naming report based on the details provided.
        For exact Nakshatra, numerology correction, final spelling and family
        name alignment, please book a consultation.
      </p>

      <div className="rounded-[1.5rem] bg-[#5C3A57] p-6 text-center text-white">
        <h3 className="font-display text-2xl">
          Want final baby name correction?
        </h3>
        <p className="mt-3 text-sm leading-7 text-[#F6EEE8]">
          Get final name selection, spelling correction, Nakshatra matching and
          numerology alignment with a personalised baby naming consultation.
        </p>
        <Link
          href="/book?service=baby-name-consultation"
          className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#5C3A57]"
        >
          Book Baby Naming Consultation
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