"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook, Instagram, Mail, MapPin, Phone, Send } from "lucide-react"

type FormStatus = "idle" | "sending" | "success" | "error"

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

const socialLinks = [
  { href: "https://www.facebook.com/multirepuestoslosllanosca", label: "Facebook", icon: Facebook },
  {
    href: "https://www.instagram.com/multirepuestoslosllanos?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    label: "Instagram",
    icon: Instagram,
  },
  { href: "https://t.me/MRLLCA", label: "Telegram", icon: Send },
]

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    correo: "",
  })

  const phoneNumber = "+58 412 0720344"
  const phoneHref = `tel:${phoneNumber.replace(/\s+/g, "")}`
  const mapsHref = "https://maps.app.goo.gl/6g4hESVYo9Frpep2A"

  const validateField = (name: "correo", value: string) => {
    if (name === "correo") {
      if (!value.trim()) return "El correo es requerido."
      if (value.trim().length > 120) return "Máximo 120 caracteres."
      if (!emailRegex.test(value.trim())) return "Ingresa un correo válido."
    }
    return ""
  }

  const handleChange = (name: "correo", value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    const validationMessage = validateField(name, value)
    setFieldErrors((prev) => {
      const next = { ...prev }
      if (validationMessage) next[name] = validationMessage
      else delete next[name]
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setStatus("sending")
    setErrorMessage("")
    setFieldErrors({})

    const localErrors: Record<string, string> = {}
    ;(Object.keys(formData) as Array<"correo">).forEach((key) => {
      const message = validateField(key, formData[key])
      if (message) localErrors[key] = message
    })

    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors)
      setStatus("error")
      setErrorMessage("Revisa los campos marcados.")
      return
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = (await response.json()) as { message?: string; errors?: Record<string, string> }

      if (!response.ok) {
        setStatus("error")
        setErrorMessage(data.message || "No pudimos enviar tu mensaje.")
        setFieldErrors(data.errors || {})
        return
      }

      setStatus("success")
      setFormData({ correo: "" })
      setTimeout(() => setStatus("idle"), 3000)
    } catch (error) {
      console.error("contact_form_error", error)
      setStatus("error")
      setErrorMessage("No pudimos enviar tu mensaje. Intenta nuevamente.")
    }
  }

  const handleRetry = () => {
    if (status === "error") {
      setStatus("idle")
      setErrorMessage("")
      setFieldErrors({})
    }
  }

  return (
    <section id="contacto" className="py-24 bg-background scroll-mt-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Encabezado de sección */}
          <div className="mb-16 text-center" data-aos="fade-up">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">Recibe nuestro catálogo</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Déjanos tu correo y te enviaremos el catálogo actualizado con nuestros productos.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Información de contacto */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Información de Contacto</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Nuestro equipo está disponible para ayudarte con cualquier consulta sobre productos, servicios o
                  distribución.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">multirepuestoslosllanos@hotmail.com</p>
                    {/* <p className="text-muted-foreground">multirepuestoslosllanos@hotmail.com</p> */}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Send className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Telegram</h4>
                    <Link href="https://t.me/MRLLCA" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
                      t.me/MRLLCA
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Teléfono</h4>
                    <a
                      href={phoneHref}
                      className="text-muted-foreground transition-colors hover:text-primary"
                      aria-label="Llamar a Multi Repuestos los Llanos"
                    >
                      {phoneNumber}
                    </a>
                    {/* <p className="text-muted-foreground">+58 414 5341339</p> */}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Dirección</h4>
                    <Link
                      href={mapsHref}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground transition-colors hover:text-primary"
                      aria-label="Abrir ubicación en Google Maps"
                    >
                      <span className="block">Araure, Sector Campo Lindo</span>
                      <span className="block">Portuguesa, Venezuela</span>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <Link
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                        aria-label={social.label}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </Link>
                    )
                  })}
                  <span className="ml-1 text-sm font-semibold text-muted-foreground">Redes sociales</span>
                </div>
              </div>

              {/* Horarios */}
              <div className="rounded-lg border border-border bg-muted/50 p-6">
                <h4 className="font-semibold text-foreground mb-3">Horario de Atención</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Lunes a Viernes:</span>
                    <span className="font-medium text-foreground">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados:</span>
                    <span className="font-medium text-foreground">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingos:</span>
                    <span className="font-medium text-foreground">8:00 AM - 1:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div>
              <div className="mb-6 max-w-lg mx-auto overflow-hidden rounded-lg">
                <div className="relative aspect-4/3">
                  <Image
                    src="/catalogo.gif"
                    alt="Catálogo de productos"
                    fill
                    sizes="(min-width: 1024px) 520px, 92vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="correo" className="text-foreground">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="correo"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.correo}
                    onChange={(e) => handleChange("correo", e.target.value)}
                    className="bg-card"
                    aria-invalid={Boolean(fieldErrors.correo)}
                    required
                  />
                  {fieldErrors.correo && <p className="text-sm text-destructive">{fieldErrors.correo}</p>}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={status === "sending"}
                >
                  {status === "idle" && (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Recibir Catálogo
                    </>
                  )}
                  {status === "sending" && (
                    <>
                      <span className="mr-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                      Enviando...
                    </>
                  )}
                  {status === "success" && "✓ Solicitud enviada"}
                  {status === "error" && "✗ Error al enviar"}
                </Button>

                {status === "success" && (
                  <p className="text-sm text-center text-green-600" aria-live="polite">
                    ¡Listo! Te enviaremos el catálogo a tu correo.
                  </p>
                )}
                {status === "error" && (
                  <div className="space-y-2 text-center" aria-live="assertive">
                    <p className="text-sm text-destructive">{errorMessage || "Ocurrió un error. Intenta de nuevo."}</p>
                    <Button variant="outline" size="sm" type="button" onClick={handleRetry}>
                      Reintentar
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}