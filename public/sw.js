self.addEventListener('install', (event) => {
	self.skipWaiting()
	event.waitUntil(caches.open('sb-shell-v1').then(cache => cache.addAll(['/','/manifest.json'])).catch(()=>{}))
})
self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim())
})
self.addEventListener('fetch', (event) => {
	const url = new URL(event.request.url)
	if (event.request.method !== 'GET') return
	if (url.origin === location.origin) {
		if (url.pathname === '/' || url.pathname.startsWith('/_next/')) {
			event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(res => { const copy = res.clone(); caches.open('sb-shell-v1').then(c=>c.put(event.request, copy)); return res })) )
			return
		}
	}
	if (/\.(png|jpg|jpeg|webp|avif)$/i.test(url.pathname)) {
		event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request, { mode: 'no-cors' }).then(res => { const copy = res.clone(); caches.open('sb-img-v1').then(c=>c.put(event.request, copy)); return res })).catch(()=>cached)))
	}
})