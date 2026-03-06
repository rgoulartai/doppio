// src/components/LevelNav.tsx
import content from '../data/content.json';

interface LevelNavProps {
  activeLevel: 1 | 2 | 3;
  completedCounts: Record<1 | 2 | 3, number>;
  onSelectLevel: (level: 1 | 2 | 3) => void;
}

export function LevelNav({ activeLevel, completedCounts, onSelectLevel }: LevelNavProps) {
  return (
    <div className="flex border-b border-gray-800">
      {content.levels.map((lvl) => {
        const level = lvl.level as 1 | 2 | 3;
        const isActive = level === activeLevel;
        const isFullyComplete = completedCounts[level] === 3;
        return (
          <button
            key={level}
            onClick={() => onSelectLevel(level)}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-1 transition-colors
              ${isActive
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-gray-500 hover:text-gray-300 border-b-2 border-transparent'}`}
            style={{ touchAction: 'manipulation' }}
          >
            <span>{lvl.emoji}</span>
            <span>{lvl.title}</span>
            {isFullyComplete && <span className="text-green-400 text-xs ml-0.5">✓</span>}
          </button>
        );
      })}
    </div>
  );
}
