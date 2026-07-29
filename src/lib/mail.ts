import { Resend } from "resend";
import { env } from "./env";
import { escapeHtml } from "./sanitize";
import type { TalentFormValues, ContactFormValues } from "./validation";

const resend = new Resend(env.RESEND_API_KEY);

function renderTalentEmailHtml(data: TalentFormValues): string {
  return `
    <h1>New talent submission</h1>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Portfolio URL:</strong> ${escapeHtml(data.portfolioUrl)}</p>
    <p><strong>Category:</strong> ${escapeHtml(data.category)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message)}</p>
  `.trim();
}

function renderContactEmailHtml(data: ContactFormValues): string {
  return `
    <h1>New contact message</h1>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message)}</p>
  `.trim();
}

export async function sendTalentSubmissionEmail(data: TalentFormValues): Promise<void> {
  try {
    await resend.emails.send({
      from: env.MAIL_FROM_ADDRESS,
      to: env.TALENT_RECIPIENT_EMAIL ?? env.CONTACT_RECIPIENT_EMAIL,
      replyTo: data.email,
      subject: `Droppzy talent form: ${data.category}`,
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
