import type { PartOfSpeech } from './word.types'

export type Theme = 'light' | 'dark'
export type AppLanguage = 'tr' | 'en'

export interface Settings {
  theme: Theme
  language: AppLanguage
  notificationsEnabled: boolean
  notificationTime: string
  partOfSpeech: PartOfSpeech | 'all'
}
