import Link from "next/link"
import Image from "next/image"
import { Truck, MapPin, Package, Clock, MessageCircle, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

const coverages = [
  { label: "Llanos y Centro", detail: "Rutas directas y entregas rápidas" },
  { label: "Andes", detail: "Coordinamos despachos con aliados locales" },
  { label: "Oriente", detail: "Frecuencias semanales para mayor y detal" },
  { label: "Occidente", detail: "Entrega rápida a principales ciudades" },
]

export default function DistribucionPage() {
  return (
    <main className="min-h-screen bg-background" role="main">
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0">
          <Image
            src="/venezuela_map.png"
            alt="Bandera de Venezuela difuminada"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-linear-to-b from-background/70 via-background/45 to-background" aria-hidden="true" />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:py-26" data-aos="fade-up">
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">Distribución Nacional</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">Llevamos tu pedido a todo el país</h1>
            <p className="text-lg text-muted-foreground">
              Rutas frecuentes, aliados logísticos y seguimiento personalizado para que tus repuestos lleguen seguros y a tiempo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="https://wa.me/584120720344" target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" /> Coordinar envío
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="tel:+584120720344">
                  <Phone className="mr-2 h-5 w-5" /> Llamar ahora
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="https://t.me/MRLLCA" target="_blank" rel="noreferrer">
                  <Send className="mr-2 h-5 w-5" /> Telegram
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4" data-aos="fade-up" data-aos-delay="100">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-start">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Cobertura y tiempos</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {coverages.map((item) => (
                  <div key={item.label} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </span>
                      <div>
                        <p className="text-base font-semibold text-card-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">Modalidades</h3>
                <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                  <li className="flex items-start gap-3"><Package className="h-5 w-5 text-primary mt-0.5" /> Envíos asegurados y embalaje reforzado.</li>
                  <li className="flex items-start gap-3"><Clock className="h-5 w-5 text-primary mt-0.5" /> Despachos programados y urgentes bajo coordinación.</li>
                  <li className="flex items-start gap-3"><MapPin className="h-5 w-5 text-primary mt-0.5" /> Retiro en aliados logísticos por ciudad.</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4" data-aos="fade-up" data-aos-delay="150">
              <h3 className="text-xl font-semibold text-card-foreground">¿Listo para despachar?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Comparte tu dirección, cantidad de bultos o referencias y coordinamos el envío más rápido disponible.
              </p>
              <div className="flex flex-col gap-3">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="https://wa.me/584120720344" target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" /> Escribir por WhatsApp
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="tel:+584120720344">Llamar a logística</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="https://t.me/MRLLCA" target="_blank" rel="noreferrer">
                    <Send className="mr-2 h-5 w-5" /> Telegram
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
