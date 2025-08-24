import mongoose, { Schema, model, models } from 'mongoose'

export interface ISubscription {
	subscriberId: mongoose.Types.ObjectId
	channelId: mongoose.Types.ObjectId
	createdAt: Date
}

const SubscriptionSchema = new Schema<ISubscription>({
	subscriberId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
	channelId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
	createdAt: { type: Date, default: Date.now }
})

SubscriptionSchema.index({ subscriberId: 1, channelId: 1 }, { unique: true })

export const Subscription = models.Subscription || model<ISubscription>('Subscription', SubscriptionSchema)
export type SubscriptionDoc = mongoose.HydratedDocument<ISubscription>