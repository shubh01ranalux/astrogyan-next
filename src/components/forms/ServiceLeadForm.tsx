"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  service: {
    slug: string;
    title: string;
  };
};

export default function ServiceLeadForm({ service }: Props) {
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setSuccess(false);

    await supabase.from("leads").insert({
      source_type: "service",
      source_slug: service.slug,
      source_title: service.title,
      source_url: "/services",

      full_name: formData.get("full_name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      date_of_birth: formData.get("date_of_birth") || null,
      gender: formData.get("gender"),

      lead_intent: `Interested in ${service.title}`,

      input_data: {
        booking_date: formData.get("booking_date"),
        booking_time: formData.get("booking_time"),
        concern: formData.get("concern"),
      },
    });

    setLoading(false);
    setSuccess(true);
  }

  return (
    <form
      action={handleSubmit}
      className="mt-6 rounded-[1.5rem] border border-[#E6C89C]/40 bg-[#FFF9F4] p-5"
    >
      <h3 className="font-display text-2xl text-[#5C3A57]">
        Request Consultation
      </h3>

      <div className="mt-5 grid gap-4">
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
        />

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
            Date of Birth
          </span>

          <input
            name="date_of_birth"
            type="date"
            className="field w-full"
          />
        </label>

        <select name="gender" className="field w-full">
          <option value="">Gender</option>
          <option>Female</option>
          <option>Male</option>
          <option>Other</option>
        </select>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
              Preferred Booking Date
            </span>

            <input
              name="booking_date"
              type="date"
              className="field w-full"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
              Preferred Booking Time
            </span>

            <input
              name="booking_time"
              type="time"
              className="field w-full"
            />
          </label>
        </div>

        <textarea
          name="concern"
          className="field min-h-28 w-full resize-none rounded-[1.5rem]"
          placeholder="Describe your concern or question..."
        />

        <button
          type="submit"
          className="rounded-full bg-[#5C3A57] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#B784A7]"
        >
          {loading ? "Submitting..." : "Request Consultation"}
        </button>

        {success && (
          <p className="rounded-full bg-emerald-100 px-4 py-3 text-sm text-emerald-700">
            Request submitted successfully. Astrogyan will contact you soon.
          </p>
        )}
      </div>
    </form>
  );
}