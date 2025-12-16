"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-muted via-background to-muted">
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,oklch(0.85_0_0)_1px,transparent_1px)] bg-size-[40px_40px] opacity-20" />

      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Etiqueta superior */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Distribución Nacional
          </div>

          {/* Título principal */}
          <h1 className="font-sans text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            Multi Repuestos los Llanos C.A.
          </h1>

          {/* Subtítulo */}
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl text-pretty">
            Líderes en la distribución de repuestos de motos a nivel nacional. Calidad garantizada, experiencia
            comprobada y compromiso total con nuestros clientes.
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6"
              onClick={() => {
                document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Contáctanos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 text-base px-8 py-6 bg-transparent"
              onClick={() => {
                document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Nuestros Servicios
            </Button>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-3 gap-8 pt-12 mx-auto max-w-3xl border-t border-border mt-16">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Años de Experiencia</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">5000+</div>
              <div className="text-sm text-muted-foreground">Productos Disponibles</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Cobertura Nacional</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}