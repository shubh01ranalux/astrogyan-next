import BookingStatusSelect from "@/components/admin/BookingStatusSelect";
import AdminLayout from "@/components/admin/AdminLayout";
import { getBookings } from "@/lib/bookings";

function cleanPhoneNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10) {
    return `91${digits}`;
  }

  if (digits.startsWith("0") && digits.length === 11) {
    return `91${digits.slice(1)}`;
  }

  return digits;
}

function createWhatsAppMessage(booking: Awaited<ReturnType<typeof getBookings>>[number]) {
  return `Namaste ${booking.full_name},

Your Astrogyan booking request has been received.

Booking Details:
Service: ${booking.service_title || booking.selected_service || "General Consultation"}
Date: ${booking.preferred_date || "N/A"}
Time: ${booking.preferred_time_slot || "N/A"}
Status: ${booking.status}

Birth Details:
DOB: ${booking.birth_date || "N/A"}
Birth Time: ${booking.birth_time || "N/A"}
Birth Place: ${booking.birth_place || "N/A"}

We will confirm your consultation shortly.

- Astrogyan`;
}

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

          {bookings.map((booking) => {
            const whatsappNumber = cleanPhoneNumber(booking.phone || "");
            const whatsappText = encodeURIComponent(
              createWhatsAppMessage(booking)
            );

            return (
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
  customerEmail={booking.email}
  customerName={booking.full_name}
  serviceTitle={
    booking.service_title ||
    booking.selected_service ||
    "General Consultation"
  }
  preferredDate={booking.preferred_date}
  preferredTimeSlot={booking.preferred_time_slot}
/>
                    </div>

                    <p className="mt-2 text-sm text-[#B784A7]">
                      {booking.email} · {booking.phone}
                    </p>

                    <p className="mt-3 text-sm font-semibold text-[#5C3A57]">
                      Service:{" "}
                      {booking.service_title ||
                        booking.selected_service ||
                        "General Consultation"}
                    </p>

                    {!booking.selected_service && (
                      <p className="mt-3 leading-7 text-[#6F5B69]">
                        Concern: {booking.concern || "Not specified"}
                      </p>
                    )}

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

                  <div className="flex flex-col gap-3">
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                      target="_blank"
                      className="rounded-full bg-[#25D366] px-5 py-3 text-center text-sm font-medium text-white"
                    >
                      WhatsApp
                    </a>

                    <a
                      href={`mailto:${booking.email}`}
                      className="rounded-full border border-[#5C3A57]/20 px-5 py-3 text-center text-sm font-medium text-[#5C3A57]"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}