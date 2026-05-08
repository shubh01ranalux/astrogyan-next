import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import {
  consultationConcerns,
  consultationTimeSlots,
} from "@/data/consultation";

export default function BookPage() {
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
          <form className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/60 p-6 shadow-sm backdrop-blur-md sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <input className="field" placeholder="Full Name" />
              <input className="field" placeholder="Phone Number" />
              <input className="field" placeholder="Email Address" />
              <input className="field" type="date" />

              <input className="field" type="time" />
              <input className="field" placeholder="Place of Birth" />

              <select className="field">
                <option>Gender</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>

              <select className="field">
                <option>Main Concern</option>
                {consultationConcerns.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <input className="field" type="date" />

              <select className="field">
                <option>Preferred Time Slot</option>
                {consultationTimeSlots.map((slot) => (
                  <option key={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <textarea
              className="field mt-5 min-h-36 w-full resize-none"
              placeholder="Write your question or concern..."
            />

            <div className="mt-7">
              <Button>Submit Booking Request</Button>
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
              <p>✓ Booking will later appear in admin console</p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}