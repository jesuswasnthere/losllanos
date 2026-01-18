"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Columna 1 - Empresa */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Multi Repuestos los Llanos C.A.</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Líderes en distribución de repuestos de motocicletas a nivel nacional.
              </p>
            </div>

            {/* Columna 2 - Enlaces */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Enlaces</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary visited:text-muted-foreground transition-colors"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#nosotros"
                    className="text-muted-foreground hover:text-primary visited:text-muted-foreground transition-colors"
                  >
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#servicios"
                    className="text-muted-foreground hover:text-primary visited:text-muted-foreground transition-colors"
                  >
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contacto"
                    className="text-muted-foreground hover:text-primary visited:text-muted-foreground transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 3 - Servicios */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Servicios</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Repuestos Originales</li>
                <li>Distribución Nacional</li>
                <li>Asesoría Técnica</li>
                <li>Garantía de Calidad</li>
              </ul>
            </div>

            {/* Columna 4 - Contacto */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Contacto</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+58 414 5341339</li>
                <li>multirepuestoslosllanos@hotmail.com</li>
                <li>Acarigua, Sector Campo Lindo</li>
                <li>Portuguesa, Venezuela</li>
                <li>RIF: J-405043709</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Multi Repuestos los Llanos C.A. Todos los derechos reservados.
            </p>
            <p className="text-center text-sm text-muted-foreground">RIF: J-405043709</p>
          </div>
        </div>
      </div>
    </footer>
  )
}