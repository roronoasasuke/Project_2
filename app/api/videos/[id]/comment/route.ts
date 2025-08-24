import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Comment } from '@/models/Comment'
import { getAuthFromCookie } from '@/lib/jwt'

interface Params { params: { id: string } }

export async function GET(req: NextRequest, { params }: Params) {
	await connectToDatabase()
	const { searchParams } = new URL(req.url)
	const page = Number(searchParams.get('page') || '1')
	const limit = Number(searchParams.get('limit') || '20')
	const items = await Comment.find({ videoId: params.id })
		.sort({ createdAt: -1 })
		.skip((page - 1) * limit)
		.limit(limit)
		.lean()
	const total = await Comment.countDocuments({ videoId: params.id })
	return NextResponse.json({ items, page, limit, total })
}

export async function POST(req: NextRequest, { params }: Params) {
	const auth = getAuthFromCookie()
	if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	await connectToDatabase()
	const { text } = await req.json()
	if (!text || text.length < 1) return NextResponse.json({ error: 'Invalid' }, { status: 400 })
	const c = await Comment.create({ videoId: params.id, userId: auth.userId, text })
	return NextResponse.json({ comment: c })
}