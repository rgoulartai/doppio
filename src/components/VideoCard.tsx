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
      className="card-apple"
    >
      {/* Video area */}
      <div className="relative">
        {!isVisible ? (
          <div className="w-full aspect-video bg-apple-divider animate-pulse rounded-t-2xl" />
        ) : !isOnline ? (
          <div className="w-full aspect-video bg-apple-bg rounded-t-2xl flex flex-col items-center justify-center gap-2 text-apple-secondary">
            <svg
              className="w-7 h-7"
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
            <span className="text-[13px] font-medium">Connect to watch</span>
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

        {/* Completion overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${isCompleted ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={!isCompleted}
        >
          <div className="w-14 h-14 bg-apple-green rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-apple-text text-[15px] leading-snug tracking-tight">
          {card.title}
        </h3>

        <button
          onClick={onComplete}
          disabled={isCompleted}
          className={`
            w-full py-2.5 rounded-pill text-[15px] font-semibold
            transition-all duration-150 active:scale-[0.97]
            ${isCompleted
              ? 'bg-apple-green-bg text-apple-green border border-apple-green/30 cursor-default'
              : 'bg-apple-blue text-white shadow-apple-btn hover:bg-apple-blue-hover'}
          `}
          style={{ touchAction: 'manipulation' }}
          aria-label={isCompleted ? 'Card completed' : `Mark "${card.title}" as done`}
        >
          {isCompleted ? '✓ Done' : 'Mark as done'}
        </button>
      </div>
    </div>
  )
}
