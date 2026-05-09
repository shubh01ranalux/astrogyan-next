import { createClient } from "@/lib/supabase/server";

export type Booking = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  birth_date: string | null;
  birth_time: string | null;
  birth_place: string | null;
  gender: string | null;
  concern: string | null;
  preferred_date: string | null;
  preferred_time_slot: string | null;
  message: string | null;
  status: string;
  selected_service: string | null;
  service_title: string | null;
  created_at: string;
};

export async function getBookings(): Promise<Booking[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}