"use client"

import Image from "next/image"
import Link from "next/link"

const featuredProducts = [
  {
    image: "/kit.jpg",
    brand: "Gates",
    title: "Kit de Correa Completo",
    ref: "Partes para motos 125-250cc",
    description: "Incluye tensor y rodamientos listos para instalar.",
  },
  {
    image: "/amortiguador.jpg",
    brand: "Kyb",
    title: "Amortiguador Delantero",
    ref: "Aplicación universal",
    description: "Recupera la estabilidad y confort de tu moto.",
  },
  {
    image: "/embobinado.jpg",
    brand: "Genérico",
    title: "Embobinado",
    ref: "Sistemas 12V",
    description: "Bobinado de alta durabilidad para carga estable.",
  },
  {
    image: "/rin.jpg",
    brand: "Replica OEM",
    title: "Rin Deportivo 17\"",
    ref: "Aleación ligera",
    description: "Acabado reforzado para rodadas exigentes.",
  },
  {
    image: "/partesvarias.jpg",
    brand: "Multi Repuestos",
    title: "Partes Varias Premium",
    ref: "Línea universal",
    description: "Accesorios y consumibles listos para despacho.",
  },
  {
    image: "/rodaje.jpg",
    brand: "Seal Master",
    title: "Rodaje de Motor",
    ref: "Juego completo",
    description: "Ajuste preciso para prolongar la vida del motor.",
  },
]

export function FeaturedProductsSection() {
  return (
    <section id="destacados" className="bg-neutral-900/70 py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 pb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary/80">Productos destacados</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Repuestos que no fallan</h2>
          </div>
          <Link
            href="/catalogo"
            className="hidden sm:inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/90"
            aria-label="Ver más productos del catálogo"
          >
            Ver más
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <article
              key={product.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/60 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="relative h-56 w-full overflow-hidden bg-black">
                <Image
                  src={product.image}
                  alt={`${product.title} ${product.brand}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain transition duration-500 group-hover:scale-105"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/40" aria-hidden="true" />
              </div>

              <div className="space-y-2 p-6 text-white">
                <p className="text-sm font-semibold text-primary">{product.brand}</p>
                <h3 className="text-xl font-semibold leading-tight">{product.title}</h3>
                <p className="text-sm text-white/70">{product.ref}</p>
                <p className="text-sm text-white/70">{product.description}</p>
              </div>

              <div className="flex items-center justify-between px-6 pb-6 text-sm text-primary/90">
                <span className="font-semibold">Disponibles para despacho nacional</span>
                <Link
                  href="/catalogo"
                  aria-label="Ver más productos del catálogo"
                  className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 text-primary/90 transition-colors group-hover:border-primary group-hover:text-primary"
                >
                  →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link href="/catalogo" className="inline-flex items-center gap-2 text-primary font-semibold" aria-label="Ver más productos en el catálogo">
            Ver más
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
