import nodemailer from "nodemailer";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

const configured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

const transporter = configured
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null;

export async function sendMail(opts: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  const from = SMTP_FROM || "OSTA Services <no-reply@osta.ae>";
  if (!transporter) {
    // Graceful fallback so the app works without SMTP configured.
    console.log("📧 [email disabled — would send]", {
      to: opts.to,
      subject: opts.subject,
    });
    return { sent: false };
  }
  await transporter.sendMail({ from, ...opts });
  return { sent: true };
}

export function appointmentEmail(p: {
  customerName: string;
  service: string;
  when: string;
  address?: string | null;
  phone?: string | null;
}) {
  return `
  <div style="font-family:Inter,Arial,sans-serif;background:#070b14;padding:24px;color:#e6ebf5">
    <div style="max-width:560px;margin:auto;background:#0d1426;border:1px solid #1d2b4d;border-radius:16px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#2f6bff,#1f57e6);padding:20px 24px">
        <h1 style="margin:0;font-size:20px;color:#fff;letter-spacing:1px">OSTA <span style="opacity:.8">SERVICES</span></h1>
      </div>
      <div style="padding:24px">
        <h2 style="margin:0 0 8px;font-size:18px;color:#fff">Appointment Confirmed ✅</h2>
        <p style="color:#9aa6c0;margin:0 0 20px">Hi ${p.customerName}, your appointment request has been received.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#9aa6c0">Service</td><td style="padding:8px 0;color:#fff;text-align:right">${p.service}</td></tr>
          <tr><td style="padding:8px 0;color:#9aa6c0">Date &amp; Time</td><td style="padding:8px 0;color:#fff;text-align:right">${p.when}</td></tr>
          ${p.address ? `<tr><td style="padding:8px 0;color:#9aa6c0">Location</td><td style="padding:8px 0;color:#fff;text-align:right">${p.address}</td></tr>` : ""}
          ${p.phone ? `<tr><td style="padding:8px 0;color:#9aa6c0">Phone</td><td style="padding:8px 0;color:#fff;text-align:right">${p.phone}</td></tr>` : ""}
        </table>
        <p style="color:#9aa6c0;margin:20px 0 0;font-size:13px">Our team will contact you shortly to confirm the details. Thank you for choosing OSTA Services.</p>
      </div>
    </div>
  </div>`;
}
