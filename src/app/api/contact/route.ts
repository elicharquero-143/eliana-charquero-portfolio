import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message: "Supabase storage is intentionally not implemented yet.",
    },
    { status: 501 },
  );
}
