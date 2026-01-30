"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { FileText, Package, Truck, ShieldCheck, CheckCircle2, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const highlights = [
  {
    icon: Package,
    title: "5,000+ ítems",
    text: "Catálogo amplio y actualizado con repuestos para las principales marcas de motos.",
  },
  {
    icon: Truck,
    title: "Cobertura nacional",
    text: "Envíos a todo el país con logística confiable para mayor y detal.",
  },
  {
    icon: ShieldCheck,
    title: "Calidad verificada",
    text: "Marcas homologadas y garantía directa con nosotros.",
  },
]

export default function CatalogoPage() {
  const [showWizard, setShowWizard] = useState(false)
  const [email, setEmail] = useState("")

  const openWizard = () => setShowWizard(true)
  const closeWizard = () => setShowWizard(false)

  const handleSendEmail = () => {
    if (!email) return
    const mailto = `mailto:multirepuestoslosllanos@hotmail.com?subject=Solicitud%20de%20cat%C3%A1logo&body=Correo:%20${encodeURIComponent(email)}%0A%0AIndica%20marca%2C%20modelo%20y%20a%C3%B1o%20de%20la%20moto%20para%20acelerar%20tu%20cotizaci%C3%B3n.`
    window.location.href = mailto
    setShowWizard(false)
  }

  return (
    <main className="min-h-screen bg-background" role="main">
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0">
          <Image
            src="/partes.jpg"
            alt="Repuestos y partes"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/55 to-background" aria-hidden="true" />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:py-28" data-aos="fade-up">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">Catálogo</p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground tracking-tight">Solicita el catálogo completo</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Pide el catálogo actualizado y recibe opciones de inventario, precios y referencias de las principales marcas.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="https://wa.me/584120720344" target="_blank" rel="noreferrer" aria-label="Abrir WhatsApp">
                  <MessageCircle className="mr-2 h-5 w-5" /> Pedir por WhatsApp
                </Link>
              </Button>
              <Button size="lg" variant="outline" type="button" onClick={openWizard}>
                <FileText className="mr-2 h-5 w-5" /> Solicitar por correo
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Respuesta rápida en horario laboral.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4" data-aos="fade-up" data-aos-delay="100">
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center" data-aos="fade-up" data-aos-delay="150">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">¿Qué recibes?</h2>
              <ul className="space-y-3 text-muted-foreground">
                {["PDF con referencias y marcas", "Disponibilidad y tiempos de entrega", "Opciones al mayor y al detal"].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm" data-aos="fade-up" data-aos-delay="200">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" aria-hidden="true" />
              <div className="relative p-8 space-y-4">
                <h3 className="text-xl font-semibold text-card-foreground">¿Listo para recibirlo?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Escríbenos y te enviamos el catálogo actualizado. Si necesitas algo específico, incluye marca, modelo y año de la moto.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="https://wa.me/584120720344" target="_blank" rel="noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" /> Ir a WhatsApp
                    </Link>
                  </Button>
                  <Button variant="outline" type="button" onClick={openWizard}>
                    Pedir por correo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showWizard ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl" data-aos="fade-up">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Catálogo por correo</p>
                <h2 className="mt-2 text-xl font-bold text-card-foreground">Déjanos tu correo</h2>
                <p className="text-sm text-muted-foreground mt-1">Te enviaremos el PDF actualizado y opciones de disponibilidad.</p>
              </div>
              <button
                type="button"
                onClick={closeWizard}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:text-foreground hover:border-primary/60"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <Label htmlFor="catalogo-email">Correo electrónico</Label>
              <Input
                id="catalogo-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
              <p className="text-xs text-muted-foreground">Recibirás un correo con nuestro catálogo entre 2-5 minutos.</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button variant="outline" type="button" onClick={closeWizard}>
                Cancelar
              </Button>
              <Button type="button" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleSendEmail} disabled={!email}>
                Enviar solicitud
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
