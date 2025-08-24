export interface WatchEntry { videoId: string; ts: number; position?: number }

const KEY = 'sb_watch_history'

export function getWatchHistory(): WatchEntry[] {
	if (typeof window === 'undefined') return []
	try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

export function addWatchEntry(entry: WatchEntry) {
	if (typeof window === 'undefined') return
	const list = getWatchHistory()
	const filtered = list.filter((e) => e.videoId !== entry.videoId)
	filtered.unshift(entry)
	localStorage.setItem(KEY, JSON.stringify(filtered.slice(0, 100)))
}