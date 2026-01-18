import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const smtpFrom = process.env.SMTP_FROM || "Acme <onboarding@resend.dev>"
const testTo = "jm17.org@gmail.com"

export async function POST() {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 })
  }

  try {
    const { data, error } = await resend.emails.send({
      from: smtpFrom,
      to: [testTo],
      subject: "Hola de prueba",
      text: "Hola",
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ ok: true, id: data?.id })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
