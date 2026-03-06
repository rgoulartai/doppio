import { useState } from 'react'
import { VideoCard } from '../components/VideoCard'
import contentData from '../data/content.json'
import type { VideoCard as VideoCardType } from '../types/content'

// Test harness — will be replaced by LevelScreen in Task 4.1
export default function Learn() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const firstCard = contentData.levels[0].cards[0] as VideoCardType

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Level 1 — Beginner</h1>
      <div className="max-w-md mx-auto">
        <VideoCard
          card={firstCard}
          isCompleted={completed.has(firstCard.id)}
          onComplete={() => setCompleted(prev => new Set([...prev, firstCard.id]))}
        />
      </div>
    </div>
  )
}
