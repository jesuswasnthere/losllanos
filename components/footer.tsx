"use client"

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
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById("nosotros")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Sobre Nosotros
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Servicios
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contacto
                  </button>
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
                <li>+58 (212) 555-0123</li>
                <li>contacto@multirepuestoslosllanos.com</li>
                <li>Zona Industrial Los Llanos</li>
                <li>Caracas, Venezuela</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Multi Repuestos los Llanos C.A. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}