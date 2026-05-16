import { NextResponse } from "next/server";
import { generateKundaliInsights } from "@/lib/kundali-ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await generateKundaliInsights(body);

    return NextResponse.json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.error("AI Kundali route error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to generate AI insights",
      },
      { status: 500 }
    );
  }
}