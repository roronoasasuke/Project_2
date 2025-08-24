import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { connectToDatabase } from '@/lib/db'
import { ViewEvent } from '@/models/ViewEvent'
import { Video } from '@/models/Video'

const seen = new Map<string, number>()

interface Params { params: { id: string } }

export async function POST(req: NextRequest, { params }: Params) {
	const ip = req.headers.get('x-forwarded-for') || 'ip'
	const key = `${params.id}:${ip}`
	const now = Date.now()
	const windowMs = 60_000
	const last = seen.get(key) || 0
	if (now - last < windowMs) {
		return NextResponse.json({ ok: true, idempotent: true })
	}
	seen.set(key, now)
	await connectToDatabase()
	await Video.updateOne({ _id: params.id }, { $inc: { views: 1 } })
	const ipHash = crypto.createHash('sha256').update(ip).digest('hex')
	await ViewEvent.create({ videoId: params.id, ts: new Date(), ipHash })
	return NextResponse.json({ ok: true })
}