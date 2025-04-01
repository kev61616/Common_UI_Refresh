import { NextResponse } from 'next/server'

// Set explicitly to static generation for static export compatibility
export const dynamic = 'force-static'

// Pre-generate a fixed timestamp for static build
const STATIC_TIMESTAMP = new Date().toISOString();
 
export async function GET() {
  // For static export, we need to return a fixed response
  return NextResponse.json({ 
    message: 'Hello from Next.js 15.2.3!', 
    time: STATIC_TIMESTAMP,
    note: 'This is a statically generated API response'
  })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    return NextResponse.json({ received: data, success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON', success: false }, { status: 400 })
  }
}
