import BookingStatusSelect from "@/components/admin/BookingStatusSelect";
import AdminLayout from "@/components/admin/AdminLayout";
import { getBookings } from "@/lib/bookings";

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  return (
    <AdminLayout
      title="Bookings"
      description="View consultation requests submitted from the Astrogyan website."
    >
      <div className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/65 p-6 shadow-sm backdrop-blur-md">
        <h2 className="font-display text-3xl text-[#5C3A57]">
          Consultation Requests
        </h2>

        <div className="mt-6 space-y-4">
          {bookings.length === 0 && (
            <p className="text-[#6F5B69]">No booking requests yet.</p>
          )}

          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-[1.25rem] border border-[#E6C89C]/35 bg-[#F6EEE8]/70 p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-2xl text-[#5C3A57]">
                      {booking.full_name}
                    </h3>

                    <BookingStatusSelect
  bookingId={booking.id}
  currentStatus={booking.status}
/>
                  </div>

                  <p className="mt-2 text-sm text-[#B784A7]">
                    {booking.email} · {booking.phone}
                  </p>

                  <p className="mt-3 leading-7 text-[#6F5B69]">
                    Concern: {booking.concern || "Not specified"}
                  </p>

                  <p className="mt-2 text-sm text-[#5C3A57]">
                    DOB: {booking.birth_date || "N/A"} · Birth Time:{" "}
                    {booking.birth_time || "N/A"} · Place:{" "}
                    {booking.birth_place || "N/A"}
                  </p>

                  <p className="mt-2 text-sm text-[#5C3A57]">
                    Preferred: {booking.preferred_date || "N/A"} at{" "}
                    {booking.preferred_time_slot || "N/A"}
                  </p>

                  {booking.message && (
                    <p className="mt-4 rounded-[1rem] bg-white/60 p-4 leading-7 text-[#6F5B69]">
                      {booking.message}
                    </p>
                  )}
                </div>

                <a
                  href={`https://wa.me/${booking.phone}`}
                  target="_blank"
                  className="rounded-full bg-[#5C3A57] px-5 py-3 text-center text-sm text-[#F6EEE8]"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}