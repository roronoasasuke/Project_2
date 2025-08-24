export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
	const res = await fetch(url, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...(options.headers || {})
		}
	})
	if (!res.ok) {
		let message = 'Request failed'
		try { const data = await res.json(); message = (data as any)?.error || message } catch {}
		throw new Error(message)
	}
	return res.json() as Promise<T>
}