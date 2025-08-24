import mongoose, { Schema, model, models } from 'mongoose'

export interface IPlaylist {
	ownerId: mongoose.Types.ObjectId
	title: string
	description?: string
	itemIds: mongoose.Types.ObjectId[]
	createdAt: Date
}

const PlaylistSchema = new Schema<IPlaylist>({
	ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
	title: { type: String, required: true },
	description: { type: String },
	itemIds: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
	createdAt: { type: Date, default: Date.now }
})

export const Playlist = models.Playlist || model<IPlaylist>('Playlist', PlaylistSchema)
export type PlaylistDoc = mongoose.HydratedDocument<IPlaylist>