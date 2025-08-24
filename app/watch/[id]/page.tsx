import Player from '@/components/Player'
import VideoGrid from '@/components/VideoGrid'
import CommentList from '@/components/CommentList'

async function getVideo(id: string) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/videos/${id}`, { cache: 'no-store' })
	if (!res.ok) return null
	return res.json()
}

async function getRelated() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/videos?limit=8`, { next: { revalidate: 120 } })
	return res.json()
}

export default async function WatchPage({ params }: { params: { id: string } }) {
	const data = await getVideo(params.id)
	if (!data?.video) return <div className="container mx-auto p-4">Not found</div>
	const related = await getRelated()
	const video = data.video
	return (
		<div className="container mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div className="lg:col-span-2 space-y-3">
				<Player src={video.hlsPlaylistUrl || video.playbackUrl} poster={video.thumbUrl} />
				<h1 className="text-xl font-semibold">{video.title}</h1>
				<p className="text-sm text-muted-foreground">{video.views} views</p>
				<p className="text-sm">{video.description}</p>
				<CommentList videoId={video._id} />
			</div>
			<aside className="space-y-3">
				<VideoGrid videos={related.items || []} />
			</aside>
		</div>
	)
}