import { ContactFormData, RateLimitCheckResult, RateLimitInfo, SupportMessageData, ValidationResult } from "./types"

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim())
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/[<>`]/g, "")
    .trim()
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const sanitized: ContactFormData = {
    correo: sanitizeInput(data.correo),
  }

  const errors: Record<string, string> = {}

  if (!sanitized.correo) {
    errors.correo = "El correo es requerido."
  } else if (sanitized.correo.length > 120) {
    errors.correo = "El correo no debe exceder 120 caracteres."
  } else if (!validateEmail(sanitized.correo)) {
    errors.correo = "Ingresa un correo válido."
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitizedData: sanitized,
  }
}

export function validateSupportMessageForm(data: SupportMessageData): ValidationResult<SupportMessageData> {
  const sanitized: SupportMessageData = {
    correo: sanitizeInput(data.correo),
    mensaje: sanitizeInput(data.mensaje),
  }

  const errors: Record<string, string> = {}

  if (!sanitized.correo) {
    errors.correo = "El correo es requerido."
  } else if (sanitized.correo.length > 120) {
    errors.correo = "El correo no debe exceder 120 caracteres."
  } else if (!validateEmail(sanitized.correo)) {
    errors.correo = "Ingresa un correo válido."
  }

  if (!sanitized.mensaje) {
    errors.mensaje = "El mensaje es requerido."
  } else if (sanitized.mensaje.length < 10) {
    errors.mensaje = "Cuéntanos un poco más sobre tu necesidad (mínimo 10 caracteres)."
  } else if (sanitized.mensaje.length > 1500) {
    errors.mensaje = "El mensaje no debe exceder 1500 caracteres."
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitizedData: sanitized,
  }
}

export function checkRateLimit(
  ip: string,
  maxRequests: number,
  windowMs: number
): RateLimitCheckResult {
  const now = Date.now()
  const existing = rateLimitStore.get(ip)

  if (!existing || existing.resetTime < now) {
    const resetTime = now + windowMs
    rateLimitStore.set(ip, { count: 1, resetTime })
    return {
      allowed: true,
      info: { ip, attempts: 1, resetTime },
    }
  }

  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      info: { ip, attempts: existing.count, resetTime: existing.resetTime },
    }
  }

  const updated = { count: existing.count + 1, resetTime: existing.resetTime }
  rateLimitStore.set(ip, updated)

  return {
    allowed: true,
    info: { ip, attempts: updated.count, resetTime: updated.resetTime },
  }
}
