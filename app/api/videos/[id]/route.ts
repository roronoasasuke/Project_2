import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Video } from '@/models/Video'

interface Params { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
	await connectToDatabase()
	const video = await Video.findById(params.id).lean()
	if (!video) return NextResponse.json({ error: 'Not found' }, { status: 404 })
	return NextResponse.json({ video })
}