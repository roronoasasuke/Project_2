"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function TopNav() {
	const router = useRouter()
	const [q, setQ] = useState('')
	return (
		<header className="sticky top-0 z-40 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
			<div className="container mx-auto px-4 h-14 flex items-center gap-3">
				<Link href="/" className="font-semibold text-lg">{typeof window !== 'undefined' ? (window as any).__APP_NAME__ : 'StreamBetter'}</Link>
				<form className="flex-1 hidden sm:flex" onSubmit={(e)=>{e.preventDefault(); router.push(`/search?q=${encodeURIComponent(q)}`)}}>
					<input aria-label="Search" className="input" placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} />
				</form>
				<div className="flex items-center gap-2">
					<Link href="/upload" className="btn-primary">Upload</Link>
					<Link href="/signin" className="btn-secondary">Sign in</Link>
				</div>
			</div>
		</header>
	)
}