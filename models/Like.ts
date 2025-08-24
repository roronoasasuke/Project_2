import mongoose, { Schema, model, models } from 'mongoose'

export interface ILike {
	videoId: mongoose.Types.ObjectId
	userId: mongoose.Types.ObjectId
	createdAt: Date
}

const LikeSchema = new Schema<ILike>({
	videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true, index: true },
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
	createdAt: { type: Date, default: Date.now }
})

LikeSchema.index({ videoId: 1, userId: 1 }, { unique: true })

export const Like = models.Like || model<ILike>('Like', LikeSchema)
export type LikeDoc = mongoose.HydratedDocument<ILike>