# Arquitectura – Multi Repuestos los Llanos

## 1. Visión general
- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4
- UI: shadcn/ui + lucide-react
- Analytics: @vercel/analytics
- Validación y rate limiting en API de contacto

## 2. Componentes principales
- app/: layout, página principal, APIs (`/api/contact`, `/api/health`)
- components/: secciones (hero, about, services, contact, footer) y UI (button, input, textarea, etc.)
- lib/: utilidades (`utils`, `validation`, `types`)
- proxy.ts: proxy/middleware con headers de seguridad, CORS y rate limit global
- public/: assets estáticos (favicon, og, logo)

## 3. Flujo de datos
Usuario → Frontend (App Router) → `/api/contact` (validación + rate limit + sanitizado) → (futuro: email-service) → respuesta estandarizada.

## 4. API de contacto
- Ruta: `/api/contact`
- Payload: { nombre, correo, mensaje }
- Validación: email regex, límites de longitud, sanitizado (strip tags, trim)
- Rate limit: 5 req / 15 min por IP (memoria, env configurable)
- Respuestas tipadas: { success, message, errors?, rateLimit? }

## 5. Seguridad
- Headers: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, X-XSS-Protection
- CORS: permitido el origen configurado en `NEXT_PUBLIC_SITE_URL` para /api
- Rate limit global en proxy
- Sanitización en API contact

## 6. Estilos y theming
- Tailwind CSS 4 con variables en `globals.css`
- Paleta corporativa (rojo/gris) y fuentes Geist

## 7. Accesibilidad
- Skip link en layout, landmark `main` en page
- aria-label en CTAs, aria-live en mensajes del formulario

## 8. Performance (actual)
- PWA no implementada; assets placeholder
- Loading UI genérico
- SEO: metadata + OG/Twitter + sitemap + robots

## 9. Convenciones
- Español para negocio, inglés para código técnico
- Archivos kebab-case, componentes PascalCase
- Funcionales, sin class components

## 10. Pendientes / Futuro
- Integrar email-service (Resend/SendGrid)
- Reemplazar assets definitivos (og, favicon, apple-touch)
- Lazy loading de secciones (perf)
- A11y audit completa (WCAG)
- Manifest y set de íconos completo
