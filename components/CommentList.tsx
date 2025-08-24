"use client"
import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/fetcher'

interface Comment { _id: string; text: string; createdAt: string; userId: string }

export default function CommentList({ videoId }: { videoId: string }) {
	const [comments, setComments] = useState<Comment[]>([])
	const [text, setText] = useState('')
	useEffect(()=>{
		load()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
	async function load() {
		const res = await apiFetch<{ items: Comment[] }>(`/api/videos/${videoId}/comment`)
		setComments(res.items)
	}
	async function submit() {
		if (!text.trim()) return
		const optimistic: Comment = { _id: `tmp-${Date.now()}`, text, createdAt: new Date().toISOString(), userId: 'me' }
		setComments([optimistic, ...comments])
		setText('')
		try {
			const res = await apiFetch<{ comment: Comment }>(`/api/videos/${videoId}/comment`, { method: 'POST', body: JSON.stringify({ text }) })
			setComments((prev)=> prev.map(c => c._id === optimistic._id ? res.comment : c))
		} catch {
			setComments((prev)=> prev.filter(c => c._id !== optimistic._id))
		}
	}
	return (
		<div className="space-y-3">
			<div className="flex gap-2">
				<input className="input flex-1" placeholder="Add a comment" value={text} onChange={e=>setText(e.target.value)} />
				<button className="btn-primary" onClick={submit}>Comment</button>
			</div>
			<ul className="space-y-2">
				{comments.map(c => (
					<li key={c._id} className="card p-3">
						<p className="text-sm">{c.text}</p>
						<p className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleString()}</p>
					</li>
				))}
			</ul>
		</div>
	)
}