import ChannelHeader from '@/components/ChannelHeader'
import VideoGrid from '@/components/VideoGrid'

export const revalidate = 120

async function load(username: string) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/channel/${username}`, { next: { revalidate: 120 } })
	return res.json()
}

export default async function ChannelPage({ params }: { params: { username: string } }) {
	const data = await load(params.username)
	if (!data?.channel) return <div className="container mx-auto p-4">Not found</div>
	return (
		<div className="container mx-auto px-4 py-4 space-y-4">
			<ChannelHeader channel={data.channel} />
			<VideoGrid videos={data.uploads || []} />
		</div>
	)
}