"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type LeadCaptureFormProps = {
  sourceType: string;
  sourceSlug: string;
  sourceTitle: string;
  sourceUrl: string;
  leadIntent?: string;
};

export default function LeadCaptureForm({
  sourceType,
  sourceSlug,
  sourceTitle,
  sourceUrl,
  leadIntent = "Interested lead",
}: LeadCaptureFormProps) {
  const supabase = createClient();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setSuccess(false);

    await supabase.from("leads").insert({
      source_type: sourceType,
      source_slug: sourceSlug,
      source_title: sourceTitle,
      source_url: sourceUrl,

      full_name: formData.get("full_name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      date_of_birth: formData.get("date_of_birth") || null,
      gender: formData.get("gender"),

      lead_intent: leadIntent,
      notes: formData.get("notes"),

      input_data: {
        preferred_contact_time: formData.get("preferred_contact_time"),
      },
    });

    setSuccess(true);
    setLoading(false);
  }

  return (
    <form
      action={handleSubmit}
      className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/70 p-6 shadow-sm backdrop-blur-md"
    >
      <h3 className="font-display text-3xl text-[#5C3A57]">
        Interested in this Puja?
      </h3>

      <p className="mt-2 text-sm leading-7 text-[#6F5B69]">
        Share your details and Astrogyan will contact you with guidance,
        pricing and availability.
      </p>

      <div className="mt-6 grid gap-4">
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
          <input name="date_of_birth" type="date" className="field w-full" />
        </label>

        <select name="gender" className="field w-full">
          <option value="">Gender</option>
          <option>Female</option>
          <option>Male</option>
          <option>Other</option>
        </select>

        <input
          name="preferred_contact_time"
          className="field w-full"
          placeholder="Preferred Contact Time"
        />

        <textarea
          name="notes"
          className="field min-h-28 w-full resize-none rounded-[1.5rem]"
          placeholder="Any question or specific requirement?"
        />

        <button
          type="submit"
          className="rounded-full bg-[#5C3A57] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#B784A7]"
        >
          {loading ? "Submitting..." : "Request Puja Details"}
        </button>

        {success && (
          <p className="rounded-full bg-emerald-100 px-4 py-3 text-sm text-emerald-700">
            Details submitted successfully. Astrogyan will contact you soon.
          </p>
        )}
      </div>
    </form>
  );
}