import TopNav from '@/components/TopNav'
import SideNav from '@/components/SideNav'
import BottomNav from '@/components/BottomNav'
import VideoGrid from '@/components/VideoGrid'

export const revalidate = 60

async function fetchVideos() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/videos`, { next: { revalidate: 60 } })
	const data = await res.json()
	return data.items || []
}

export default async function HomePage() {
	const videos = await fetchVideos()
	return (
		<>
			<TopNav />
			<div className="container mx-auto px-4 py-4 flex gap-4">
				<SideNav />
				<main id="content" className="flex-1 space-y-4">
					<VideoGrid videos={videos} />
				</main>
			</div>
			<BottomNav />
		</>
	)
}