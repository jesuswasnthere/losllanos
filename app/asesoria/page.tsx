'use client'

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { Mail, Facebook, Instagram, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type FormStatus = "idle" | "sending" | "success" | "error"

export default function AsesoriaPage() {
  const [showWizard, setShowWizard] = useState(false)
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({ correo: "", mensaje: "" })

  const contactChannels = [
    {
      label: "Telegram",
      href: "https://t.me/MRLLCA",
      icon: Send,
      description: "Atencion directa para dudas y pedidos",
      color: "text-primary",
      type: "link" as const,
    },
    {
      label: "Correo",
      icon: Mail,
      description: "Envia un mensaje detallado sin salir de la pagina",
      color: "text-primary",
      type: "wizard" as const,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/multirepuestoslosllanosca",
      icon: Facebook,
      description: "Siguenos para novedades y ofertas",
      color: "text-primary",
      type: "link" as const,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/multirepuestoslosllanos?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      icon: Instagram,
      description: "Escribenos por DM para asesoria",
      color: "text-primary",
      type: "link" as const,
    },
  ]

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

  const validateField = (name: "correo" | "mensaje", value: string) => {
    if (name === "correo") {
      if (!value.trim()) return "El correo es requerido."
      if (value.trim().length > 120) return "Maximo 120 caracteres."
      if (!emailRegex.test(value.trim())) return "Ingresa un correo valido."
    }
    if (name === "mensaje") {
      if (!value.trim()) return "El mensaje es requerido."
      if (value.trim().length < 10) return "Minimo 10 caracteres."
      if (value.trim().length > 1500) return "Maximo 1500 caracteres."
    }
    return ""
  }

  const handleFieldChange = (name: "correo" | "mensaje", value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    const validationMessage = validateField(name, value)
    setFieldErrors((prev) => {
      const next = { ...prev }
      if (validationMessage) next[name] = validationMessage
      else delete next[name]
      return next
    })
  }

  const resetWizard = () => {
    setStatus("idle")
    setErrorMessage("")
    setFieldErrors({})
  }

  const openWizard = () => {
    resetWizard()
    setShowWizard(true)
  }

  const closeWizard = () => {
    setShowWizard(false)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setStatus("sending")
    setErrorMessage("")
    setFieldErrors({})

    const localErrors: Record<string, string> = {}
    ;(["correo", "mensaje"] as const).forEach((key) => {
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
      const response = await fetch("/api/message", {
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
      setFormData({ correo: "", mensaje: "" })
      setTimeout(() => {
        closeWizard()
        setStatus("idle")
      }, 1800)
    } catch (error) {
      console.error("asesoria_message_error", error)
      setStatus("error")
      setErrorMessage("No pudimos enviar tu mensaje. Intenta nuevamente.")
    }
  }

  return (
    <main className="min-h-screen bg-background" role="main">
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">Asesoria Personalizada</p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground tracking-tight">¿Tienes alguna duda?</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Cuentanos tu caso y te guiamos para conseguir el repuesto correcto o cerrar tu pedido al mayor o al detal.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2" data-aos="fade-up" data-aos-delay="100">
            {contactChannels.map((channel) => {
              const Icon = channel.icon
              const cardContent = (
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className={`h-5 w-5 ${channel.color}`} />
                  </span>
                  <div className="space-y-1 text-left">
                    <p className="text-base font-semibold text-card-foreground">{channel.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{channel.description}</p>
                  </div>
                </div>
              )

              if (channel.type === "wizard") {
                return (
                  <button
                    key={channel.label}
                    type="button"
                    onClick={openWizard}
                    className="text-left"
                    aria-label={`Abrir ${channel.label}`}
                  >
                    {cardContent}
                  </button>
                )
              }

              return (
                <Link
                  key={channel.label}
                  href={channel.href as string}
                  target={(channel.href as string).startsWith("http") ? "_blank" : undefined}
                  rel={(channel.href as string).startsWith("http") ? "noreferrer" : undefined}
                  aria-label={`Abrir ${channel.label}`}
                >
                  {cardContent}
                </Link>
              )
            })}
          </div>

          <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="150">
            <p className="text-lg font-semibold text-foreground mb-3">¿Prefieres escribirnos directo?</p>
            <Button asChild size="lg" className="px-6 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="https://t.me/MRLLCA" target="_blank" rel="noreferrer">
                <Send className="mr-2 h-5 w-5" /> Ir a Telegram
              </Link>
            </Button>
            <p className="mt-2 text-sm text-muted-foreground">Respondemos rapido en horario laboral.</p>
          </div>
        </div>
      </section>

      {showWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-xl">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">Correo</p>
                <h2 className="text-2xl font-bold text-foreground mt-2">Envianos tu caso</h2>
                <p className="text-sm text-muted-foreground mt-1">Te responderemos por correo y, si lo prefieres, seguimos por Telegram.</p>
              </div>
              <Button variant="ghost" size="icon" onClick={closeWizard} aria-label="Cerrar">
                ×
              </Button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground" htmlFor="correo">
                  Correo
                </label>
                <Input
                  id="correo"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.correo}
                  onChange={(e) => handleFieldChange("correo", e.target.value)}
                  aria-invalid={Boolean(fieldErrors.correo)}
                />
                {fieldErrors.correo && <p className="text-sm text-destructive">{fieldErrors.correo}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground" htmlFor="mensaje">
                  Mensaje
                </label>
                <Textarea
                  id="mensaje"
                  rows={5}
                  placeholder="Cuentanos que necesitas: repuesto, modelo, cantidad, ciudad, etc."
                  value={formData.mensaje}
                  onChange={(e) => handleFieldChange("mensaje", e.target.value)}
                  aria-invalid={Boolean(fieldErrors.mensaje)}
                />
                {fieldErrors.mensaje && <p className="text-sm text-destructive">{fieldErrors.mensaje}</p>}
              </div>

              {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
              {status === "success" && <p className="text-sm text-green-600">Mensaje enviado. Te contactaremos pronto.</p>}

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="ghost" type="button" onClick={closeWizard}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={status === "sending"} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {status === "sending" ? "Enviando..." : "Enviar mensaje"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
