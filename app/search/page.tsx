import TagChips from '@/components/TagChips'
import VideoGrid from '@/components/VideoGrid'

export const revalidate = 60

export default async function SearchPage({ searchParams }: { searchParams: any }) {
	const query = new URLSearchParams(searchParams as any).toString()
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/search?${query}`, { next: { revalidate: 60 } })
	const data = await res.json()
	return (
		<div className="container mx-auto px-4 py-4 space-y-4">
			<TagChips />
			<VideoGrid videos={data.items || []} />
		</div>
	)
}