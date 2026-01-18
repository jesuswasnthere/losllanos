import type React from "react"

import { cn } from "@/lib/utils"

export type LoadingVariant = "spinner" | "button" | "page"

interface LoadingProps {
  variant?: LoadingVariant
  label?: string
  className?: string
}

export function Loading({ variant = "spinner", label = "Cargando...", className }: LoadingProps) {
  if (variant === "button") {
    return (
      <span className={cn("inline-flex items-center gap-2 text-sm text-foreground", className)}>
        <Spinner className="h-4 w-4" />
        {label}
      </span>
    )
  }

  if (variant === "page") {
    return (
      <div className={cn("flex min-h-[60vh] items-center justify-center", className)}>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card/70 px-5 py-4 shadow-sm">
          <Spinner className="h-5 w-5" />
          <span className="text-foreground font-medium">{label}</span>
        </div>
      </div>
    )
  }

  return <Spinner className={cn("h-5 w-5 text-primary", className)} />
}

interface SpinnerProps {
  className?: string
}

function Spinner({ className }: SpinnerProps) {
  return (
    <span
      aria-label="Cargando"
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-primary/30 border-t-primary",
        className
      )}
    />
  )
}
