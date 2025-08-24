"use client"
import { useRouter, useSearchParams } from 'next/navigation'

const tags = ['tech','music','gaming','education','comedy','news','sports','vlog','travel','food']

export default function TagChips() {
	const router = useRouter()
	const params = useSearchParams()
	const active = params.get('tag') || ''
	return (
		<div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
			{tags.map(t => (
				<button key={t} className={`btn ${active===t? 'bg-primary text-primary-foreground':'btn-secondary'}`} onClick={()=>{
					const q = params.get('q')
					const url = `/search?${q?`q=${encodeURIComponent(q)}&`:''}tag=${encodeURIComponent(t)}`
					router.push(url)
				}}>{t}</button>
			))}
		</div>
	)
}