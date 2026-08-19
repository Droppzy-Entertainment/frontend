import { Resend } from "resend";
import { env } from "./env";
import { escapeHtml } from "./sanitize";
import type { TalentFormValues, ContactFormValues } from "./validation";

const resend = new Resend(env.RESEND_API_KEY);

// Absolute URL — email clients fetch images from the public internet, they
// can't resolve a relative path. Resolves against NEXT_PUBLIC_SITE_URL, so
// the logo only actually loads once that env var points at a real deployed
// domain (it won't render for an http://localhost URL, since Gmail/etc.
// can't reach your machine).
const LOGO_URL = `${env.NEXT_PUBLIC_SITE_URL}/brand/droppzy-logo.png`;

interface EmailRow {
  label: string;
  value: string;
}

/**
 * Shared branded HTML shell for outbound notification emails — table-based
 * layout with inline styles throughout, since email clients (Gmail/Outlook
 * especially) strip <style> blocks and ignore most modern CSS.
 */
function renderEmailShell(heading: string, rows: EmailRow[]): string {
  const rowsHtml = rows
    .map(
      (row) => `
        <tr>
          <td style="padding: 14px 0; border-bottom: 1px solid #ececec;">
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #999999; margin-bottom: 4px;">
              ${row.label}
            </div>
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 15px; color: #111111; line-height: 1.5;">
              ${row.value}
            </div>
          </td>
        </tr>`
    )
    .join("");

  return `
    <!doctype html>
    <html>
      <body style="margin:0; padding:0; background:#f4f4f2;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f2; padding: 40px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%; background:#ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
                <tr>
                  <td style="padding: 32px 40px 24px; border-bottom: 3px solid #ff5722;">
                    <img src="${LOGO_URL}" alt="Droppzy Entertainment" width="160" style="display:block; border:0;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding: 28px 40px 4px;">
                    <p style="margin:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #ff5722;">
                      ${heading}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 40px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${rowsHtml}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 18px 40px; background:#0a0a0a;">
                    <p style="margin:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 12px; color: #999999;">
                      Sent automatically from the Droppzy Entertainment website.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `.trim();
}

function renderTalentEmailHtml(data: TalentFormValues): string {
  return renderEmailShell("New Talent Submission", [
    { label: "Name", value: escapeHtml(data.name) },
    { label: "Email", value: escapeHtml(data.email) },
    { label: "WhatsApp Number", value: escapeHtml(data.whatsappNumber) },
    { label: "Category", value: escapeHtml(data.categories.join(", ")) },
    {
      label: "Other Talents",
      value: data.otherTalents ? escapeHtml(data.otherTalents).replace(/\n/g, "<br />") : "—",
    },
  ]);
}

function renderContactEmailHtml(data: ContactFormValues): string {
  return renderEmailShell("New Contact Message", [
    { label: "Name", value: escapeHtml(data.name) },
    { label: "Email", value: escapeHtml(data.email) },
    { label: "Subject", value: escapeHtml(data.subject) },
    { label: "Message", value: escapeHtml(data.message).replace(/\n/g, "<br />") },
  ]);
}

export async function sendTalentSubmissionEmail(data: TalentFormValues): Promise<void> {
  try {
    await resend.emails.send({
      from: env.MAIL_FROM_ADDRESS,
      to: env.TALENT_RECIPIENT_EMAIL ?? "droppzyentertainment@gmail.com",
      replyTo: data.email,
      subject: `New Talent Form Submission from ${data.name} (${data.categories.join(", ")})`,
      html: renderTalentEmailHtml(data),
    });
  } catch (error) {
    console.error("sendTalentSubmissionEmail failed:", error);
    throw new Error("Failed to send talent submission email.");
  }
}

export async function sendContactSubmissionEmail(data: ContactFormValues): Promise<void> {
  try {
    await resend.emails.send({
      from: env.MAIL_FROM_ADDRESS,
      to: env.CONTACT_RECIPIENT_EMAIL,
      replyTo: data.email,
      subject: `Droppzy contact form: ${data.subject}`,
      html: renderContactEmailHtml(data),
    });
  } catch (error) {
    console.error("sendContactSubmissionEmail failed:", error);
    throw new Error("Failed to send contact submission email.");
  }
}
