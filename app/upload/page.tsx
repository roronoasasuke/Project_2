"use client"
import { useState } from 'react'
import { apiFetch } from '@/lib/fetcher'

export default function UploadPage() {
	const [file, setFile] = useState<File | null>(null)
	const [status, setStatus] = useState('')
	async function handleUpload() {
		if (!file) return
		setStatus('Requesting signature...')
		const sign = await apiFetch<{ signature: string; timestamp: number; cloudName: string; apiKey: string; folder: string }>(`/api/cloudinary/sign`, { method: 'POST', body: JSON.stringify({ resource_type: 'video' }) })
		const form = new FormData()
		form.append('file', file)
		form.append('timestamp', String(sign.timestamp))
		form.append('api_key', sign.apiKey)
		form.append('signature', sign.signature)
		form.append('folder', sign.folder)
		setStatus('Uploading to Cloudinary...')
		const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/video/upload`, { method: 'POST', body: form })
		const uploaded = await uploadRes.json()
		if (!uploadRes.ok) { setStatus('Upload failed'); return }
		setStatus('Saving metadata...')
		const meta = {
			title: file.name,
			description: '',
			playbackUrl: uploaded.secure_url,
			hlsPlaylistUrl: uploaded.playback_url || uploaded.secure_url.replace(/\.[a-zA-Z0-9]+$/, '.m3u8'),
			thumbUrl: uploaded.thumbnail_url || uploaded.secure_url + '.jpg',
			duration: Math.floor(uploaded.duration || 0),
			tags: [],
			visibility: 'public' as const
		}
		await apiFetch(`/api/videos`, { method: 'POST', body: JSON.stringify(meta) })
		setStatus('Done!')
	}
	return (
		<div className="container mx-auto px-4 py-6 max-w-xl space-y-4">
			<h1 className="text-xl font-semibold">Upload</h1>
			<input type="file" accept="video/*" onChange={e=> setFile(e.target.files?.[0] || null)} />
			<button className="btn-primary" onClick={handleUpload} disabled={!file}>Upload</button>
			{status && <p className="text-sm text-muted-foreground">{status}</p>}
		</div>
	)
}