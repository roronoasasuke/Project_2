import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Video } from '@/models/Video'
import { searchQuerySchema } from '@/lib/validation'

export async function GET(req: NextRequest) {
	await connectToDatabase()
	const { searchParams } = new URL(req.url)
	const parsed = searchQuerySchema.safeParse({
		q: searchParams.get('q') || undefined,
		tag: searchParams.get('tag') || undefined,
		sort: searchParams.get('sort') || undefined,
		page: Number(searchParams.get('page') || '1'),
		limit: Number(searchParams.get('limit') || '20')
	})
	if (!parsed.success) return NextResponse.json({ error: 'Invalid query' }, { status: 400 })
	const { q, tag, sort, page = 1, limit = 20 } = parsed.data
	const filter: any = { visibility: 'public' }
	if (q) filter.$text = { $search: q }
	if (tag) filter.tags = tag
	const sortMap: any = { date: { createdAt: -1 }, popularity: { views: -1, likes: -1 }, duration: { duration: -1 } }
	const items = await Video.find(filter)
		.sort(sort ? sortMap[sort] : { createdAt: -1 })
		.skip((page - 1) * limit)
		.limit(limit)
		.lean()
	const total = await Video.countDocuments(filter)
	return NextResponse.json({ items, page, limit, total })
}