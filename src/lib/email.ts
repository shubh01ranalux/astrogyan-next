import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type BookingEmailPayload = {
  full_name?: string | null;
  phone?: string | null;
  email?: string | null;
  birth_date?: string | null;
  birth_time?: string | null;
  birth_place?: string | null;
  gender?: string | null;
  concern?: string | null;
  preferred_date?: string | null;
  preferred_time_slot?: string | null;
  message?: string | null;
  selected_service?: string | null;
  service_title?: string | null;
};

export async function sendBookingNotification(data: BookingEmailPayload) {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_NOTIFICATION_EMAIL) {
    console.warn("Booking email skipped: missing Resend env variables.");
    return;
  }

  await resend.emails.send({
    from:
      process.env.RESEND_FROM_EMAIL ||
      "Astrogyan <onboarding@resend.dev>",
    to: process.env.ADMIN_NOTIFICATION_EMAIL,
    subject: `New Astrogyan Booking - ${data.full_name || "Website Lead"}`,
    html: `
      <h2>New Booking Received</h2>

      <p><strong>Name:</strong> ${data.full_name || "N/A"}</p>
      <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
      <p><strong>Email:</strong> ${data.email || "N/A"}</p>

      <hr />

      <p><strong>Service:</strong> ${
        data.service_title || data.selected_service || "General Consultation"
      }</p>
      <p><strong>Concern:</strong> ${data.concern || "N/A"}</p>

      <hr />

      <p><strong>Preferred Date:</strong> ${
        data.preferred_date || "N/A"
      }</p>
      <p><strong>Preferred Time:</strong> ${
        data.preferred_time_slot || "N/A"
      }</p>

      <hr />

      <p><strong>Birth Date:</strong> ${data.birth_date || "N/A"}</p>
      <p><strong>Birth Time:</strong> ${data.birth_time || "N/A"}</p>
      <p><strong>Birth Place:</strong> ${data.birth_place || "N/A"}</p>
      <p><strong>Gender:</strong> ${data.gender || "N/A"}</p>

      <hr />

      <p><strong>Message:</strong></p>
      <p>${data.message || "N/A"}</p>
    `,
  });
}