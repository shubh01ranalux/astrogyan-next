"use client";

import { useTransition } from "react";
import { createClient } from "@/lib/supabase/client";

type BookingStatusSelectProps = {
  bookingId: string;
  currentStatus: string;
  customerEmail?: string | null;
  customerName?: string | null;
  serviceTitle?: string | null;
  preferredDate?: string | null;
  preferredTimeSlot?: string | null;
};

export default function BookingStatusSelect({
  bookingId,
  currentStatus,
  customerEmail,
  customerName,
  serviceTitle,
  preferredDate,
  preferredTimeSlot,
}: BookingStatusSelectProps) {
  const supabase = createClient();
  const [isPending, startTransition] = useTransition();

  async function updateStatus(status: string) {
    const { error } = await supabase
      .from("bookings")
      .update({
        status,
      })
      .eq("id", bookingId);

    if (!error && status === "Confirmed" && customerEmail) {
      await fetch("/api/send-confirmation-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerEmail,
          customerName,
          serviceTitle,
          preferredDate,
          preferredTimeSlot,
        }),
      });
    }

    window.location.reload();
  }

  return (
    <select
      defaultValue={currentStatus}
      disabled={isPending}
      onChange={(e) => {
        const value = e.target.value;

        startTransition(async () => {
          await updateStatus(value);
        });
      }}
      className="rounded-full border border-[#E6C89C]/50 bg-white px-4 py-2 text-sm text-[#5C3A57]"
    >
      <option value="Pending">Pending</option>
      <option value="Confirmed">Confirmed</option>
      <option value="Completed">Completed</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  );
}