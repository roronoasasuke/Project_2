import mongoose, { Schema, model, models } from 'mongoose'

export interface IViewEvent {
	videoId: mongoose.Types.ObjectId
	userId?: mongoose.Types.ObjectId
	ts: Date
	ipHash?: string
}

const ViewEventSchema = new Schema<IViewEvent>({
	videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true, index: true },
	userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
	ts: { type: Date, default: Date.now, index: true },
	ipHash: { type: String }
})

ViewEventSchema.index({ videoId: 1, ts: -1 })

export const ViewEvent = models.ViewEvent || model<IViewEvent>('ViewEvent', ViewEventSchema)
export type ViewEventDoc = mongoose.HydratedDocument<IViewEvent>