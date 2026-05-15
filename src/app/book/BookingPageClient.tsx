"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import PlaceSearchInput from "@/components/forms/PlaceSearchInput";

import { createClient } from "@/lib/supabase/client";

import {
  consultationConcerns,
  consultationTimeSlots,
} from "@/data/consultation";

type ServiceOption = {
  title: string;
  slug: string;
};

export default function BookingPageClient() {
  const supabase = createClient();
  const searchParams = useSearchParams();

  const selectedService = searchParams.get("service") || "";

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [preferredDate, setPreferredDate] = useState("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [services, setServices] = useState<ServiceOption[]>([]);

  const today = new Date().toISOString().split("T")[0];

  const selectedServiceTitle = useMemo(() => {
    const found = services.find((item) => item.slug === selectedService);

    if (found?.title) return found.title;

    return selectedService
      ? selectedService
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";
  }, [selectedService, services]);

  function convertSlotToMinutes(slot: string) {
    const [time, period] = slot.split(" ");
    const [hourRaw, minuteRaw] = time.split(":");

    let hour = Number(hourRaw);
    const minute = Number(minuteRaw);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    return hour * 60 + minute;
  }

  const filteredTimeSlots = consultationTimeSlots.filter((slot) => {
    if (bookedSlots.includes(slot)) return false;

    if (preferredDate !== today) return true;

    const now = new Date();
    const minimumAvailableTime = new Date(now);

    minimumAvailableTime.setHours(now.getHours() + 2);

    if (minimumAvailableTime.getMinutes() > 0) {
      minimumAvailableTime.setHours(minimumAvailableTime.getHours() + 1);
      minimumAvailableTime.setMinutes(0);
    }

    minimumAvailableTime.setSeconds(0);
    minimumAvailableTime.setMilliseconds(0);

    const minimumMinutes =
      minimumAvailableTime.getHours() * 60 + minimumAvailableTime.getMinutes();

    return convertSlotToMinutes(slot) >= minimumMinutes;
  });

  useEffect(() => {
    async function loadServices() {
      const { data } = await supabase
        .from("services")
        .select("title, slug")
        .eq("is_active", true);

      setServices(data || []);
    }

    loadServices();
  }, [supabase]);

  useEffect(() => {
    async function loadBookedSlots() {
      if (!preferredDate) {
        setBookedSlots([]);
        return;
      }

      const { data } = await supabase
        .from("bookings")
        .select("preferred_time_slot")
        .eq("preferred_date", preferredDate)
        .eq("status", "Confirmed");

      setBookedSlots(
        (data || [])
          .map((item) => item.preferred_time_slot)
          .filter(Boolean)
      );
    }

    loadBookedSlots();
  }, [preferredDate, supabase]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSuccess(false);
    setErrorMessage("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const preferredTimeSlot = String(
      formData.get("preferred_time_slot") || ""
    );

    if (!preferredDate || !preferredTimeSlot) {
      setLoading(false);
      setErrorMessage("Please select preferred booking date and time.");
      return;
    }

    const { data: existingConfirmed } = await supabase
      .from("bookings")
      .select("id")
      .eq("preferred_date", preferredDate)
      .eq("preferred_time_slot", preferredTimeSlot)
      .eq("status", "Confirmed")
      .maybeSingle();

    if (existingConfirmed) {
      setLoading(false);
      setErrorMessage(
        "This time slot has just been booked. Please choose another slot."
      );
      setBookedSlots((prev) => [...prev, preferredTimeSlot]);
      return;
    }

    const bookingPayload = {
      full_name: formData.get("full_name"),
      phone: formData.get("phone"),
      email: formData.get("email"),

      birth_date: formData.get("birth_date") || null,
      birth_time: formData.get("birth_time") || null,
      birth_place: formData.get("birth_place"),

      birth_latitude: formData.get("birth_latitude")
        ? Number(formData.get("birth_latitude"))
        : null,

      birth_longitude: formData.get("birth_longitude")
        ? Number(formData.get("birth_longitude"))
        : null,

      birth_timezone: formData.get("birth_timezone")
        ? Number(formData.get("birth_timezone"))
        : 5.5,

      gender: formData.get("gender"),
      concern: selectedService ? null : formData.get("concern"),

      preferred_date: formData.get("preferred_date") || null,
      preferred_time_slot: preferredTimeSlot,

      message: formData.get("message"),

      selected_service: selectedService || null,
      service_title: selectedServiceTitle || null,
      status: "Pending",
    };

    const { error } = await supabase.from("bookings").insert(bookingPayload);

if (!error) {
  await supabase.from("leads").insert({
    source_type: "booking",
    source_slug: selectedService || "general-booking",
    source_title: selectedServiceTitle || "General Consultation",
    source_url: selectedService
      ? `/book?service=${selectedService}`
      : "/book",

    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    date_of_birth: formData.get("birth_date") || null,
    gender: formData.get("gender"),

    lead_intent: selectedService
      ? `Booked consultation for ${selectedServiceTitle}`
      : "Submitted general booking",

    input_data: {
      birth_time: formData.get("birth_time"),
      birth_place: formData.get("birth_place"),
      birth_latitude: formData.get("birth_latitude"),
      birth_longitude: formData.get("birth_longitude"),
      birth_timezone: formData.get("birth_timezone"),
      preferred_date: formData.get("preferred_date"),
      preferred_time_slot: preferredTimeSlot,
      concern: selectedService ? null : formData.get("concern"),
      selected_service: selectedService || null,
      service_title: selectedServiceTitle || null,
    },

    notes: formData.get("message"),
  });
}

    if (!error) {
      await fetch("/api/send-booking-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      setSuccess(true);
      form.reset();
      setPreferredDate("");
      setBookedSlots([]);
    } else {
      console.error(error);
      setErrorMessage("Unable to submit booking. Please try again.");
    }

    setLoading(false);
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
            {selectedService && (
              <div className="mb-5 rounded-full border border-[#E6C89C]/50 bg-[#F6EEE8]/80 px-5 py-3 text-sm text-[#5C3A57]">
                Selected Service:{" "}
                <span className="font-semibold">{selectedServiceTitle}</span>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">

  <label className="block">
    <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
      Full Name
    </span>

    <input
      name="full_name"
      className="field w-full"
      placeholder="Enter your full name"
      required
    />
  </label>

  <label className="block">
    <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
      Phone Number
    </span>

    <input
      name="phone"
      className="field w-full"
      placeholder="Enter phone number"
      required
    />
  </label>

  <label className="block">
    <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
      Email Address
    </span>

    <input
      name="email"
      className="field w-full"
      type="email"
      placeholder="Enter email address"
      required
    />
  </label>

  <label className="block">
    <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
      Date of Birth
    </span>

    <input
      name="birth_date"
      className="field w-full"
      type="date"
    />
  </label>

  <label className="block">
    <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
      Birth Time
    </span>

    <input
      name="birth_time"
      className="field w-full"
      type="time"
    />
  </label>

  <div className="sm:col-span-2">
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
        Birth Place / City
      </span>

      <PlaceSearchInput />
    </label>
  </div>

  <label className="block">
    <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
      Gender
    </span>

    <select name="gender" className="field w-full">
      <option value="">Select gender</option>
      <option>Female</option>
      <option>Male</option>
      <option>Other</option>
    </select>
  </label>

  {!selectedService && (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
        Main Concern
      </span>

      <select name="concern" className="field w-full">
        <option value="">Select concern</option>

        {consultationConcerns.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </label>
  )}

  <label className="block">
    <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
      Preferred Booking Date
    </span>

    <input
      name="preferred_date"
      className="field w-full"
      type="date"
      min={today}
      value={preferredDate}
      onChange={(e) => setPreferredDate(e.target.value)}
      required
    />
  </label>

  <label className="block">
    <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
      Preferred Booking Time
    </span>

    <select
      name="preferred_time_slot"
      className="field w-full"
      required
    >
      <option value="">Select preferred time</option>

      {filteredTimeSlots.map((slot) => (
        <option key={slot}>{slot}</option>
      ))}
    </select>
  </label>

  <div className="sm:col-span-2">
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
        Describe Your Question / Concern
      </span>

      <textarea
        name="message"
        className="field min-h-36 w-full resize-none rounded-[1.5rem]"
        placeholder="Write your concern in detail..."
      />
    </label>
  </div>
</div>

            {preferredDate && filteredTimeSlots.length === 0 && (
              <p className="mt-5 rounded-full bg-red-100 px-5 py-3 text-sm text-red-700">
                No available slots for this date. Please select another date.
              </p>
            )}


            {success && (
              <p className="mt-5 rounded-full bg-[#7FB8B4]/25 px-5 py-3 text-sm text-[#315C58]">
                Booking request submitted successfully.
              </p>
            )}

            {errorMessage && (
              <p className="mt-5 rounded-full bg-red-100 px-5 py-3 text-sm text-red-700">
                {errorMessage}
              </p>
            )}

            <div className="mt-7">
              <Button>
                {loading ? "Submitting..." : "Submit Booking Request"}
              </Button>
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
              <p>✓ Accurate place search with coordinates</p>
              <p>✓ Personalized birth-chart based guidance</p>
              <p>✓ Clear remedies and practical suggestions</p>
              <p>✓ Booking appears inside admin console</p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}