import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message: "Wizard persistence is prepared for a future Supabase integration.",
    },
    { status: 501 },
  );
}
