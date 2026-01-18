"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("app_error_boundary", error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="max-w-lg rounded-2xl border border-border bg-card/80 p-10 shadow-lg">
        <div className="mb-6 flex items-center gap-3 text-destructive">
          <AlertTriangle className="h-7 w-7" />
          <p className="text-sm font-semibold uppercase tracking-wide">Ha ocurrido un error</p>
        </div>
        <h1 className="mb-3 text-3xl font-bold text-foreground">Algo salió mal</h1>
        <p className="mb-8 text-muted-foreground">
          Tuvimos un problema al cargar esta página. Intenta de nuevo. Si el error persiste, contacta a soporte.
        </p>
        <Button onClick={reset} className="w-full" variant="default">
          <RefreshCw className="mr-2 h-4 w-4" /> Intentar de nuevo
        </Button>
      </div>
    </div>
  )
}
