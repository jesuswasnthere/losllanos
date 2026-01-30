"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  ChevronDown,
  ChevronUp,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react"

const contactInfo = {
  phoneMain: "+58 412 0720344",
  phoneSecondary: "+58 414 5341339",
  email: "multirepuestoslosllanos@hotmail.com",
  location: "Araure, Portuguesa",
  rif: "J-405043709",
}

const navLinks = [
  { href: "/#main-content", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#contacto", label: "Contáctanos" },
  { href: "/nosotros", label: "Nosotros" },
]

const socialLinks = [
  { href: "https://wa.me/584120720344", label: "WhatsApp", icon: MessageCircle },
  { href: "https://www.facebook.com/multirepuestoslosllanosca", label: "Facebook", icon: Facebook },
  {
    href: "https://www.instagram.com/multirepuestoslosllanos?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    label: "Instagram",
    icon: Instagram,
  },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const sanitizedPhone = contactInfo.phoneMain.replace(/\s+/g, "")
  const whatsappNumber = contactInfo.phoneMain.replace(/\D/g, "")

  const handleNavClick = () => setMenuOpen(false)
  const handleCollapse = () => {
    setMenuOpen(false)
    setCollapsed(true)
  }

  return (
    <>
      {collapsed && (
        <div className="fixed left-1/2 top-3 z-60 -translate-x-1/2 rounded-full border border-border bg-card/95 px-3 py-1.5 shadow-md backdrop-blur supports-backdrop-filter:bg-card/80">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            onClick={() => setCollapsed(false)}
            aria-label="Mostrar barra de navegación"
          >
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
            Mostrar barra
          </button>
        </div>
      )}

      <header
        className={cn(
          "sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 transition-transform duration-300",
          collapsed ? "-translate-y-full" : "translate-y-0"
        )}
        aria-label="Barra de navegación principal"
      >
      <div className="border-b border-border/70 bg-muted/60">
        <div className="container mx-auto flex items-center justify-between gap-2 px-2.5 py-2 text-xs sm:text-sm text-muted-foreground flex-nowrap">
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 flex-nowrap">
            <a
              href={`tel:${sanitizedPhone}`}
              className="inline-flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary hover:bg-primary/10 rounded-md px-2 py-1 shrink-0"
            >
              <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>{contactInfo.phoneMain}</span>
            </a>

            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-primary hover:bg-primary/10 rounded-md px-2 py-1 shrink-0"
            >
              <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="hidden sm:inline">{contactInfo.email}</span>
              <span className="sm:hidden">Correo</span>
            </a>

            <Link
              href="https://maps.app.goo.gl/6g4hESVYo9Frpep2A"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-2 shrink-0 rounded-md px-2 py-1 transition-colors hover:bg-primary/10 hover:text-primary"
              aria-label="Abrir ubicación en Google Maps"
            >
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>{contactInfo.location}</span>
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 font-semibold text-foreground transition-colors hover:bg-primary/15 shrink-0"
            >
              <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm">WhatsApp</span>
            </Link>
            <span className="hidden md:inline-flex items-center gap-2 rounded-full bg-secondary/30 px-3 py-1 text-xs font-semibold text-foreground">
              RIF {contactInfo.rif}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex items-center justify-between gap-2.5 px-2.5 py-3 sm:gap-6 sm:px-4 sm:py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Ir al inicio">
          <div className="relative h-10 w-30 sm:h-12 sm:w-44">
            <Image
              src="/logo%20los%20llanos.jpg"
              alt="Logo de Multi Repuestos los Llanos"
              fill
              sizes="(min-width: 1280px) 176px, (min-width: 1024px) 168px, 128px"
              className="object-contain drop-shadow-sm"
              priority
            />
          </div>
          <div className="hidden md:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-foreground">Multi Repuestos los Llanos</span>
            <span className="text-xs text-muted-foreground">Distribución nacional de repuestos</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="rounded-full px-4 py-2 transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors",
                    "hover:border-primary/50 hover:text-primary"
                  )}
                  aria-label={social.label}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </Link>
              )
            })}
          </div>
          <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
            <Link href="/#servicios">Servicios</Link>
          </Button>
          <Button size="sm" asChild className="px-3 h-9 sm:px-4 sm:h-10">
            <Link href="/#contacto">Recibir catálogo</Link>
          </Button>
          <button
            type="button"
            className="hidden md:inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted"
            onClick={handleCollapse}
            aria-label="Ocultar barra de navegación"
          >
            <ChevronUp className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted md:hidden"
            onClick={handleCollapse}
            aria-label="Ocultar barra de navegación"
          >
            <ChevronUp className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted md:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className="hidden md:block h-px w-full bg-linear-to-r from-primary/30 via-transparent to-primary/30" aria-hidden="true" />

      {menuOpen ? (
        <div className="md:hidden border-t border-border/70 bg-background px-4 pb-6 shadow-sm">
          <nav className="flex flex-col gap-1 py-4 text-sm font-semibold text-foreground">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="rounded-lg px-3 py-2 transition-colors hover:bg-primary/10 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-2 rounded-lg border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
              <a href={`tel:${sanitizedPhone}`} className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-card">
                <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{contactInfo.phoneMain}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-card">
                <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{contactInfo.email}</span>
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-card"
              >
                <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <span className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                {contactInfo.location}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors",
                      "hover:border-primary/50 hover:text-primary"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      ) : null}
      </header>
    </>
  )
}
