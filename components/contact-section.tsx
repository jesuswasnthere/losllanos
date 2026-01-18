"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

type FormStatus = "idle" | "sending" | "success" | "error"

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  })

  const validateField = (name: "nombre" | "correo" | "mensaje", value: string) => {
    if (name === "nombre") {
      if (!value.trim()) return "El nombre es requerido."
      if (value.trim().length < 2 || value.trim().length > 80) return "Debe tener entre 2 y 80 caracteres."
    }
    if (name === "correo") {
      if (!value.trim()) return "El correo es requerido."
      if (value.trim().length > 120) return "Máximo 120 caracteres."
      if (!emailRegex.test(value.trim())) return "Ingresa un correo válido."
    }
    if (name === "mensaje") {
      if (!value.trim()) return "El mensaje es requerido."
      if (value.trim().length < 10 || value.trim().length > 1000) return "Debe tener entre 10 y 1000 caracteres."
    }
    return ""
  }

  const handleChange = (name: "nombre" | "correo" | "mensaje", value: string) => {
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
    ;(Object.keys(formData) as Array<"nombre" | "correo" | "mensaje">).forEach((key) => {
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
      setFormData({ nombre: "", correo: "", mensaje: "" })
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
    <section id="contacto" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Encabezado de sección */}
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">Contáctanos</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Estamos aquí para atenderte. Envíanos tu consulta y te responderemos a la brevedad
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
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Teléfono</h4>
                    <p className="text-muted-foreground">+58 412 5249992</p>
                    <p className="text-muted-foreground">+58 414 5341339</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Dirección</h4>
                    <p className="text-muted-foreground">
                      Acarigua, Sector Campo Lindo
                      <br />
                      Portuguesa, Venezuela
                    </p>
                  </div>
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-foreground">
                    Nombre Completo
                  </Label>
                  <Input
                    id="nombre"
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    className="bg-card"
                    aria-invalid={Boolean(fieldErrors.nombre)}
                    required
                  />
                  {fieldErrors.nombre && <p className="text-sm text-destructive">{fieldErrors.nombre}</p>}
                </div>

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

                <div className="space-y-2">
                  <Label htmlFor="mensaje" className="text-foreground">
                    Mensaje
                  </Label>
                  <Textarea
                    id="mensaje"
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    value={formData.mensaje}
                    onChange={(e) => handleChange("mensaje", e.target.value)}
                    className="min-h-37.5 bg-card resize-none"
                    aria-invalid={Boolean(fieldErrors.mensaje)}
                    required
                  />
                  {fieldErrors.mensaje && <p className="text-sm text-destructive">{fieldErrors.mensaje}</p>}
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
                      Enviar Mensaje
                    </>
                  )}
                  {status === "sending" && (
                    <>
                      <span className="mr-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                      Enviando...
                    </>
                  )}
                  {status === "success" && "✓ Mensaje Enviado"}
                  {status === "error" && "✗ Error al Enviar"}
                </Button>

                {status === "success" && (
                  <p className="text-sm text-center text-green-600" aria-live="polite">
                    ¡Gracias por contactarnos! Te responderemos pronto.
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