import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { User } from '@/models/User'
import { Video } from '@/models/Video'
import { Subscription } from '@/models/Subscription'

interface Params { params: { username: string } }

export async function GET(_req: NextRequest, { params }: Params) {
	await connectToDatabase()
	const user = await User.findOne({ username: params.username }).lean()
	if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
	const uploads = await Video.find({ ownerId: user._id }).sort({ createdAt: -1 }).limit(24).lean()
	const subs = await Subscription.countDocuments({ channelId: user._id })
	return NextResponse.json({ channel: { id: user._id, username: user.username, avatarUrl: user.avatarUrl, bio: user.bio, subscribers: subs }, uploads })
}