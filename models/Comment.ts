import mongoose, { Schema, model, models } from 'mongoose'

export interface IComment {
	videoId: mongoose.Types.ObjectId
	userId: mongoose.Types.ObjectId
	text: string
	createdAt: Date
}

const CommentSchema = new Schema<IComment>({
	videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true, index: true },
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
	text: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, index: true }
})

CommentSchema.index({ videoId: 1, createdAt: -1 })

export const Comment = models.Comment || model<IComment>('Comment', CommentSchema)
export type CommentDoc = mongoose.HydratedDocument<IComment>