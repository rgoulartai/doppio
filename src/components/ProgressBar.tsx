// src/components/ProgressBar.tsx
interface ProgressBarProps {
  completedCards: number;
  totalCards?: number;
  className?: string;
}

export function ProgressBar({
  completedCards,
  totalCards = 3,
  className = '',
}: ProgressBarProps) {
  const percent = totalCards > 0
    ? Math.round((completedCards / totalCards) * 100)
    : 0;
  const widthPercent = totalCards > 0
    ? (completedCards / totalCards) * 100
    : 0;

  return (
    <div
      className={`w-full bg-apple-divider rounded-full h-[3px] overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${completedCards} of ${totalCards} cards completed`}
    >
      <div
        className="bg-apple-blue h-[3px] rounded-full transition-all duration-500 ease-out"
        style={{ width: `${widthPercent}%` }}
      />
    </div>
  );
}
