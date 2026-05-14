import { createHash } from 'crypto'
import { NextResponse } from 'next/server'

function fp(v: string | undefined) {
  if (!v) return { present: false }
  return {
    present: true,
    len: v.length,
    head: v.slice(0, 4),
    tail: v.slice(-4),
    sha256: createHash('sha256').update(v).digest('hex').slice(0, 12),
  }
}

export async function GET() {
  return NextResponse.json({
    SUPABASE_SERVICE_ROLE_KEY: fp(process.env.SUPABASE_SERVICE_ROLE_KEY),
    FLAGS_SECRET: fp(process.env.FLAGS_SECRET),
    ANTHROPIC_API_KEY: fp(process.env.ANTHROPIC_API_KEY),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: fp(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  })
}