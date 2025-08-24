"use client"
import { useState, useTransition } from 'react'
import { apiFetch } from '@/lib/fetcher'

export default function SubscribeButton({ channelId, initial }: { channelId: string; initial: boolean }) {
	const [subscribed, setSubscribed] = useState(initial)
	const [isPending, startTransition] = useTransition()
	return (
		<button className={subscribed ? 'btn-secondary' : 'btn-primary'} disabled={isPending} onClick={()=>{
			startTransition(async ()=>{
				try {
					if (subscribed) {
						await apiFetch('/api/unsubscribe', { method: 'POST', body: JSON.stringify({ channelId }) })
						setSubscribed(false)
					} else {
						await apiFetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ channelId }) })
						setSubscribed(true)
					}
				} catch {}
			})
		}}>
			{subscribed ? 'Subscribed' : 'Subscribe'}
		</button>
	)
}