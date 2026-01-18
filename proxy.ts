import type { NextFetchEvent, NextRequest } from "next/server"
import { NextResponse } from "next/server"

const RATE_LIMIT_MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 5)
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 900_000)
const BLOCKED_IPS = new Set(
  (process.env.BLOCKED_IPS ?? "")
    .split(",")
    .map((ip) => ip.trim())
    .filter(Boolean)
)

const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  const realIp = req.headers.get("x-real-ip")?.trim()
  return forwarded || realIp || "unknown"
}

function checkRateLimit(ip: string) {
  const now = Date.now()
  const existing = rateLimitStore.get(ip)

  if (!existing || existing.resetTime < now) {
    const resetTime = now + RATE_LIMIT_WINDOW_MS
    rateLimitStore.set(ip, { count: 1, resetTime })
    return { allowed: true, count: 1, resetTime }
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, count: existing.count, resetTime: existing.resetTime }
  }

  const updated = { count: existing.count + 1, resetTime: existing.resetTime }
  rateLimitStore.set(ip, updated)
  return { allowed: true, count: updated.count, resetTime: updated.resetTime }
}

function applySecurityHeaders(response: NextResponse) {
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "img-src 'self' data: https:",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data: https:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ")
  )
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
  return response
}

function applyCors(response: NextResponse, req: NextRequest) {
  const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "*"
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin)
  response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
  response.headers.set("Access-Control-Allow-Credentials", "true")

  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: response.headers })
  }

  return response
}

export default function proxy(req: NextRequest) {
  const ip = getClientIp(req)
  const url = req.nextUrl.pathname
  const method = req.method

  if (BLOCKED_IPS.has(ip)) {
    console.warn(JSON.stringify({ event: "request_blocked", ip, url, method }))
    return NextResponse.json({ success: false, message: "Acceso bloqueado." }, { status: 403 })
  }

  const rate = checkRateLimit(ip)
  if (!rate.allowed) {
    console.warn(JSON.stringify({ event: "rate_limit", ip, url, method, attempts: rate.count }))
    return NextResponse.json(
      {
        success: false,
        message: "Has superado el límite de solicitudes. Intenta más tarde.",
        rateLimit: { ip, attempts: rate.count, resetTime: rate.resetTime },
      },
      { status: 429 }
    )
  }

  console.info(JSON.stringify({ event: "request", ip, url, method, ts: new Date().toISOString() }))

  let response = NextResponse.next()
  response = applySecurityHeaders(response)

  const isApi = url.startsWith("/api")
  if (isApi) {
    response = applyCors(response, req)
    if (req.method === "OPTIONS") return response
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.*|apple-icon.*|robots.txt|sitemap.xml).*)"],
}
