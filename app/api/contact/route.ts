import { NextRequest, NextResponse } from "next/server"
import { validateContactForm, checkRateLimit } from "@/lib/validation"
import type { ContactFormData, ContactResponse } from "@/lib/types"
import { sendContactEmail } from "@/lib/email-service"

const RATE_LIMIT_MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 20)
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 300_000)

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  const realIp = req.headers.get("x-real-ip")?.trim()
  return forwarded || realIp || "unknown"
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  const rate = checkRateLimit(ip, RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS)
  if (!rate.allowed) {
    const payload: ContactResponse = {
      success: false,
      message: "Has alcanzado el límite de envíos. Intenta más tarde.",
      errors: { form: "Demasiadas solicitudes desde esta IP." },
      rateLimit: rate.info,
    }

    console.warn(JSON.stringify({ event: "contact_rate_limited", ip, attempts: rate.info.attempts }))
    return NextResponse.json(payload, { status: 429 })
  }

  let body: ContactFormData
  try {
    body = (await req.json()) as ContactFormData
  } catch (error) {
    const payload: ContactResponse = {
      success: false,
      message: "No pudimos leer la solicitud.",
      errors: { form: "JSON inválido." },
    }
    console.error(JSON.stringify({ event: "contact_invalid_json", ip, error }))
    return NextResponse.json(payload, { status: 400 })
  }

  const validation = validateContactForm(body)
  if (!validation.valid) {
    const payload: ContactResponse = {
      success: false,
      message: "Revisa los campos marcados.",
      errors: validation.errors,
    }
    console.warn(JSON.stringify({ event: "contact_validation_error", ip, errors: validation.errors }))
    return NextResponse.json(payload, { status: 400 })
  }

  try {
    const emailResult = await sendContactEmail(validation.sanitizedData)

    if (!emailResult.sent && !emailResult.skipped) {
      console.error(JSON.stringify({ event: "contact_email_failed", ip, error: emailResult.error }))
      const payload: ContactResponse = {
        success: false,
        message: "No pudimos enviar tu mensaje en este momento.",
        errors: { form: "Inténtalo nuevamente más tarde." },
      }
      return NextResponse.json(payload, { status: 502 })
    }

    const payload: ContactResponse = {
      success: true,
      message: emailResult.sent ? "Solicitud recibida. Te enviaremos el catálogo pronto." : "Solicitud registrada. Te enviaremos el catálogo pronto.",
    }

    console.info(
      JSON.stringify({
        event: "catalog_request_received",
        ip,
        correo: validation.sanitizedData.correo,
        emailSent: emailResult.sent,
      })
    )

    return NextResponse.json(payload, { status: 200 })
  } catch (error) {
    const payload: ContactResponse = {
      success: false,
      message: "Ocurrió un error al procesar tu mensaje.",
      errors: { form: "Inténtalo de nuevo en unos minutos." },
    }
    console.error(JSON.stringify({ event: "contact_unexpected_error", ip, error }))
    return NextResponse.json(payload, { status: 500 })
  }
}
