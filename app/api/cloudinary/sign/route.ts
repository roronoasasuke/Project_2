import { NextRequest, NextResponse } from 'next/server'
import { getAuthFromCookie } from '@/lib/jwt'
import { signUploadParams } from '@/lib/cloudinary'

export async function POST(req: NextRequest) {
	const auth = getAuthFromCookie()
	if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const { folder = 'streambetter', resource_type = 'video', timestamp = Math.floor(Date.now()/1000) } = await req.json().catch(() => ({}))
	const params = { folder, resource_type, timestamp, eager: 'q_auto:eco,f_auto:video,h_720:video' }
	const signature = signUploadParams(params)
	return NextResponse.json({ signature, ...params, cloudName: process.env.CLOUDINARY_CLOUD_NAME, apiKey: process.env.CLOUDINARY_API_KEY })
}