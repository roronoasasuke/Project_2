import { z } from 'zod'

export const signUpSchema = z.object({
	username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
	email: z.string().email(),
	password: z.string().min(8).max(100)
})

export const signInSchema = z.object({
	identifier: z.string().min(3), // username or email
	password: z.string().min(8)
})

export const createVideoSchema = z.object({
	title: z.string().min(1).max(120),
	description: z.string().max(5000).optional(),
	playbackUrl: z.string().url(),
	hlsPlaylistUrl: z.string().url().optional(),
	thumbUrl: z.string().url(),
	duration: z.number().min(0),
	tags: z.array(z.string()).max(20).optional().default([]),
	visibility: z.enum(['public', 'unlisted', 'private']).default('public')
})

export const likeSchema = z.object({})

export const commentSchema = z.object({ text: z.string().min(1).max(1000) })

export const viewSchema = z.object({})

export const searchQuerySchema = z.object({
	q: z.string().optional(),
	tag: z.string().optional(),
	sort: z.enum(['date', 'popularity', 'duration']).optional(),
	page: z.coerce.number().min(1).optional(),
	limit: z.coerce.number().min(1).max(50).optional()
})

export const subscribeSchema = z.object({ channelId: z.string() })

export const playlistCreateSchema = z.object({ title: z.string().min(1).max(120), description: z.string().max(500).optional() })
export const playlistModifySchema = z.object({ videoId: z.string() })
export const playlistReorderSchema = z.object({ itemIds: z.array(z.string()) })