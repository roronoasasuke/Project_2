import mongoose, { Schema, models, model } from 'mongoose'

export interface IUser {
	username: string
	email: string
	passwordHash: string
	avatarUrl?: string
	bio?: string
	createdAt: Date
}

const UserSchema = new Schema<IUser>({
	username: { type: String, required: true, unique: true, index: true },
	email: { type: String, required: true, unique: true, index: true },
	passwordHash: { type: String, required: true },
	avatarUrl: { type: String },
	bio: { type: String },
	createdAt: { type: Date, default: Date.now }
})

export const User = models.User || model<IUser>('User', UserSchema)
export type UserDoc = mongoose.HydratedDocument<IUser>