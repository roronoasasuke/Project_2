import Link from 'next/link'

export interface VideoCardProps {
	_id: string
	title: string
	thumbUrl: string
	ownerId: string
	views: number
	createdAt: string
	duration: number
}

export default function VideoCard(video: VideoCardProps) {
	return (
		<Link href={`/watch/${video._id}`} className="card overflow-hidden">
			<div className="relative">
				<img src={video.thumbUrl} alt={video.title} className="w-full aspect-video object-cover" loading="lazy" />
				<span className="absolute bottom-2 right-2 text-xs px-1.5 py-0.5 rounded bg-black/70">{formatDuration(video.duration)}</span>
			</div>
			<div className="p-3 space-y-1">
				<h3 className="text-sm font-medium line-clamp-2">{video.title}</h3>
				<p className="text-xs text-muted-foreground">{shortViews(video.views)} views · {new Date(video.createdAt).toLocaleDateString()}</p>
			</div>
		</Link>
	)
}

function shortViews(v: number) {
	if (v >= 1_000_000) return `${(v/1_000_000).toFixed(1)}M`
	if (v >= 1_000) return `${(v/1_000).toFixed(1)}K`
	return String(v)
}

function formatDuration(sec: number) {
	const m = Math.floor(sec/60)
	const s = Math.floor(sec%60)
	return `${m}:${s.toString().padStart(2,'0')}`
}