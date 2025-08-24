import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { User } from '@/models/User'
import { signInSchema } from '@/lib/validation'
import bcrypt from 'bcryptjs'
import { signAuthToken, setAuthCookie } from '@/lib/jwt'
import { rateLimit } from '@/lib/rateLimiter'

export async function POST(req: NextRequest) {
	const ip = req.headers.get('x-forwarded-for') || 'ip'
	if (!rateLimit({ key: `signin:${ip}`, limit: 20, windowMs: 60_000 })) {
		return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
	}
	const json = await req.json()
	const parsed = signInSchema.safeParse(json)
	if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
	const { identifier, password } = parsed.data
	await connectToDatabase()
	const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] })
	if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
	const ok = await bcrypt.compare(password, user.passwordHash)
	if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
	const token = signAuthToken({ userId: user._id.toString(), username: user.username, email: user.email })
	setAuthCookie(token)
	return NextResponse.json({ user: { id: user._id, username: user.username, email: user.email } })
}