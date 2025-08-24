"use client"
import { useState } from 'react'
import { apiFetch } from '@/lib/fetcher'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
	const [identifier, setIdentifier] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()
	async function submit() {
		setError('')
		try {
			await apiFetch('/api/auth/signin', { method: 'POST', body: JSON.stringify({ identifier, password }) })
			router.push('/')
		} catch (e: any) { setError(e.message) }
	}
	return (
		<div className="container mx-auto max-w-sm p-6 space-y-4">
			<h1 className="text-xl font-semibold">Sign in</h1>
			<input className="input" placeholder="Email or username" value={identifier} onChange={e=>setIdentifier(e.target.value)} />
			<input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
			<button className="btn-primary w-full" onClick={submit}>Sign in</button>
			{error && <p className="text-sm text-red-400">{error}</p>}
		</div>
	)
}