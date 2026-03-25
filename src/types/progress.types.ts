export interface DailyStats {
  date: string
  wordsSeenCount: number
}

export interface AppStats {
  lastActiveDate: string
  streakDays: number
  dailyActivity: Record<string, number>
}
