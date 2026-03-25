import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { WordProgress, WordStatus } from '@/types/word.types'
import type { AppStats } from '@/types/progress.types'
import { getNextInterval, getNextReviewDate } from '@/composables/useSpacedRepetition'
import { getTodayISO } from '@/utils/dateUtils'

export const useProgressStore = defineStore('progress', () => {
  const progress = ref<Record<number, WordProgress>>({})
  const stats = ref<AppStats>({
    lastActiveDate: '',
    streakDays: 0,
    dailyActivity: {}
  })

  const knownCount = computed(
    () => Object.values(progress.value).filter((p) => p.status === 'known').length
  )
  const learningCount = computed(
    () => Object.values(progress.value).filter((p) => p.status === 'learning').length
  )
  const wordsForReview = computed(() => {
    const today = getTodayISO()
    return Object.values(progress.value).filter((p) => p.status === 'learning' && p.nextReview <= today)
  })
  const streakDays = computed(() => stats.value.streakDays)

  function setStatus(wordId: number, status: WordStatus) {
    const existing = progress.value[wordId]
    const currentInterval = existing?.interval ?? 0
    const newInterval = getNextInterval(currentInterval, status)
    const today = getTodayISO()

    progress.value[wordId] = {
      wordId,
      status,
      interval: newInterval,
      nextReview: getNextReviewDate(newInterval),
      reviewCount: (existing?.reviewCount ?? 0) + 1,
      lastSeen: today
    }

    updateDailyActivity(today)
    saveToStorage()
  }

  function markReviewed(wordId: number) {
    const entry = progress.value[wordId]
    if (entry) {
      entry.lastSeen = getTodayISO()
      saveToStorage()
    }
  }

  function updateDailyActivity(date: string) {
    stats.value.dailyActivity[date] = (stats.value.dailyActivity[date] ?? 0) + 1
    updateStreak(date)
    saveStatsToStorage()
  }

  function updateStreak(today: string) {
    const last = stats.value.lastActiveDate
    if (!last || last === today) {
      stats.value.lastActiveDate = today
      return
    }
    const lastDate = new Date(last)
    const todayDate = new Date(today)
    const diff = (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    if (diff === 1) {
      stats.value.streakDays++
    } else if (diff > 1) {
      stats.value.streakDays = 1
    }
    stats.value.lastActiveDate = today
  }

  function loadFromStorage() {
    const stored = localStorage.getItem('voca_progress')
    if (stored) {
      try {
        progress.value = JSON.parse(stored)
      } catch {
        /* ignore */
      }
    }
    const storedStats = localStorage.getItem('voca_stats')
    if (storedStats) {
      try {
        stats.value = JSON.parse(storedStats)
      } catch {
        /* ignore */
      }
    }
  }

  function saveToStorage() {
    localStorage.setItem('voca_progress', JSON.stringify(progress.value))
  }

  function saveStatsToStorage() {
    localStorage.setItem('voca_stats', JSON.stringify(stats.value))
  }

  return {
    progress,
    stats,
    knownCount,
    learningCount,
    wordsForReview,
    streakDays,
    setStatus,
    markReviewed,
    loadFromStorage,
    saveToStorage
  }
})
