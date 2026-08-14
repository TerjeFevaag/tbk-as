import { NextResponse } from "next/server";

// Sends contact-form submissions as email via MailerSend.
// Config comes from env (see .env.local / Vercel env vars):
//   MAILERSEND_API_KEY  – secret, required
//   MAILERSEND_FROM     – verified sender on the tbk-as.no domain
//   MAILERSEND_TO        – recipient of the enquiries

const FROM_EMAIL = process.env.MAILERSEND_FROM ?? "noreply@tbk-as.no";
const TO_EMAIL = process.env.MAILERSEND_TO ?? "olav@tbk-as.no";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  navn?: string;
  epost?: string;
  telefon?: string;
  melding?: string;
  nettside?: string; // honeypot – must stay empty
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Ugyldig forespørsel." }, { status: 400 });
  }

  // Honeypot: a real user never sees or fills this field. If it's set,
  // silently accept the request but don't send anything.
  if (data.nettside && data.nettside.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const navn = (data.navn ?? "").trim();
  const epost = (data.epost ?? "").trim();
  const telefon = (data.telefon ?? "").trim();
  const melding = (data.melding ?? "").trim();

  if (!navn || !melding || !EMAIL_PATTERN.test(epost)) {
    return NextResponse.json(
      { error: "Manglende eller ugyldige felter." },
      { status: 422 },
    );
  }

  const apiKey = process.env.MAILERSEND_API_KEY;
  if (!apiKey) {
    console.error("MAILERSEND_API_KEY mangler i miljøet.");
    return NextResponse.json(
      { error: "E-posttjenesten er ikke konfigurert." },
      { status: 500 },
    );
  }

  const text = [
    `Navn: ${navn}`,
    `E-post: ${epost}`,
    `Telefon: ${telefon || "(ikke oppgitt)"}`,
    "",
    "Melding:",
    melding,
  ].join("\n");

  const html = [
    "<h2>Ny henvendelse fra kontaktskjemaet på tbk-as.no</h2>",
    `<p><strong>Navn:</strong> ${escapeHtml(navn)}</p>`,
    `<p><strong>E-post:</strong> ${escapeHtml(epost)}</p>`,
    `<p><strong>Telefon:</strong> ${telefon ? escapeHtml(telefon) : "(ikke oppgitt)"}</p>`,
    "<p><strong>Melding:</strong></p>",
    `<p style="white-space:pre-wrap">${escapeHtml(melding)}</p>`,
  ].join("");

  try {
    const res = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { email: FROM_EMAIL, name: "Teknisk Byggkontroll – kontaktskjema" },
        to: [{ email: TO_EMAIL, name: "Olav L. Strøm" }],
        reply_to: { email: epost, name: navn },
        subject: `Ny henvendelse fra ${navn} – tbk-as.no`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("MailerSend-feil:", res.status, detail);
      return NextResponse.json(
        { error: "Kunne ikke sende meldingen. Prøv igjen senere." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Uventet feil ved sending av e-post:", err);
    return NextResponse.json(
      { error: "Kunne ikke sende meldingen. Prøv igjen senere." },
      { status: 502 },
    );
  }
}
