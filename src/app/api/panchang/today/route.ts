import { NextResponse } from "next/server";
import { getTodayPanchang } from "@/lib/panchang";

export async function GET() {
  const data = await getTodayPanchang();

  return NextResponse.json({
    ok: true,
    data,
  });
}