import * as React from "react"

interface EmailTemplateProps {
  firstName: string
}

export function EmailTemplate({ firstName }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#111" }}>
      <p style={{ fontWeight: 700, fontSize: 16 }}>Hola {firstName},</p>
      <p>Este es un correo de prueba enviado desde Resend.</p>
      <p style={{ marginTop: 16, color: "#555" }}>Si ves este mensaje, el envío funciona.</p>
    </div>
  )
}
