type SendEmailInput = {
  html: string;
  replyTo?: string;
  subject: string;
  text: string;
};

const resendEndpoint = "https://api.resend.com/emails";

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM_EMAIL ??
    "Eliana Charquero Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_EMAIL ?? "elicharquero@gmail.com";

  return { apiKey, from, to };
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendPortfolioEmail({
  html,
  replyTo,
  subject,
  text,
}: SendEmailInput) {
  const { apiKey, from, to } = getEmailConfig();

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const response = await fetch(resendEndpoint, {
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend email failed: ${details}`);
  }

  return response.json() as Promise<{ id: string }>;
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function emailLayout(title: string, rows: Array<[string, string]>) {
  const rowsHtml = rows
    .filter(([, value]) => value.trim().length > 0)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 12px 0; color: #6b7280; width: 170px; vertical-align: top; font-weight: 700;">${escapeHtml(label)}</td>
          <td style="padding: 12px 0; color: #243c2f; white-space: pre-wrap;">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; background: #fffbf5; padding: 32px;">
      <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px;">
        <h1 style="margin: 0 0 20px; color: #3b5345; font-size: 28px;">${escapeHtml(title)}</h1>
        <table style="width: 100%; border-collapse: collapse; font-size: 16px; line-height: 1.5;">
          ${rowsHtml}
        </table>
      </div>
    </div>
  `;
}

export function textFromRows(title: string, rows: Array<[string, string]>) {
  const body = rows
    .filter(([, value]) => value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n\n");

  return `${title}\n\n${body}`;
}
