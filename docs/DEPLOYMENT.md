# Guía de Deployment – Multi Repuestos los Llanos

## 1. Requisitos previos
- Cuenta en Vercel con acceso al repo
- Node 20+, npm
- Variables de entorno configuradas (ver sección 3)
- Dominio personalizado (opcional) y acceso al DNS

## 2. Pasos en Vercel
1) Importar el repo desde GitHub.
2) Framework: Next.js (App Router).
3) Node 20; `npm install`, `npm run build`.
4) Establecer variables de entorno (Production y Preview).
5) Deploy.

## 3. Variables de entorno
Configura en Vercel (Production/Preview):
- `NEXT_PUBLIC_SITE_URL` = https://multirepuestoslosllanos.com
- `NEXT_PUBLIC_SITE_NAME` = Multi Repuestos los Llanos C.A.
- `CONTACT_EMAIL` = multirepuestoslosllanos@hotmail.com
- `SMTP_FROM` = noreply@multirepuestoslosllanos.com
- `RESEND_API_KEY` = (si se usa envío de email)
- `RATE_LIMIT_MAX_REQUESTS` = 5
- `RATE_LIMIT_WINDOW_MS` = 900000
- `BLOCKED_IPS` = (opcional, separados por coma)

## 4. Dominio personalizado
1) En Vercel > Project > Domains: agrega el dominio.
2) En el DNS del dominio: apunta un CNAME a `cname.vercel-dns.com`.
3) Espera propagación DNS (puede tardar minutos-horas).

## 5. SSL/TLS
- Vercel emite certificados automáticos (Let's Encrypt) al apuntar el dominio.
- Verifica que el dominio resuelva y espera la emisión.

## 6. Seguridad
- Proxy global en `proxy.ts` aplica: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, X-XSS-Protection, CORS para /api, rate limit básico.
- Ajusta `NEXT_PUBLIC_SITE_URL` en prod.

## 7. Checks antes de deploy
- `npm run lint`
- `npm run type-check`
- `npm run build`
- Probar `/api/health` en local.
- Probar `/api/contact` (éxito, error de validación, rate limit).

## 8. Monitoreo y analytics
- Vercel Analytics ya integrado (`@vercel/analytics`).
- Opcional: añadir Log Drain o 3rd party (Sentry) para errores.

## 9. Troubleshooting
- Error de lock dev: borrar `.next/dev/lock` y reiniciar dev server.
- CSP bloquea recursos externos: añade dominios requeridos en `proxy.ts` (CSP connect/img/style/script-src).
- Rate limit 429: ajustar `RATE_LIMIT_MAX_REQUESTS`/`RATE_LIMIT_WINDOW_MS`.

## 10. Rollback
- En Vercel, selecciona un deploy previo y promuévelo a Production.
- Revertir commit en Git si aplica y redeploy.
