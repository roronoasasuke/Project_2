import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { User } from '@/models/User'
import { signUpSchema } from '@/lib/validation'
import bcrypt from 'bcryptjs'
import { signAuthToken, setAuthCookie } from '@/lib/jwt'
import { rateLimit } from '@/lib/rateLimiter'

export async function POST(req: NextRequest) {
	const ip = req.headers.get('x-forwarded-for') || 'ip'
	if (!rateLimit({ key: `signup:${ip}`, limit: 10, windowMs: 60_000 })) {
		return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
	}
	const json = await req.json()
	const parsed = signUpSchema.safeParse(json)
	if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
	const { username, email, password } = parsed.data
	await connectToDatabase()
	const existing = await User.findOne({ $or: [{ username }, { email }] }).lean()
	if (existing) return NextResponse.json({ error: 'User exists' }, { status: 409 })
	const passwordHash = await bcrypt.hash(password, 10)
	const user = await User.create({ username, email, passwordHash })
	const token = signAuthToken({ userId: user._id.toString(), username, email })
	setAuthCookie(token)
	return NextResponse.json({ user: { id: user._id, username, email } })
}