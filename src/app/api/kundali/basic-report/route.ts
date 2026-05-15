import { NextResponse } from "next/server";
import { generateBasicKundali } from "@/lib/kundali";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.name ||
      !body.birthDate ||
      !body.birthTime ||
      !body.birthPlace ||
      !body.latitude ||
      !body.longitude
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing required birth details.",
        },
        { status: 400 }
      );
    }

    const kundali = await generateBasicKundali({
      name: body.name,
      birthDate: body.birthDate,
      birthTime: body.birthTime,
      birthPlace: body.birthPlace,
      latitude: Number(body.latitude),
      longitude: Number(body.longitude),
      timezone: Number(body.timezone || 5.5),
    });

    return NextResponse.json({
      ok: true,
      input: body,
      data: kundali,
    });
  } catch (error) {
    console.error("Kundali report error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to generate Kundali report.",
      },
      { status: 500 }
    );
  }
}