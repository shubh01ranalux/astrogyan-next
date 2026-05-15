"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { calculatorMeta } from "@/lib/calculators/meta";
import {
  calculateDestinyNumber,
  calculateFlames,
  calculateLoveScore,
  calculateNameNumber,
  calculatePersonalYearNumber,
  calculateVehicleNumber,
  getFavorableAlphabet,
  getLuckyColor,
  getLuckyDates,
  getNumberMeaning,
  getPersonalityPrediction,
  getUnluckyColor,
  getUnluckyDates,
  calculateLoShuGrid,
} from "@/lib/calculators/basic";

type CalculatorType =
  | "flames"
  | "love"
  | "name-numerology"
  | "destiny-number"
  | "personal-year"
  | "lucky-color"
  | "unlucky-color"
  | "lucky-dates"
  | "unlucky-dates"
  | "vehicle-number"
  | "favorable-alphabet"
  | "predictive-personality"
  | "lo-shu-grid";

export default function BasicCalculatorClient({
  type,
}: {
  type: CalculatorType;
}) {
  const supabase = createClient();
  const meta = calculatorMeta[type];

  const [result, setResult] = useState("");
  const [saving, setSaving] = useState(false);

  const needsTwoNames = type === "flames" || type === "love";

  const needsName =
    type === "name-numerology" || type === "predictive-personality";

  const needsVehicle = type === "vehicle-number";

  async function handleSubmit(formData: FormData) {
    setSaving(true);

    const fullName = String(formData.get("full_name") || "");
    const phone = String(formData.get("phone") || "");
    const email = String(formData.get("email") || "");
    const dateOfBirth = String(formData.get("date_of_birth") || "");
    const gender = String(formData.get("gender") || "");

    const name = String(formData.get("name") || fullName);
    const name1 = String(formData.get("name1") || "");
    const name2 = String(formData.get("name2") || "");
    const date =  dateOfBirth;
    const vehicle = String(formData.get("vehicle") || "");

    let finalResult = "";

    if (type === "flames") {
      finalResult = `Relationship Result: ${calculateFlames(name1, name2)}`;
    }

    if (type === "love") {
      finalResult = `Love Score: ${calculateLoveScore(name1, name2)}%`;
    }

    if (type === "name-numerology") {
      const number = calculateNameNumber(name);
      finalResult = `Name Number: ${number} — ${getNumberMeaning(number)}`;
    }

    if (type === "destiny-number") {
      const number = calculateDestinyNumber(date);
      finalResult = `Destiny Number: ${number} — ${getNumberMeaning(number)}`;
    }

    if (type === "personal-year") {
      const number = calculatePersonalYearNumber(date);
      finalResult = `Personal Year Number: ${number} — ${getNumberMeaning(
        number
      )}`;
    }

    if (type === "lucky-color") {
      const number = calculateDestinyNumber(date);
      finalResult = `Lucky Colors: ${getLuckyColor(number)}`;
    }

    if (type === "unlucky-color") {
      const number = calculateDestinyNumber(date);
      finalResult = `Unlucky Colors: ${getUnluckyColor(number)}`;
    }

    if (type === "lucky-dates") {
      const number = calculateDestinyNumber(date);
      finalResult = `Lucky Dates: ${getLuckyDates(number)}`;
    }

    if (type === "unlucky-dates") {
      const number = calculateDestinyNumber(date);
      finalResult = `Unlucky Dates: ${getUnluckyDates(number)}`;
    }

    if (type === "vehicle-number") {
      const number = calculateVehicleNumber(vehicle);
      finalResult = `Vehicle Number Total: ${number} — ${getNumberMeaning(
        number
      )}`;
    }

    if (type === "favorable-alphabet") {
      const number = calculateDestinyNumber(date);
      finalResult = `Favorable Alphabets: ${getFavorableAlphabet(
        number
      )} | Favorable Numbers: ${getLuckyDates(number)}`;
    }

    if (type === "predictive-personality") {
      finalResult = getPersonalityPrediction(name, date);
    }

    if (type === "lo-shu-grid") {
      const grid = calculateLoShuGrid(date);

      finalResult = `Lo Shu Grid Counts: 1:${grid["1"]}, 2:${grid["2"]}, 3:${grid["3"]}, 4:${grid["4"]}, 5:${grid["5"]}, 6:${grid["6"]}, 7:${grid["7"]}, 8:${grid["8"]}, 9:${grid["9"]}`;
    }

    setResult(finalResult);

    await supabase.from("leads").insert({
      source_type: "calculator",
      source_slug: type,
      source_title: meta?.title || type,
      source_url: `/free-tools/${type}`,
      full_name: fullName,
      phone,
      email,
      date_of_birth: dateOfBirth || null,
      gender,
      lead_intent: "Used calculator",
      input_data: {
        calculator_type: type,
        name,
        name1,
        name2,
        date,
        vehicle,
      },
      result_data: {
        result: finalResult,
      },
    });

    setSaving(false);
  }

  return (
    <section className="px-6 pb-24 sm:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/65 p-6 shadow-sm backdrop-blur-md sm:p-8">
          <h2 className="font-display text-3xl text-[#5C3A57]">
            {meta?.title || "Free Calculator"}
          </h2>

          <p className="mt-4 leading-8 text-[#6F5B69]">
            {meta?.meaning}
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
              How it is calculated
            </p>

            <p className="mt-3 leading-7 text-[#5C3A57]">
              {meta?.method}
            </p>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/70 p-5">
            <p className="text-sm font-semibold text-[#5C3A57]">
              Note
            </p>

            <p className="mt-2 text-sm leading-7 text-[#6F5B69]">
              These calculators use fixed traditional numerology or
              relationship-calculation logic. For deeper personalised guidance,
              use Kundali-based analysis or book a consultation.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/65 p-6 shadow-sm backdrop-blur-md sm:p-8">
          <form action={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="full_name"
                className="field w-full"
                placeholder="Full Name"
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

              <label className="block">
  <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
    Date of Birth
  </span>
  <input
    name="date_of_birth"
    type="date"
    className="field w-full"
    required
  />
</label>

              <select name="gender" className="field w-full" required>
                <option value="">Gender</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>

            {needsTwoNames && (
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="name1"
                  className="field w-full"
                  placeholder="Your Name"
                  required
                />

                <input
                  name="name2"
                  className="field w-full"
                  placeholder="Partner Name"
                  required
                />
              </div>
            )}

            {needsName && (
              <input
                name="name"
                className="field w-full"
                placeholder="Enter Full Name for Calculation"
                required
              />
            )}

            {needsVehicle && (
              <input
                name="vehicle"
                className="field w-full"
                placeholder="Enter Vehicle Number, e.g. MH12AB1234"
                required
              />
            )}

            <Button>{saving ? "Calculating..." : "Calculate"}</Button>
          </form>

          {result && (
            <div className="mt-8 rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-6 text-center">
              <p className="font-display text-3xl leading-tight text-[#5C3A57]">
                {result}
              </p>

              <Link
                href="/book"
                className="mt-6 inline-flex rounded-full bg-[#5C3A57] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#B784A7]"
              >
                Book Personal Consultation
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}