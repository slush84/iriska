/**
 * Vercel Flags discovery endpoint.
 *
 * Allows Vercel Flags Toolkit Chrome extension to discover and override
 * flags during local development. Production access protected by FLAGS_SECRET.
 *
 * Setup: install Vercel Flags Toolkit Chrome extension from Chrome Web Store.
 * Then visit any /en/* page and click extension icon — flags will appear.
 *
 * https://flags-sdk.dev/concepts/flags-explorer
 */

import { verifyAccess, type ApiData } from 'flags'
import { getProviderData } from 'flags/next'
import { NextResponse, type NextRequest } from 'next/server'
import * as flags from '@/lib/flags'

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get('Authorization'))
  if (!access) {
    return NextResponse.json(null, { status: 401 })
  }

  const apiData = await getProviderData(flags)

  return NextResponse.json<ApiData>(apiData)
}