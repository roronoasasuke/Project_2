import mongoose, { Schema, model, models } from 'mongoose'

export type Visibility = 'public' | 'unlisted' | 'private'

export interface IVideo {
	title: string
	description?: string
	ownerId: mongoose.Types.ObjectId
	playbackUrl: string
	thumbUrl: string
	duration: number
	tags: string[]
	visibility: Visibility
	views: number
	likes: number
	hlsPlaylistUrl?: string
	createdAt: Date
}

const VideoSchema = new Schema<IVideo>({
	title: { type: String, required: true },
	description: { type: String },
	ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
	playbackUrl: { type: String, required: true },
	thumbUrl: { type: String, required: true },
	duration: { type: Number, required: true },
	tags: { type: [String], default: [], index: true },
	visibility: { type: String, enum: ['public', 'unlisted', 'private'], default: 'public', index: true },
	views: { type: Number, default: 0, index: true },
	likes: { type: Number, default: 0 },
	hlsPlaylistUrl: { type: String },
	createdAt: { type: Date, default: Date.now, index: true }
})

VideoSchema.index({ title: 'text', description: 'text' })
VideoSchema.index({ tags: 1, createdAt: -1 })

export const Video = models.Video || model<IVideo>('Video', VideoSchema)
export type VideoDoc = mongoose.HydratedDocument<IVideo>