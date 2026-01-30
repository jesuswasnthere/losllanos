import Link from "next/link"
import { Mail, MessageCircle, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

const contactChannels = [
  {
    label: "WhatsApp",
    href: "https://wa.me/584120720344",
    icon: MessageCircle,
    description: "Atención directa para dudas y pedidos",
    color: "text-primary",
  },
  {
    label: "Correo",
    href: "mailto:multirepuestoslosllanos@hotmail.com",
    icon: Mail,
    description: "Envíanos los detalles de lo que necesitas",
    color: "text-primary",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/multirepuestoslosllanosca",
    icon: Facebook,
    description: "Síguenos para novedades y ofertas",
    color: "text-primary",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/multirepuestoslosllanos?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: Instagram,
    description: "Escríbenos por DM para asesoría",
    color: "text-primary",
  },
]

export default function AsesoriaPage() {
  return (
    <main className="min-h-screen bg-background" role="main">
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">Asesoría Personalizada</p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground tracking-tight">¿Tienes alguna duda?</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Cuéntanos tu caso y te guiamos para conseguir el repuesto correcto o cerrar tu pedido al mayor o al detal.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2" data-aos="fade-up" data-aos-delay="100">
            {contactChannels.map((channel) => {
              const Icon = channel.icon
              return (
                <Link
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  aria-label={`Abrir ${channel.label}`}
                >
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className={`h-5 w-5 ${channel.color}`} />
                  </span>
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-card-foreground">{channel.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{channel.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="150">
            <p className="text-lg font-semibold text-foreground mb-3">¿Prefieres escribirnos directo?</p>
            <Button asChild size="lg" className="px-6 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="https://wa.me/584120720344" target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> Ir al WhatsApp
              </Link>
            </Button>
            <p className="mt-2 text-sm text-muted-foreground">Respondemos rápido en horario laboral.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
