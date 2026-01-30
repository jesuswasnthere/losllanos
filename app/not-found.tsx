import Link from "next/link"
import { AlertCircle, Home, Info, Phone, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="max-w-xl rounded-2xl border border-border bg-card/80 p-10 shadow-lg">
        <div className="mb-6 flex items-center gap-3 text-primary">
          <AlertCircle className="h-7 w-7" />
          <p className="text-sm font-semibold uppercase tracking-wide">Error 404</p>
        </div>
        <h1 className="mb-3 text-3xl font-bold text-foreground">Página no encontrada</h1>
        <p className="mb-8 text-muted-foreground">
          Lo sentimos, la ruta que intentas visitar no existe. Puedes volver al inicio o navegar a una de nuestras
          secciones principales.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/">
            <Button className="w-full" variant="default">
              <Home className="mr-2 h-4 w-4" /> Volver al inicio
            </Button>
          </Link>
          <Link href="/#servicios">
            <Button className="w-full" variant="outline">
              <Wrench className="mr-2 h-4 w-4" /> Servicios
            </Button>
          </Link>
          <Link href="/nosotros">
            <Button className="w-full" variant="ghost">
              <Info className="mr-2 h-4 w-4" /> Sobre nosotros
            </Button>
          </Link>
          <Link href="/#contacto">
            <Button className="w-full" variant="secondary">
              <Phone className="mr-2 h-4 w-4" /> Contacto
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
