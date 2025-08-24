import SubscribeButton from './SubscribeButton'

export default function ChannelHeader({ channel }: { channel: { id: string; username: string; avatarUrl?: string; bio?: string; subscribers: number }, isSubscribed?: boolean }) {
	return (
		<div className="card p-4 flex items-center gap-4">
			<img src={channel.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${channel.username}`} alt={channel.username} className="w-16 h-16 rounded-full" />
			<div className="flex-1">
				<h2 className="text-lg font-semibold">{channel.username}</h2>
				<p className="text-sm text-muted-foreground">{channel.subscribers} subscribers</p>
				{channel.bio && <p className="text-sm mt-1">{channel.bio}</p>}
			</div>
			<SubscribeButton channelId={channel.id} initial={false} />
		</div>
	)
}