import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://multirepuestoslosllanos.com"
const businessName = "Multi Repuestos los Llanos C.A."
const description =
  "Distribuidora nacional de repuestos de motos. Calidad, experiencia y respuesta rápida para talleres y comercios."
const keywords = [
  "repuestos de motos",
  "distribuidora de repuestos",
  "portuguesa",
  "Araure",
  "multirepuestos los llanos",
  "venezuela",
  "motos",
]

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${businessName} | Repuestos de motos en Venezuela`,
  description,
  keywords: [
    ...keywords,
  ],
  openGraph: {
    title: `${businessName} | Repuestos de motos en Venezuela`,
    description,
    url: siteUrl,
    siteName: businessName,
    locale: "es_VE",
    type: "website",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: businessName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${businessName} | Repuestos de motos en Venezuela`,
    description,
    images: [`${siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: businessName,
    url: siteUrl,
    email: "multirepuestoslosllanos@hotmail.com",
    telephone: ["+58 414 5341339", "+58 412 3087308"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Araure",
      addressRegion: "Portuguesa",
      addressCountry: "VE",
    },
    keywords,
  }

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessName,
    url: siteUrl,
    telephone: ["+58 414 5341339", "+58 412 3087308"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sector Campo Lindo",
      addressLocality: "Araure",
      addressRegion: "Portuguesa",
      addressCountry: "VE",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "08:00", closes: "13:00" },
    ],
    keywords,
  }

  return (
    <html lang="es">
      <body className={`${_geist.variable} ${_geistMono.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Saltar al contenido principal
        </a>
        {children}
        <script
          type="application/ld+json"
          // Datos estructurados para SEO (Organization)
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          // Datos estructurados para SEO (LocalBusiness)
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  )
}