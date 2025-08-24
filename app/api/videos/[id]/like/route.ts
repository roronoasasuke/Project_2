import { NextRequest, NextResponse } from 'next/server'
import { getAuthFromCookie } from '@/lib/jwt'
import { connectToDatabase } from '@/lib/db'
import { Like } from '@/models/Like'
import { Video } from '@/models/Video'

interface Params { params: { id: string } }

export async function POST(_req: NextRequest, { params }: Params) {
	const auth = getAuthFromCookie()
	if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	await connectToDatabase()
	const existing = await Like.findOne({ videoId: params.id, userId: auth.userId })
	if (existing) {
		await Like.deleteOne({ _id: existing._id })
		await Video.updateOne({ _id: params.id }, { $inc: { likes: -1 } })
		return NextResponse.json({ liked: false })
	} else {
		await Like.create({ videoId: params.id, userId: auth.userId })
		await Video.updateOne({ _id: params.id }, { $inc: { likes: 1 } })
		return NextResponse.json({ liked: true })
	}
}