import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // Make this endpoint always dynamic
 
export async function GET() {
  // Route handlers are a server-side API feature introduced in App Router
  return NextResponse.json({ message: 'Hello from Next.js 15.2.3!', time: new Date().toISOString() })
}

export async function POST(request: Request) {
  const data = await request.json()
  return NextResponse.json({ received: data, success: true })
}
