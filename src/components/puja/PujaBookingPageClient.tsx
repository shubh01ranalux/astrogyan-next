"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

type PujaOption = {
  title: string;
  slug: string;
  cost_with_samagri?: number | null;
  cost_without_samagri?: number | null;
  price?: number | null;
};

export default function PujaBookingPageClient() {
  const supabase = createClient();
  const searchParams = useSearchParams();

  const selectedSlug = searchParams.get("service") || "";

  const [pujas, setPujas] = useState<PujaOption[]>([]);
  const [city, setCity] = useState("Mumbai");
  const [pujaMode, setPujaMode] = useState("Doorstep");
  const [samagriOption, setSamagriOption] = useState("without_samagri");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadPujas() {
      const { data } = await supabase
        .from("puja_services")
        .select("title, slug, cost_with_samagri, cost_without_samagri, price")
        .eq("is_active", true);

      setPujas(data || []);
    }

    loadPujas();
  }, [supabase]);

  const selectedPuja = useMemo(() => {
    return pujas.find((item) => item.slug === selectedSlug);
  }, [pujas, selectedSlug]);

  const selectedPrice = useMemo(() => {
    if (!selectedPuja) return 0;

    if (samagriOption === "with_samagri") {
      return (
        selectedPuja.cost_with_samagri ||
        selectedPuja.price ||
        0
      );
    }

    return (
      selectedPuja.cost_without_samagri ||
      selectedPuja.price ||
      0
    );
  }, [selectedPuja, samagriOption]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (pujaMode === "Doorstep" && !["Mumbai", "Pune"].includes(city)) {
      setLoading(false);
      setErrorMessage("Doorstep Puja is available only in Mumbai and Pune.");
      return;
    }

    const leadPayload = {
      source_type: "puja-booking",
      source_slug: selectedSlug || "puja-booking",
      source_title: selectedPuja?.title || "Puja Booking",
      source_url: selectedSlug
        ? `/book-puja?service=${selectedSlug}`
        : "/book-puja",

      full_name: formData.get("full_name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      date_of_birth: formData.get("date_of_birth") || null,
      gender: formData.get("gender"),

      lead_intent: `Booked ${pujaMode} Puja enquiry`,

      input_data: {
        puja_title: selectedPuja?.title || null,
        puja_slug: selectedSlug || null,
        puja_mode: pujaMode,
        samagri_option: samagriOption,
        estimated_price: selectedPrice,

        preferred_date: formData.get("preferred_date"),
        preferred_time: formData.get("preferred_time"),

        city,
        state: "Maharashtra",
        country: "India",
        address_line_1: formData.get("address_line_1"),
        address_line_2: formData.get("address_line_2"),
        landmark: formData.get("landmark"),
        pincode: formData.get("pincode"),
      },

      notes: formData.get("notes"),
    };

    const { error } = await supabase.from("leads").insert(leadPayload);

    if (error) {
      console.error(error);
      setErrorMessage("Unable to submit Puja booking. Please try again.");
    } else {
      setSuccess(true);
      form.reset();
      setCity("Mumbai");
      setPujaMode("Doorstep");
      setSamagriOption("without_samagri");
    }

    setLoading(false);
  }

  return (
    <section className="px-6 pb-24 sm:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/65 p-6 shadow-sm backdrop-blur-md sm:p-8"
        >
          {selectedPuja && (
            <div className="mb-5 rounded-full border border-[#E6C89C]/50 bg-[#F6EEE8]/80 px-5 py-3 text-sm text-[#5C3A57]">
              Selected Puja:{" "}
              <span className="font-semibold">{selectedPuja.title}</span>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                Full Name
              </span>
              <input name="full_name" className="field w-full" required />
            </label>

            <label>
              <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                Phone Number
              </span>
              <input name="phone" className="field w-full" required />
            </label>

            <label>
              <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                Email Address
              </span>
              <input name="email" type="email" className="field w-full" />
            </label>

            <label>
              <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                Date of Birth
              </span>
              <input name="date_of_birth" type="date" className="field w-full" />
            </label>

            <label>
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

            <label>
              <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                Puja Mode
              </span>
              <select
                value={pujaMode}
                onChange={(e) => setPujaMode(e.target.value)}
                className="field w-full"
              >
                <option>Doorstep</option>
                <option>Online / Remote</option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                Samagri Option
              </span>
              <select
                value={samagriOption}
                onChange={(e) => setSamagriOption(e.target.value)}
                className="field w-full"
              >
                <option value="without_samagri">Without Samagri</option>
                <option value="with_samagri">With Samagri</option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                Preferred Puja Date
              </span>
              <input name="preferred_date" type="date" className="field w-full" />
            </label>

            <label>
              <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                Preferred Puja Time
              </span>
              <input name="preferred_time" type="time" className="field w-full" />
            </label>

            {pujaMode === "Doorstep" && (
              <>
                <label>
                  <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                    City
                  </span>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="field w-full"
                  >
                    <option>Mumbai</option>
                    <option>Pune</option>
                  </select>
                </label>

                <label>
                  <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                    State
                  </span>
                  <input
                    value="Maharashtra"
                    className="field w-full bg-[#F6EEE8]"
                    readOnly
                  />
                </label>

                <label className="sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                    Address Line 1
                  </span>
                  <input name="address_line_1" className="field w-full" />
                </label>

                <label className="sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                    Address Line 2
                  </span>
                  <input name="address_line_2" className="field w-full" />
                </label>

                <label>
                  <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                    Landmark
                  </span>
                  <input name="landmark" className="field w-full" />
                </label>

                <label>
                  <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                    PIN Code
                  </span>
                  <input name="pincode" className="field w-full" />
                </label>
              </>
            )}

            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
                Notes / Sankalp Details
              </span>
              <textarea
                name="notes"
                className="field min-h-32 w-full resize-none rounded-[1.5rem]"
                placeholder="Mention family names, gotra, purpose of puja, or any special requirement..."
              />
            </label>
          </div>

          {errorMessage && (
            <p className="mt-5 rounded-full bg-red-100 px-5 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          {success && (
            <p className="mt-5 rounded-full bg-emerald-100 px-5 py-3 text-sm text-emerald-700">
              Puja booking request submitted successfully.
            </p>
          )}

          <div className="mt-7">
            <Button>
              {loading ? "Submitting..." : "Submit Puja Booking Request"}
            </Button>
          </div>
        </form>

        <aside className="rounded-[2rem] border border-[#E6C89C]/40 bg-[#5C3A57] p-8 text-[#F6EEE8] shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-[#E6C89C]">
            Puja Booking Details
          </p>

          <h2 className="mt-4 font-display text-4xl">
            Doorstep Puja in Mumbai & Pune
          </h2>

          <p className="mt-5 leading-8 text-[#F6EEE8]/75">
            Doorstep Puja is currently available only in Mumbai and Pune,
            Maharashtra. Online/remote Puja can be booked from anywhere.
          </p>

          <div className="mt-8 rounded-[1.5rem] bg-white/10 p-5">
            <p className="text-sm text-[#E6C89C]">Estimated Cost</p>
            <p className="mt-2 text-3xl font-semibold">
              ₹{selectedPrice || 0}
            </p>
            <p className="mt-2 text-sm text-[#F6EEE8]/70">
              Final cost may vary based on Puja requirements and samagri.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}