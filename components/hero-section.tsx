"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/fondo_los_llanos.webp"
          alt="Moto y repuestos de fondo"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/75" aria-hidden="true" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Etiqueta superior */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Distribución Nacional
          </div>

          {/* Título principal */}
          <h1 className="font-sans text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl text-balance">
            Multi Repuestos los Llanos C.A.
          </h1>

          {/* Subtítulo */}
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl text-pretty">
            Líderes en la distribución de repuestos y accesorios de motos a nivel nacional. Calidad garantizada, experiencia
            comprobada y compromiso total con nuestros clientes, con atención tanto al mayor como al detal.
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6" aria-label="Ir a contacto">
              <Link href="/#contacto">Contáctanos</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 text-base px-8 py-6 bg-transparent text-white border-white hover:bg-white/10"
              aria-label="Ver servicios"
            >
              <Link href="/#servicios">Nuestros Servicios</Link>
            </Button>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-3 gap-8 pt-12 mx-auto max-w-3xl border-t border-white/20 mt-16 text-white">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">11+</div>
              <div className="text-sm text-white/80">Años de Experiencia</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">5000+</div>
              <div className="text-sm text-white/80">Productos Disponibles</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-white/80">Cobertura Nacional</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}