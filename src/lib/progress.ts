// src/lib/progress.ts
import { supabase } from './supabase';
import { getOrCreateAnonUser } from './auth';

const STORAGE_KEY = 'doppio_progress_v1';

export interface ProgressState {
  level_1: { card_1: boolean; card_2: boolean; card_3: boolean };
  level_2: { card_1: boolean; card_2: boolean; card_3: boolean };
  level_3: { card_1: boolean; card_2: boolean; card_3: boolean };
}

function emptyProgress(): ProgressState {
  return {
    level_1: { card_1: false, card_2: false, card_3: false },
    level_2: { card_1: false, card_2: false, card_3: false },
    level_3: { card_1: false, card_2: false, card_3: false },
  };
}

/**
 * Read progress from localStorage synchronously.
 * Always instant. Works offline. Returns emptyProgress() if nothing stored.
 */
export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    // Spread over emptyProgress() ensures all keys exist even if stored data
    // is from an older version missing some keys
    return { ...emptyProgress(), ...JSON.parse(raw) };
  } catch {
    return emptyProgress();
  }
}

function writeProgress(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('[doppio] Failed to write progress to localStorage', err);
  }
}

/**
 * Mark a card complete: synchronous localStorage write, then fire-and-forget Supabase upsert.
 * The UI never waits on network. Works offline.
 */
export function markCardComplete(level: 1 | 2 | 3, card: 1 | 2 | 3): void {
  // 1. Synchronous write — instant UI update
  const state = loadProgress();
  const levelKey = `level_${level}` as keyof ProgressState;
  const cardKey = `card_${card}`;
  (state[levelKey] as Record<string, boolean>)[cardKey] = true;
  writeProgress(state);

  // 2. Fire-and-forget Supabase upsert (non-blocking)
  void (async () => {
    try {
      const user = await getOrCreateAnonUser();
      if (!user) return; // Offline mode — skip silently

      const { error } = await supabase
        .from('user_progress')
        .upsert(
          {
            user_id: user.id,
            level,
            card,
            completed_at: new Date().toISOString(),
          },
          {
            onConflict: 'user_id,level,card',
            ignoreDuplicates: true,
          }
        );

      if (error) throw error;
    } catch (err) {
      // Swallow — localStorage write already succeeded; Supabase sync retries on focus
      console.warn('[doppio] Supabase upsert failed (offline mode continues)', err);
    }
  })();
}

/**
 * Pull all completed rows from Supabase and merge into localStorage (additive union).
 * Cards are never un-completed. Safe to call multiple times.
 */
export async function syncFromSupabase(): Promise<void> {
  try {
    const user = await getOrCreateAnonUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('user_progress')
      .select('level, card')
      .eq('user_id', user.id);

    if (error) throw error;
    if (!data || data.length === 0) return;

    // Merge: set any Supabase-completed cards to true in localStorage
    const state = loadProgress();
    for (const row of data) {
      const levelKey = `level_${row.level}` as keyof ProgressState;
      const cardKey = `card_${row.card}`;
      if (levelKey in state) {
        (state[levelKey] as Record<string, boolean>)[cardKey] = true;
      }
    }
    writeProgress(state);
  } catch (err) {
    // Swallow — app continues from localStorage
    console.warn('[doppio] Supabase sync failed (offline mode continues)', err);
  }
}

/**
 * Convenience: get completed card count for a specific level.
 */
export function getLevelCompletedCount(state: ProgressState, level: 1 | 2 | 3): number {
  const levelKey = `level_${level}` as keyof ProgressState;
  return Object.values(state[levelKey]).filter(Boolean).length;
}

/**
 * Convenience: check if all 3 cards in a level are complete.
 */
export function isLevelComplete(state: ProgressState, level: 1 | 2 | 3): boolean {
  return getLevelCompletedCount(state, level) === 3;
}

/**
 * Convenience: get total completed cards across all levels.
 */
export function getTotalCompletedCount(state: ProgressState): number {
  return (
    getLevelCompletedCount(state, 1) +
    getLevelCompletedCount(state, 2) +
    getLevelCompletedCount(state, 3)
  );
}
