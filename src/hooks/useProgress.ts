// src/hooks/useProgress.ts
import { useEffect, useState, useCallback } from 'react';
import {
  loadProgress,
  markCardComplete,
  syncFromSupabase,
  getLevelCompletedCount,
  isLevelComplete as checkLevelComplete,
  getTotalCompletedCount,
  type ProgressState,
} from '../lib/progress';

interface UseProgressReturn {
  progress: ProgressState;
  markComplete: (level: 1 | 2 | 3, card: 1 | 2 | 3) => void;
  isLoading: boolean;
  completedCount: (level: 1 | 2 | 3) => number;
  totalCount: number;
  totalCompleted: number;
  isLevelComplete: (level: 1 | 2 | 3) => boolean;
}

export function useProgress(): UseProgressReturn {
  // Synchronous initial read from localStorage — no loading flash
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  // isLoading = true until Supabase sync completes on mount
  const [isLoading, setIsLoading] = useState(true);

  // On mount: run background Supabase sync then update state
  useEffect(() => {
    syncFromSupabase().then(() => {
      setProgress(loadProgress());
      setIsLoading(false);
    });
  }, []);

  const markComplete = useCallback((level: 1 | 2 | 3, card: 1 | 2 | 3) => {
    markCardComplete(level, card);
    // Refresh from localStorage immediately after write — instant UI update
    setProgress(loadProgress());
  }, []);

  return {
    progress,
    markComplete,
    isLoading,
    completedCount: (level: 1 | 2 | 3) => getLevelCompletedCount(progress, level),
    totalCount: 9,
    totalCompleted: getTotalCompletedCount(progress),
    isLevelComplete: (level: 1 | 2 | 3) => checkLevelComplete(progress, level),
  };
}
