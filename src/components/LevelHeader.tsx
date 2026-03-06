// src/components/LevelHeader.tsx
import { Link } from 'react-router-dom';

interface LevelHeaderProps {
  totalCompleted: number;
}

export function LevelHeader({ totalCompleted }: LevelHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-950 border-b border-gray-800">
      <Link to="/" className="font-bold text-lg tracking-tight text-white">
        Doppio
      </Link>
      <span className="text-sm text-gray-400 font-medium">
        {totalCompleted} of 9 complete
      </span>
    </div>
  );
}
