import { Building2, Target, Award, Users } from "lucide-react"

export function AboutSection() {
  return (
    <section id="nosotros" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Encabezado de sección */}
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">Sobre Nosotros</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Más de una década comprometidos con la excelencia en el sector de repuestos automotrices
            </p>
          </div>

          {/* Contenido principal */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Texto descriptivo */}
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-foreground">
                <span className="font-semibold text-primary">Multi Repuestos los Llanos C.A.</span> es una empresa
                venezolana multimarca con más de 11 años de experiencia en el mercado de distribución de repuestos para
                motocicletas. Nos hemos consolidado como uno de los líderes del sector gracias a nuestro compromiso
                inquebrantable con la calidad y el servicio al cliente.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                <span className="font-semibold text-primary">Visión:</span>
                 Mantener el liderazgo de MULTI REPUESTOS LOS LLANOS C.A en el mercado nacional e internacional, como
                una Empresa altamente competitiva, confiable, con el mejor crecimiento y ofreciendo sus productos con
                los mayores estándares de calidad a nivel nacional  y mundial.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                <span className="font-semibold text-primary">Misión:</span>
                Somos una empresa dedicada a la distribución y comercialización de repuestos - accesorios para
                motocicletas con amplia gama de las mejores marcas del mercado a nivel nacional y mundial.
              </p>
            </div>

            {/* Tarjetas de valores */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">Experiencia</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Más de 10 años en el mercado respaldan nuestra trayectoria y conocimiento del sector.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">Alcance Nacional</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Red de distribución que abarca todo el territorio venezolano con entregas eficientes.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">Calidad Garantizada</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Productos de las mejores marcas con garantía y respaldo técnico especializado.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">Compromiso</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Dedicados a superar las expectativas de nuestros clientes en cada operación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}