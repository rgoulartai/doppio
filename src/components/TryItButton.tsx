import { useState } from 'react'
import toast from 'react-hot-toast'
import { openTryIt, getToolDisplayName } from '../lib/tryit'
import { track } from '../lib/analytics'
import type { VideoCard } from '../types/content'

interface TryItButtonProps {
  card: VideoCard;
  level: 1 | 2 | 3;
  cardIndex: 1 | 2 | 3;
  onTryIt?: () => void;
}

export function TryItButton({ card, level, cardIndex, onTryIt }: TryItButtonProps) {
  const [fallbackPrompt, setFallbackPrompt] = useState<string | null>(null)
  const toolName = getToolDisplayName(card.aiTool)

  const handleClick = async () => {
    void track('try_it_clicked', { level, card: cardIndex, aiTool: card.aiTool })

    const result = await openTryIt(card)

    if (result.copied) {
      toast.success(`Prompt copied! Paste it in ${toolName}`, {
        duration: 4000,
        position: 'bottom-center',
        style: {
          background: '#1a1a2e',
          color: '#fff',
          borderRadius: '12px',
          fontSize: '14px',
        },
      })
      setFallbackPrompt(null)
    } else if (result.fallbackText) {
      setFallbackPrompt(result.fallbackText)
    }

    onTryIt?.()
  }

  return (
    <div className="space-y-2">
      <button
        onClick={() => { void handleClick() }}
        className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform duration-150"
        style={{ touchAction: 'manipulation' }}
        aria-label={`Try it in ${toolName}`}
      >
        <span>Try it in {toolName}</span>
        <span aria-hidden="true">→</span>
      </button>

      {fallbackPrompt && (
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-3">
          <p className="text-xs text-gray-400 mb-1 font-medium">
            Copy this prompt and paste it in {toolName}:
          </p>
          <p className="text-sm text-gray-200 leading-relaxed select-all">
            {fallbackPrompt}
          </p>
        </div>
      )}
    </div>
  )
}
