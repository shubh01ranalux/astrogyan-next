"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import {
  consultationConcerns,
  consultationTimeSlots,
} from "@/data/consultation";

export default function BookPage() {
  const supabase = createClient();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preferredDate, setPreferredDate] = useState("");

const today = new Date().toISOString().split("T")[0];

function convertSlotToHour(slot: string) {
  const [time, period] = slot.split(" ");
  let hour = Number(time.split(":")[0]);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  return hour;
}

const filteredTimeSlots = consultationTimeSlots.filter((slot) => {
  if (preferredDate !== today) return true;

  const now = new Date();
  const currentHour = now.getHours();
  const slotHour = convertSlotToHour(slot);

  return slotHour > currentHour;
});

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);

  const form = e.currentTarget;
  const formData = new FormData(form);

    const { error } = await supabase.from("bookings").insert({
      full_name: formData.get("full_name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      birth_date: formData.get("birth_date") || null,
      birth_time: formData.get("birth_time"),
      birth_place: formData.get("birth_place"),
      gender: formData.get("gender"),
      concern: formData.get("concern"),
      preferred_date: formData.get("preferred_date") || null,
      preferred_time_slot: formData.get("preferred_time_slot"),
      message: formData.get("message"),
    });

    setLoading(false);

    if (!error) {
      setSuccess(true);
      form.reset();
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Book Consultation"
        title="Start with your birth details"
        description="Share your details and concern. Astrogyan will use this information to prepare personalized Vedic guidance for your consultation."
      />

      <section className="px-6 pb-24 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/60 p-6 shadow-sm backdrop-blur-md sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <input name="full_name" className="field" placeholder="Full Name" required />
              <input name="phone" className="field" placeholder="Phone Number" required />
              <input name="email" className="field" type="email" placeholder="Email Address" required />
              <input name="birth_date" className="field" type="date" />
              <input name="birth_time" className="field" type="time" />
              <input name="birth_place" className="field" placeholder="Place of Birth" />

              <select name="gender" className="field">
                <option value="">Gender</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>

              <select name="concern" className="field">
                <option value="">Main Concern</option>
                {consultationConcerns.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <input
  name="preferred_date"
  className="field"
  type="date"
  min={today}
  value={preferredDate}
  onChange={(e) => setPreferredDate(e.target.value)}
/>

              <select name="preferred_time_slot" className="field">
  <option value="">Preferred Time Slot</option>
  {filteredTimeSlots.map((slot) => (
    <option key={slot}>{slot}</option>
  ))}
</select>
            </div>

            <textarea
              name="message"
              className="field mt-5 min-h-36 w-full resize-none rounded-[1.5rem]"
              placeholder="Write your question or concern..."
            />

            {success && (
              <p className="mt-5 rounded-full bg-[#7FB8B4]/25 px-5 py-3 text-sm text-[#315C58]">
                Booking request submitted successfully.
              </p>
            )}

            <div className="mt-7">
              <Button>{loading ? "Submitting..." : "Submit Booking Request"}</Button>
            </div>
          </form>

          <aside className="rounded-[2rem] border border-[#E6C89C]/40 bg-[#5C3A57] p-8 text-[#F6EEE8] shadow-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-[#E6C89C]">
              Consultation Window
            </p>

            <h2 className="mt-4 font-display text-4xl">
              Available from 8 AM to 11 PM IST
            </h2>

            <p className="mt-5 leading-8 text-[#F6EEE8]/75">
              After submitting your request, the admin will review your details,
              confirm availability, and share payment or WhatsApp confirmation.
            </p>

            <div className="mt-8 space-y-4 border-t border-[#E6C89C]/30 pt-6">
              <p>✓ Personalized birth-chart based guidance</p>
              <p>✓ Clear remedies and practical suggestions</p>
              <p>✓ Future-ready for payment integration</p>
              <p>✓ Booking appears inside admin console</p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}