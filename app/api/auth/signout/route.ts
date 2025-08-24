import { NextResponse } from 'next/server'
import { clearAuthCookie } from '@/lib/jwt'

export async function POST() {
	clearAuthCookie()
	return NextResponse.json({ ok: true })
}