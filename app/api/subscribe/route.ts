import { NextRequest, NextResponse } from 'next/server'
import { getAuthFromCookie } from '@/lib/jwt'
import { connectToDatabase } from '@/lib/db'
import { Subscription } from '@/models/Subscription'

export async function POST(req: NextRequest) {
	const auth = getAuthFromCookie()
	if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	await connectToDatabase()
	const { channelId } = await req.json()
	if (!channelId) return NextResponse.json({ error: 'Invalid' }, { status: 400 })
	await Subscription.updateOne(
		{ subscriberId: auth.userId, channelId },
		{ $setOnInsert: { subscriberId: auth.userId, channelId } },
		{ upsert: true }
	)
	return NextResponse.json({ subscribed: true })
}