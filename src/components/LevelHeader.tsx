// src/components/LevelHeader.tsx
import { Link } from 'react-router-dom';

interface LevelHeaderProps {
  totalCompleted: number;
}

export function LevelHeader({ totalCompleted }: LevelHeaderProps) {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-apple-surface border-b border-apple-divider">
      <Link
        to="/"
        className="text-[17px] font-semibold tracking-tight text-apple-text"
        aria-label="Doppio home"
      >
        Doppio
      </Link>
      <div className="flex items-center gap-3">
        <span className="text-[13px] text-apple-secondary font-medium tabular-nums">
          {totalCompleted} of 9
        </span>
        <img
          src="/kooky-logo.png"
          alt="KOOKY AI Exchange"
          className="w-7 h-7 rounded-full"
        />
      </div>
    </div>
  );
}
