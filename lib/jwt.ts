import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export interface AuthTokenPayload {
	userId: string
	username: string
	email: string
}

export function signAuthToken(payload: AuthTokenPayload): string {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyAuthToken(token: string): AuthTokenPayload | null {
	try {
		return jwt.verify(token, JWT_SECRET) as AuthTokenPayload
	} catch {
		return null
	}
}

export function setAuthCookie(token: string) {
	cookies().set('sb_token', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 7
	})
}

export function clearAuthCookie() {
	cookies().set('sb_token', '', { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 0 })
}

export function getAuthFromCookie(): AuthTokenPayload | null {
	const token = cookies().get('sb_token')?.value
	if (!token) return null
	return verifyAuthToken(token)
}