"use client"

import Link from "next/link"
import { Package, Truck, Headset, ShieldCheck, Zap, Clock } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function ServicesSection() {
  const services = [
    {
      icon: Package,
      title: "Amplio Catálogo",
      description: "Más de 5,000 referencias de repuestos para todas las marcas y modelos de motocicletas del mercado.",
    },
    {
      icon: Truck,
      title: "Distribución Nacional",
      description: "Entregas a todo el país con nuestra red logística eficiente y confiable.",
    },
    {
      icon: Headset,
      title: "Asesoría Especializada",
      description: "Equipo técnico capacitado para ayudarte a encontrar el repuesto exacto que necesitas.",
    },
    {
      icon: ShieldCheck,
      title: "Garantía de Calidad",
      description: "Todos nuestros productos cuentan con garantía y certificación de calidad.",
    },
    {
      icon: Zap,
      title: "Disponibilidad Inmediata",
      description: "Stock permanente de los repuestos más demandados para entrega inmediata.",
    },
    {
      icon: Clock,
      title: "Atención Continua",
      description: "Servicio al cliente disponible para atender tus consultas y pedidos de manera ágil, a toda hora en todas nuestras redes sociales y WhatsApp.",
    },
  ]

  return (
    <section id="servicios" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Encabezado de sección */}
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">Nuestros Servicios</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Soluciones integrales para todas tus necesidades de repuestos de motocicletas, con atención dedicada a
              compras al mayor y al detal
            </p>
          </div>

          {/* Grid de servicios */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card
                  key={index}
                  className="group transition-all hover:shadow-lg hover:border-primary/50 hover:-translate-y-1"
                >
                  <CardHeader className="space-y-4">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-xl text-card-foreground">{service.title}</CardTitle>
                      <CardDescription className="leading-relaxed">{service.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>

          {/* Llamado a la acción adicional */}
          <div className="mt-16 text-center">
            <p className="text-lg text-muted-foreground mb-6">¿Necesitas más información sobre nuestros servicios?</p>
            <Link
              href="/#contacto"
              aria-label="Ir a la sección de contacto"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 visited:text-primary-foreground"
            >
              Contáctanos Ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}