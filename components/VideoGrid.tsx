import VideoCard, { VideoCardProps } from './VideoCard'

export default function VideoGrid({ videos }: { videos: VideoCardProps[] }) {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
			{videos.map((v)=> (<VideoCard key={v._id} {...v} />))}
		</div>
	)
}