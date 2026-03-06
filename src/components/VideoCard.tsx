import { useEffect, useRef, useState } from 'react'
import { useOnlineStatus } from '../hooks/useOnlineStatus'
import { YouTubeEmbed } from './YouTubeEmbed'
import { TikTokEmbed } from './TikTokEmbed'
import type { VideoCard as VideoCardType } from '../types/content'

interface VideoCardProps {
  card: VideoCardType;
  isCompleted: boolean;
  onComplete: () => void;
}

export function VideoCard({ card, isCompleted, onComplete }: VideoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const isOnline = useOnlineStatus()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative rounded-xl border border-gray-800 bg-gray-900 shadow-sm overflow-hidden"
    >
      {/* Video embed area */}
      <div className="relative">
        {!isVisible ? (
          <div className="w-full aspect-video bg-gray-800 animate-pulse rounded-t-xl" />
        ) : !isOnline ? (
          <div className="w-full aspect-video bg-gray-800 rounded-t-xl flex flex-col items-center justify-center gap-2 text-gray-400">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M12 12h.01M3.636 5.636a9 9 0 0112.728 0"
              />
            </svg>
            <span className="text-sm font-medium">📡 Connect to watch this video</span>
          </div>
        ) : card.platform === 'youtube' ? (
          <YouTubeEmbed videoId={card.videoId} title={card.title} />
        ) : (
          <TikTokEmbed
            videoId={card.videoId}
            thumbnailUrl={card.thumbnailUrl ?? ''}
            title={card.title}
          />
        )}

        {/* Completion checkmark overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${isCompleted ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={!isCompleted}
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-white text-base leading-snug">{card.title}</h3>

        <button
          onClick={onComplete}
          disabled={isCompleted}
          className={`w-full py-3 rounded-xl text-sm font-semibold active:scale-95 transition-all duration-150 ${
            isCompleted
              ? 'bg-green-900/40 text-green-400 cursor-default border border-green-800'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          style={{ touchAction: 'manipulation' }}
          aria-label={isCompleted ? 'Card completed' : `Mark "${card.title}" as done`}
        >
          {isCompleted ? '✓ Done' : 'Mark as done'}
        </button>
      </div>
    </div>
  )
}
