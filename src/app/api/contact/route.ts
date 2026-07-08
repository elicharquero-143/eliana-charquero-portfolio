import { NextResponse } from "next/server";
import { z } from "zod";
import {
  emailLayout,
  isEmailConfigured,
  sendPortfolioEmail,
  textFromRows,
} from "@/lib/email";

const contactSchema = z.object({
  email: z.string().email(),
  message: z.string().min(1),
  name: z.string().min(1),
});

export async function POST(request: Request) {
  if (!isEmailConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message: "El envío de emails todavía no está configurado.",
      },
      { status: 503 },
    );
  }

  const payload = await request.json().catch(() => null);
  const result = contactSchema.safeParse(payload);

  if (!result.success) {
    return NextResponse.json(
      { ok: false, message: "Revisá los datos del formulario." },
      { status: 400 },
    );
  }

  const rows: Array<[string, string]> = [
    ["Nombre", result.data.name],
    ["Email", result.data.email],
    ["Mensaje", result.data.message],
  ];
  const title = "Nuevo mensaje desde el portfolio";

  try {
    await sendPortfolioEmail({
      html: emailLayout(title, rows),
      replyTo: result.data.email,
      subject: `Nuevo mensaje de ${result.data.name}`,
      text: textFromRows(title, rows),
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "No se pudo enviar el email." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
