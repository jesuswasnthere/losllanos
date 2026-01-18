import { NextResponse } from "next/server"

export async function GET() {
  try {
    const version = process.env.npm_package_version ?? "0.1.0"
    const environment = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development"

    return NextResponse.json(
      {
        status: "ok",
        version,
        environment,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(JSON.stringify({ event: "health_error", error }))
    return NextResponse.json(
      {
        status: "error",
        message: "Health check falló",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    )
  }
}
