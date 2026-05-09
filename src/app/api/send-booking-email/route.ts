import { NextResponse } from "next/server";
import { sendBookingNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await sendBookingNotification(data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Booking email error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to send booking email.",
      },
      { status: 500 }
    );
  }
}