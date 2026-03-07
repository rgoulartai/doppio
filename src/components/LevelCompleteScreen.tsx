// src/components/LevelCompleteScreen.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { track } from '../lib/analytics';

const LEVEL_CONFIG = {
  1: {
    emoji: '🌱',
    headline: 'Level 1 complete',
    subtext: "You're thinking like an AI user. Time to delegate.",
    ctaLabel: 'Continue to Level 2',
  },
  2: {
    emoji: '⚡',
    headline: 'Level 2 complete',
    subtext: "You're delegating tasks to AI. Let's go deeper.",
    ctaLabel: 'Continue to Level 3',
  },
  3: {
    emoji: '🏆',
    headline: "You're an AI Manager",
    subtext: 'You just transformed how you work. Forever.',
    ctaLabel: 'See your badge',
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

  useEffect(() => {
    confetti({
      particleCount: 90,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#0071e3', '#34c759', '#ff9f0a', '#ff375f', '#5e5ce6'],
    });
    void track('level_completed', { level });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleContinue = () => {
    if (level === 3) {
      navigate('/complete');
    } else {
      void track('level_started', { level: (level + 1) as 2 | 3 });
      onContinue();
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "I'm now an AI Manager!",
      text: "I just completed a Doppio level — the Duolingo of AI. Start your daily AI practice:",
      url: SHARE_URL,
    };
    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast.success('Link copied — share your progress', {
          position: 'bottom-center',
          style: {
            background: '#1d1d1f',
            color: '#f5f5f7',
            borderRadius: '100px',
            fontSize: '14px',
            padding: '10px 20px',
          },
        });
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        await navigator.clipboard.writeText(SHARE_URL).catch(() => {});
        toast.success('Link copied — share your progress', {
          position: 'bottom-center',
          style: {
            background: '#1d1d1f',
            color: '#f5f5f7',
            borderRadius: '100px',
            fontSize: '14px',
            padding: '10px 20px',
          },
        });
      }
    }
    void track('badge_shared', { level });
    onShare();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-apple-surface flex flex-col items-center justify-center px-8"
      style={{ animation: 'fadeUp 0.35s ease both' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Emoji */}
      <div
        className="text-[72px] mb-5 leading-none"
        role="img"
        aria-label={config.headline}
        style={{ animation: 'fadeUp 0.4s ease 0.05s both' }}
      >
        {config.emoji}
      </div>

      {/* Text */}
      <h1
        className="text-[28px] font-bold text-apple-text text-center tracking-tighter mb-3 leading-tight"
        style={{ animation: 'fadeUp 0.4s ease 0.1s both' }}
      >
        {config.headline}
      </h1>
      <p
        className="text-[17px] text-apple-secondary text-center mb-12 max-w-xs leading-relaxed"
        style={{ animation: 'fadeUp 0.4s ease 0.15s both' }}
      >
        {config.subtext}
      </p>

      {/* CTAs */}
      <div
        className="w-full max-w-xs flex flex-col gap-3"
        style={{ animation: 'fadeUp 0.4s ease 0.2s both' }}
      >
        <button
          onClick={handleContinue}
          className="btn-apple-primary w-full"
          style={{ touchAction: 'manipulation' }}
        >
          {config.ctaLabel}
        </button>

        <button
          onClick={() => { void handleShare() }}
          className="btn-apple-outline w-full"
          style={{ touchAction: 'manipulation' }}
        >
          Share
        </button>
      </div>

      <div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
    </div>
  );
}
