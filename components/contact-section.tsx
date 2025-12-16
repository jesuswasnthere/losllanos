"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulación de envío
    if (formData.nombre && formData.correo && formData.mensaje) {
      setFormState("success")
      setTimeout(() => {
        setFormState("idle")
        setFormData({ nombre: "", correo: "", mensaje: "" })
      }, 3000)
    } else {
      setFormState("error")
      setTimeout(() => setFormState("idle"), 3000)
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
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="bg-card"
                    required
                  />
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
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    className="bg-card"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje" className="text-foreground">
                    Mensaje
                  </Label>
                  <Textarea
                    id="mensaje"
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="min-h-37.5 bg-card resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={formState !== "idle"}
                >
                  {formState === "idle" && (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Enviar Mensaje
                    </>
                  )}
                  {formState === "success" && "✓ Mensaje Enviado"}
                  {formState === "error" && "✗ Error al Enviar"}
                </Button>

                {formState === "success" && (
                  <p className="text-sm text-center text-green-600">
                    ¡Gracias por contactarnos! Te responderemos pronto.
                  </p>
                )}
                {formState === "error" && (
                  <p className="text-sm text-center text-destructive">
                    Por favor completa todos los campos del formulario.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}