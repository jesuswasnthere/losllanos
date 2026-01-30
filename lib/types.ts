export interface ContactFormData {
  correo: string
}

export interface SupportMessageData {
  correo: string
  mensaje: string
}

export interface ValidationResult<T = ContactFormData> {
  valid: boolean
  errors: Record<string, string>
  sanitizedData: T
}

export interface RateLimitInfo {
  ip: string
  attempts: number
  resetTime: number
}

export interface RateLimitCheckResult {
  allowed: boolean
  info: RateLimitInfo
}

export interface ContactResponse {
  success: boolean
  message: string
  errors?: Record<string, string>
  rateLimit?: RateLimitInfo
}
