import './globals.css'
import '../tailwind.css'
import type { Metadata } from 'next'
import { clsx } from 'clsx'

export const metadata: Metadata = {
	title: process.env.NEXT_PUBLIC_APP_NAME || 'StreamBetter',
	description: 'A modern, mobile-first video platform',
	manifest: '/manifest.json',
	icons: [
		{ rel: 'icon', url: '/icons/icon-192.png' },
		{ rel: 'apple-touch-icon', url: '/icons/icon-192.png' }
	]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<body className={clsx('min-h-screen bg-background text-foreground')}>
				<a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 btn-secondary">Skip to content</a>
				{children}
				<script dangerouslySetInnerHTML={{ __html: `window.__APP_NAME__='${process.env.NEXT_PUBLIC_APP_NAME || 'StreamBetter'}'` }} />
			</body>
		</html>
	)
}