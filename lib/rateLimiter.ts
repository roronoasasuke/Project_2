type Key = string

interface Bucket { tokens: number; lastRefill: number }

const buckets = new Map<Key, Bucket>()

export function rateLimit({ key, limit, windowMs }: { key: Key; limit: number; windowMs: number }): boolean {
	const now = Date.now()
	let bucket = buckets.get(key)
	if (!bucket) {
		bucket = { tokens: limit, lastRefill: now }
		buckets.set(key, bucket)
	}
	const delta = now - bucket.lastRefill
	if (delta > windowMs) {
		bucket.tokens = limit
		bucket.lastRefill = now
	}
	if (bucket.tokens > 0) {
		bucket.tokens -= 1
		return true
	}
	return false
}