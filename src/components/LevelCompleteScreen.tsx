// src/components/LevelCompleteScreen.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

const LEVEL_CONFIG = {
  1: {
    emoji: '🌱',
    headline: 'Level 1 Complete!',
    subtext: "You're thinking like an AI user. Time to delegate.",
    ctaLabel: 'Start Level 2',
  },
  2: {
    emoji: '⚡',
    headline: 'Level 2 Complete!',
    subtext: "You're delegating tasks to AI. Let's go deeper.",
    ctaLabel: 'Start Level 3',
  },
  3: {
    emoji: '🏆',
    headline: "You're an AI Manager! 🎉",
    subtext: 'You just transformed how you work. Forever.',
    ctaLabel: 'See Your Badge',
  },
} as const;

const SHARE_URL = 'https://doppio.kookyos.com/?ref=badge';

interface LevelCompleteScreenProps {
  level: 1 | 2 | 3;
  onContinue: () => void;
  onShare: () => void;
}

export function LevelCompleteScreen({ level, onContinue, onShare }: LevelCompleteScreenProps) {
  const navigate = useNavigate();
  const config = LEVEL_CONFIG[level];

  // Fire confetti on mount — once, imperative
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
    });
  }, []);

  const handleContinue = () => {
    if (level === 3) {
      navigate('/complete');
    } else {
      onContinue();
    }
  };

  // Share must be called from onClick (iOS Safari requires user gesture)
  const handleShare = async () => {
    const shareData = {
      title: "I'm now an AI Manager!",
      text: "I just completed a Doppio level — the Duolingo of AI. Try it in 20 minutes:",
      url: SHARE_URL,
    };
    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast.success('Link copied! Share your progress 🎉', {
          position: 'bottom-center',
          style: { background: '#1a1a2e', color: '#fff', borderRadius: '12px' },
        });
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        await navigator.clipboard.writeText(SHARE_URL).catch(() => {});
        toast.success('Link copied! Share your progress 🎉', {
          position: 'bottom-center',
          style: { background: '#1a1a2e', color: '#fff', borderRadius: '12px' },
        });
      }
    }
    // Fire analytics — dynamic import so it silently fails if module not ready
    try {
      const { track } = await import('../lib/analytics');
      void track('badge_shared');
    } catch {
      // silent
    }
    onShare();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-8"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-8xl mb-6 animate-bounce" role="img" aria-label={config.headline}>
        {config.emoji}
      </div>

      <h1 className="text-3xl font-bold text-gray-900 text-center mb-3">
        {config.headline}
      </h1>

      <p className="text-lg text-gray-500 text-center mb-10 max-w-xs">
        {config.subtext}
      </p>

      <button
        onClick={handleContinue}
        className="w-full max-w-xs bg-blue-600 text-white text-lg font-semibold py-4 rounded-2xl mb-4 active:scale-95 transition-transform"
        style={{ touchAction: 'manipulation' }}
      >
        {config.ctaLabel}
      </button>

      <button
        onClick={() => { void handleShare() }}
        className="w-full max-w-xs border-2 border-blue-600 text-blue-600 text-lg font-semibold py-4 rounded-2xl active:scale-95 transition-transform"
        style={{ touchAction: 'manipulation' }}
      >
        Share
      </button>

      <div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
    </div>
  );
}
