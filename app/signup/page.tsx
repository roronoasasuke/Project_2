"use client"
import { useState } from 'react'
import { apiFetch } from '@/lib/fetcher'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()
	async function submit() {
		setError('')
		try {
			await apiFetch('/api/auth/signup', { method: 'POST', body: JSON.stringify({ username, email, password }) })
			router.push('/')
		} catch (e: any) { setError(e.message) }
	}
	return (
		<div className="container mx-auto max-w-sm p-6 space-y-4">
			<h1 className="text-xl font-semibold">Create account</h1>
			<input className="input" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
			<input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
			<input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
			<button className="btn-primary w-full" onClick={submit}>Sign up</button>
			{error && <p className="text-sm text-red-400">{error}</p>}
		</div>
	)
}