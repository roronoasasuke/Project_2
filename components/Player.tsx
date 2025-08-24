"use client"
import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

export default function Player({ src, poster }: { src: string; poster?: string }) {
	const videoRef = useRef<HTMLVideoElement>(null)
	useEffect(()=>{
		const video = videoRef.current!
		if (!video) return
		if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = src
		} else if (Hls.isSupported()) {
			const hls = new Hls()
			hls.loadSource(src)
			hls.attachMedia(video)
			return () => hls.destroy()
		} else {
			video.src = src
		}
	}, [src])
	return (
		<video ref={videoRef} controls playsInline poster={poster} className="w-full rounded-xl" />
	)
}