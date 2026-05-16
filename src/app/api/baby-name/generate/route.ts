import { NextResponse } from "next/server";
import {
  generateBabyNameByNakshatra,
  generateBabyNameByParentNumerology,
} from "@/lib/calculators/astrology/baby-name-generator";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data =
      body.mode === "nakshatra"
        ? await generateBabyNameByNakshatra({
            babyGender: body.babyGender,
            preferredStyle: body.preferredStyle,
            kundaliData: body.kundaliData,
          })
        : await generateBabyNameByParentNumerology({
            motherName: body.motherName,
            motherDob: body.motherDob,
            fatherName: body.fatherName,
            fatherDob: body.fatherDob,
            babyGender: body.babyGender,
            preferredStyle: body.preferredStyle,
          });

    return NextResponse.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error("Baby name API error:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to generate baby names.",
      },
      { status: 500 }
    );
  }
}