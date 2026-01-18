<p align="center">
	<img src="./public/logo.svg" alt="Multi Repuestos los Llanos" width="320" />
</p>

<p align="center">
	<a href="https://nextjs.org/">Next.js 16</a> · <a href="https://react.dev/">React 19</a> · <a href="https://www.typescriptlang.org/">TypeScript</a> · <a href="https://tailwindcss.com/">Tailwind CSS 4</a>
</p>

## 🏢 Multi Repuestos los Llanos - Sitio Web Corporativo

Sitio web corporativo para **Multi Repuestos los Llanos C.A.**, distribuidora nacional de repuestos de motos. Proyecto con App Router, diseño responsive, formulario de contacto con validación y API propia.

### ✨ Características
- Hero, servicios, sobre nosotros, contacto y footer responsivos
- Formulario conectado a `/api/contact` con validación y rate limiting
- Headers de seguridad y CORS vía `proxy.ts`
- Paleta corporativa (rojo + gris) y tipografía Geist
- Metadata SEO (OG/Twitter) y sitemap

### 🛠 Stack Tecnológico
- Next.js 16 (App Router), React 19
- TypeScript, Tailwind CSS 4, shadcn/ui
- Vercel Analytics

## 🚀 Inicio Rápido
```bash
npm install
npm run dev
# abre http://localhost:3000
```

## 🔧 Variables de Entorno
Crea `.env.local` a partir de [.env.example](.env.example):
```
RESEND_API_KEY=re_Z2gRZXz2_GJsbBkuy5nmFwhf1FDp2Yttv
CONTACT_EMAIL=multirepuestoslosllanos@hotmail.com
SMTP_FROM=noreply@multirepuestoslosllanos.com
NEXT_PUBLIC_SITE_URL=https://multirepuestoslosllanos.com
NEXT_PUBLIC_SITE_NAME=Multi Repuestos los Llanos C.A.
RATE_LIMIT_MAX_REQUESTS=5
RATE_LIMIT_WINDOW_MS=900000
```

## 📦 Scripts Disponibles
- `npm run dev` – entorno de desarrollo
- `npm run build` – build de producción
- `npm run start` – sirve la build
- `npm run lint` – linting
- `npm run type-check` – chequeo TypeScript (agregar en package.json si se desea)

## 📁 Estructura del Proyecto
- app/ → rutas App Router, layouts, API
- components/ → secciones y UI (shadcn)
- lib/ → utilidades, validación, tipos
- public/ → assets estáticos (favicon, og-image, logo)

## 🌐 Deployment
- Objetivo: Vercel. Ajusta `NEXT_PUBLIC_SITE_URL` y variables en dashboard.
- Health check en `/api/health`.
- Proxy global en [proxy.ts](proxy.ts) aplica headers de seguridad.

## 👥 Equipo
- Pasante: Jesús David Mariño Martínez
- Asistencia: GitHub Copilot (GPT-5.1-Codex-Max)

## 📄 Licencia
Uso interno del cliente. Añadir licencia formal si se requiere.
