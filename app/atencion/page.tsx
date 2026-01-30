import Link from "next/link"
import { MessageCircle, Clock, ShieldCheck, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

const touchpoints = [
  {
    label: "WhatsApp prioritario",
    href: "https://wa.me/584120720344",
    icon: MessageCircle,
    desc: "Respuestas rápidas para pedidos y dudas técnicas.",
  },
  {
    label: "Telegram",
    href: "https://t.me/MRLLCA",
    icon: Send,
    desc: "Canal alternativo para consultas y pedidos.",
  },
  {
    label: "Llamada directa",
    href: "tel:+584120720344",
    icon: Phone,
    desc: "Coordina entregas o valida disponibilidad con un asesor.",
  },
]

export default function AtencionPage() {
  return (
    <main className="min-h-screen bg-background" role="main">
      <section className="py-20 border-b border-border/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">Atención continua</p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground tracking-tight">Siempre conectados contigo</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Escríbenos cuando necesites: soporte de pedidos, disponibilidad, seguimiento de envíos o cotizaciones al mayor.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3" data-aos="fade-up" data-aos-delay="100">
            {touchpoints.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  aria-label={`Abrir ${item.label}`}
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-card-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center" data-aos="fade-up" data-aos-delay="150">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Nuestro compromiso</h2>
              <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                <li className="flex items-start gap-3"><Clock className="h-5 w-5 text-primary mt-0.5" /> Ventanas extendidas de atención por WhatsApp.</li>
                <li className="flex items-start gap-3"><ShieldCheck className="h-5 w-5 text-primary mt-0.5" /> Respuestas claras sobre disponibilidad y garantías.</li>
                <li className="flex items-start gap-3"><MessageCircle className="h-5 w-5 text-primary mt-0.5" /> Seguimiento de pedidos y confirmación de despacho.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-semibold text-card-foreground">¿Hablamos ahora?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cuéntanos qué necesitas y un asesor te responde. Si es un pedido, agrega referencias y ciudad.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="https://wa.me/584120720344" target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" /> Escribir por WhatsApp
                  </Link>
                </Button>
                <Button asChild variant="outline">
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
