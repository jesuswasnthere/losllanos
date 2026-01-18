import { NextResponse } from "next/server"
import { Resend } from "resend"
import { EmailTemplate } from "@/components/email-template"

const resend = new Resend(process.env.RESEND_API_KEY)
const smtpFrom = process.env.SMTP_FROM || "Acme <onboarding@resend.dev>"
const testTo = process.env.CONTACT_EMAIL || "delivered@resend.dev"

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: smtpFrom,
      to: [testTo],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
