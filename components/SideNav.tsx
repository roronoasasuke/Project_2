import Link from 'next/link'

export default function SideNav() {
	return (
		<nav className="hidden md:block w-60 shrink-0 p-4">
			<ul className="space-y-2">
				<li><Link className="block btn-secondary w-full text-left" href="/">Home</Link></li>
				<li><Link className="block btn-secondary w-full text-left" href="/playlists">Playlists</Link></li>
				<li><Link className="block btn-secondary w-full text-left" href="/subscriptions">Subscriptions</Link></li>
			</ul>
		</nav>
	)
}