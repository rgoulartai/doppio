// src/components/LevelCompleteScreen.tsx
// Stub — full implementation in Task 4.2 (canvas-confetti, share, navigate)
import { useNavigate } from 'react-router-dom';

interface LevelCompleteScreenProps {
  level: 1 | 2 | 3;
  onContinue: () => void;
  onShare: () => void;
}

const LEVEL_LABELS: Record<1 | 2 | 3, string> = {
  1: '🌱 Beginner',
  2: '⚡ Intermediate',
  3: '🚀 Advanced',
};

export function LevelCompleteScreen({ level, onContinue, onShare }: LevelCompleteScreenProps) {
  const navigate = useNavigate();

  const handleContinue = () => {
    onContinue();
    if (level === 3) {
      navigate('/complete');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/95 backdrop-blur-sm px-6">
      <div className="text-center max-w-sm">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {LEVEL_LABELS[level]} Complete!
        </h2>
        <p className="text-gray-400 mb-8">
          {level < 3
            ? "You're making real progress. Ready for the next level?"
            : "You've completed all 3 levels. You're an AI Manager now!"}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleContinue}
            className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            style={{ touchAction: 'manipulation' }}
          >
            {level < 3 ? `Start Level ${level + 1} →` : 'See your certificate →'}
          </button>
          <button
            onClick={onShare}
            className="w-full py-3 px-6 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium transition-colors"
            style={{ touchAction: 'manipulation' }}
          >
            Share your progress
          </button>
        </div>
      </div>
    </div>
  );
}
