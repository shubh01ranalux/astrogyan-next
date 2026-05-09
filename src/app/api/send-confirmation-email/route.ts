import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Confirmation email payload:", body);

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json(
        { ok: false, error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    if (!body.customerEmail) {
      console.error("Missing customer email");
      return NextResponse.json(
        { ok: false, error: "Missing customer email" },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: body.customerEmail,
      subject: "Your Astrogyan Consultation is Confirmed",
      html: `
        <div style="font-family: sans-serif; line-height: 1.7;">
          <h2>Namaste ${body.customerName || "there"},</h2>

          <p>Your consultation booking with Astrogyan has been confirmed.</p>

          <div style="margin-top:20px;padding:20px;border-radius:12px;background:#f7f3ef;">
            <p><strong>Service:</strong> ${body.serviceTitle || "General Consultation"}</p>
            <p><strong>Date:</strong> ${body.preferredDate || "N/A"}</p>
            <p><strong>Time:</strong> ${body.preferredTimeSlot || "N/A"}</p>
          </div>

          <p style="margin-top:20px;">
            Please be available 5-10 minutes before your consultation time.
          </p>

          <p>Thank you for choosing Astrogyan.</p>

          <br />

          <p>Regards,<br />Astrogyan</p>
        </div>
      `,
    });

    console.log("Resend confirmation result:", result);

    if (result.error) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error("Confirmation email route error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to send confirmation email.",
      },
      { status: 500 }
    );
  }
}