import type { WordStatus } from '@/types/word.types'
import { addDays, getTodayISO } from '@/utils/dateUtils'

const INTERVALS = [1, 3, 7, 14, 30, 90]

export function getNextInterval(currentInterval: number, status: WordStatus): number {
  if (status === 'new') return 1
  if (status === 'learning') return currentInterval || 1
  // known → move to next interval
  const currentIdx = INTERVALS.indexOf(currentInterval)
  if (currentIdx === -1) return INTERVALS[0]!
  return INTERVALS[Math.min(currentIdx + 1, INTERVALS.length - 1)]!
}

export function getNextReviewDate(interval: number): string {
  return addDays(getTodayISO(), interval)
}
