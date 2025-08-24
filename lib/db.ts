import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

if (!MONGODB_URI) {
	console.warn('MONGODB_URI is not set')
}

interface GlobalWithMongoose {
	mongooseConn?: {
		conn: typeof mongoose | null
		promise: Promise<typeof mongoose> | null
	}
}

const globalForMongoose = global as unknown as GlobalWithMongoose

const cached = globalForMongoose.mongooseConn || { conn: null, promise: null }

globalForMongoose.mongooseConn = cached

export async function connectToDatabase() {
	if (cached.conn) return cached.conn
	if (!cached.promise) {
		cached.promise = mongoose
			.connect(MONGODB_URI, {
				bufferCommands: false,
				maxPoolSize: 10
			})
			.then((m) => m)
	}
	cached.conn = await cached.promise
	return cached.conn
}