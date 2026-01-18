export interface ContactFormData {
  nombre: string
  correo: string
  mensaje: string
}

export interface ValidationResult {
  valid: boolean
  errors: Record<string, string>
  sanitizedData: ContactFormData
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
