import Link from 'next/link'

export default function BottomNav() {
	return (
		<nav className="fixed md:hidden bottom-0 left-0 right-0 z-40 border-t bg-background/70 backdrop-blur">
			<div className="grid grid-cols-3 gap-2 p-2">
				<Link href="/" className="btn-secondary">Home</Link>
				<Link href="/upload" className="btn-secondary">Upload</Link>
				<Link href="/playlists" className="btn-secondary">Playlists</Link>
			</div>
		</nav>
	)
}