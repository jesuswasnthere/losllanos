import { Resend } from "resend"
import type { ContactFormData } from "./types"

const resendApiKey = process.env.RESEND_API_KEY
const contactEmail = process.env.CONTACT_EMAIL
const smtpFrom = process.env.SMTP_FROM

const isEmailEnabled = Boolean(resendApiKey && contactEmail && smtpFrom)

function getResendClient() {
  if (!resendApiKey) return null
  return new Resend(resendApiKey)
}

function buildHtml(data: ContactFormData) {
  return `
  <table style="font-family:Arial,sans-serif;font-size:14px;color:#111;padding:16px;border-collapse:collapse;width:100%;max-width:640px;">
    <tr><td style="padding:8px 0;font-size:16px;font-weight:700;">Nuevo mensaje de contacto</td></tr>
    <tr><td style="padding:4px 0;"><strong>Nombre:</strong> ${escapeHtml(data.nombre)}</td></tr>
    <tr><td style="padding:4px 0;"><strong>Correo:</strong> ${escapeHtml(data.correo)}</td></tr>
    <tr><td style="padding:12px 0;"><strong>Mensaje:</strong><br/>${escapeHtml(data.mensaje).replace(/\n/g, "<br/>")}</td></tr>
  </table>`
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function sendContactEmail(data: ContactFormData) {
  if (!isEmailEnabled) {
    console.warn(
      JSON.stringify({ event: "email_disabled", reason: "Missing RESEND_API_KEY or CONTACT_EMAIL or SMTP_FROM" })
    )
    return { sent: false, skipped: true }
  }

  const client = getResendClient()
  if (!client) {
    return { sent: false, error: "No se pudo inicializar el cliente de email." }
  }

  try {
    const html = buildHtml(data)
    const result = await client.emails.send({
      from: smtpFrom as string,
      to: contactEmail as string,
      // Resend HTTP API uses snake_case; SDK types lag behind.
      // @ts-expect-error reply_to is accepted by the API even if types complain.
      reply_to: data.correo,
      subject: `Contacto web - ${data.nombre}`,
      html,
    })
    return { sent: true, id: result.data?.id }
  } catch (error) {
    console.error(JSON.stringify({ event: "email_send_error", error }))
    return { sent: false, error: "Fallo al enviar el correo" }
  }
}
