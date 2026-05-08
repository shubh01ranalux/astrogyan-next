"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type BookingStatusSelectProps = {
  bookingId: string;
  currentStatus: string;
};

const statuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

export default function BookingStatusSelect({
  bookingId,
  currentStatus,
}: BookingStatusSelectProps) {
  const supabase = createClient();
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);

  async function updateStatus(value: string) {
    setStatus(value);
    setSaving(true);

    await supabase
      .from("bookings")
      .update({ status: value })
      .eq("id", bookingId);

    setSaving(false);
  }

  return (
    <select
      value={status}
      onChange={(e) => updateStatus(e.target.value)}
      className="rounded-full border border-[#E6C89C]/50 bg-white/70 px-4 py-2 text-sm text-[#5C3A57] outline-none"
    >
      {statuses.map((item) => (
        <option key={item}>{item}</option>
      ))}
    </select>
  );
}