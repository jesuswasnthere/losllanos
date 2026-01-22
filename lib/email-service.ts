import { Resend } from "resend"
import type { ContactFormData } from "./types"

const resendApiKey = process.env.RESEND_API_KEY
const contactEmail = process.env.CONTACT_EMAIL
// Use explicit branded sender with env override
const smtpFrom = process.env.SMTP_FROM ?? "Ventas Multirepuestos <ventas@multirepuestoslosllanos.com>"

const isEmailEnabled = Boolean(resendApiKey && smtpFrom)

function getResendClient() {
  if (!resendApiKey) return null
  return new Resend(resendApiKey)
}

function buildInternalHtml(data: ContactFormData) {
  return `
  <table style="font-family:Arial,sans-serif;font-size:14px;color:#111;padding:16px;border-collapse:collapse;width:100%;max-width:640px;">
    <tr><td style="padding:8px 0;font-size:16px;font-weight:700;">Nueva solicitud de catálogo</td></tr>
    <tr><td style="padding:4px 0;"><strong>Correo:</strong> ${escapeHtml(data.correo)}</td></tr>
  </table>`
}

function buildUserHtml() {
  return `
  <table style="font-family:Arial,sans-serif;font-size:14px;color:#111;padding:16px;border-collapse:collapse;width:100%;max-width:640px;">
    <tr><td style="padding:8px 0;font-size:16px;font-weight:700;">Hola 👋</td></tr>
    <tr><td style="padding:4px 0;">Gracias por tu interés. Pronto te enviaremos el catálogo actualizado.</td></tr>
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
    console.warn(JSON.stringify({ event: "email_disabled", reason: "Missing RESEND_API_KEY or SMTP_FROM" }))
    return { sent: false, skipped: true }
  }

  const client = getResendClient()
  if (!client) {
    return { sent: false, error: "No se pudo inicializar el cliente de email." }
  }

  try {
    const userHtml = buildUserHtml()
    const { data: userData, error: userError } = await client.emails.send({
      from: smtpFrom as string,
      to: data.correo,
      replyTo: contactEmail || smtpFrom,
      subject: "Hola, gracias por tu interés",
      html: userHtml,
      text: "Hola, gracias por tu interés. Pronto te enviaremos el catálogo actualizado.",
    })

    if (userError) {
      console.error(JSON.stringify({ event: "email_user_error", to: data.correo, error: userError }))
      return { sent: false, error: "Fallo al enviar el correo al destinatario" }
    }

    console.info(JSON.stringify({ event: "email_user_sent", to: data.correo, id: userData?.id }))

    if (contactEmail) {
      const internalHtml = buildInternalHtml(data)
      const { error: internalError } = await client.emails.send({
        from: smtpFrom as string,
        to: contactEmail,
        replyTo: data.correo,
        subject: "Solicitud de catálogo",
        html: internalHtml,
        text: `Nueva solicitud de catálogo\nCorreo: ${data.correo}`,
      })
      if (internalError) {
        console.error(JSON.stringify({ event: "email_internal_error", to: contactEmail, error: internalError }))
      } else {
        console.info(JSON.stringify({ event: "email_internal_sent", to: contactEmail, fromForm: data.correo }))
      }
    }

    return { sent: true, id: userData?.id, userNotified: true }
  } catch (error) {
    console.error(JSON.stringify({ event: "email_send_error", error }))
    return { sent: false, error: "Fallo al enviar el correo" }
  }
}
