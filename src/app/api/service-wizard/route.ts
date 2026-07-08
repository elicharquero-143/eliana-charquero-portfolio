import { NextResponse } from "next/server";
import { z } from "zod";
import {
  emailLayout,
  isEmailConfigured,
  sendPortfolioEmail,
  textFromRows,
} from "@/lib/email";

const answerSchema = z.object({
  answer: z.string(),
  question: z.string(),
});

const serviceRequestSchema = z.object({
  answers: z.array(answerSchema),
  budget: z.string().optional(),
  email: z.string().email(),
  message: z.string().optional(),
  name: z.string().min(1),
  recommendedService: z.string().optional(),
  selectedService: z.string().min(1),
  timeline: z.string().optional(),
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
  const result = serviceRequestSchema.safeParse(payload);

  if (!result.success) {
    return NextResponse.json(
      { ok: false, message: "Revisá los datos del formulario." },
      { status: 400 },
    );
  }

  const answersText = result.data.answers
    .map(({ question, answer }) => `${question}: ${answer}`)
    .join("\n");
  const rows: Array<[string, string]> = [
    ["Nombre", result.data.name],
    ["Email", result.data.email],
    ["Servicio solicitado", result.data.selectedService],
    ["Servicio recomendado", result.data.recommendedService ?? ""],
    ["Presupuesto", result.data.budget ?? ""],
    ["Plazo ideal", result.data.timeline ?? ""],
    ["Mensaje", result.data.message ?? ""],
    ["Respuestas", answersText],
  ];
  const title = "Nueva solicitud de servicio desde el portfolio";

  try {
    await sendPortfolioEmail({
      html: emailLayout(title, rows),
      replyTo: result.data.email,
      subject: `Nueva solicitud de ${result.data.name}`,
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
