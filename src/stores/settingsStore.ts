import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Settings, Theme, AppLanguage } from '@/types/settings.types'
import type { PartOfSpeech } from '@/types/word.types'

const DEFAULT_SETTINGS: Settings = {
  theme: 'light',
  language: 'tr',
  notificationsEnabled: false,
  notificationTime: '08:00',
  partOfSpeech: 'all'
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<Settings>({ ...DEFAULT_SETTINGS })

  function loadFromStorage() {
    const stored = localStorage.getItem('voca_settings')
    if (stored) {
      try {
        settings.value = { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
      } catch {
        /* ignore */
      }
    }
    applyTheme(settings.value.theme)
  }

  function saveToStorage() {
    localStorage.setItem('voca_settings', JSON.stringify(settings.value))
  }

  function applyTheme(theme: Theme) {
    document.documentElement.setAttribute('data-theme', theme)
  }

  function setTheme(theme: Theme) {
    settings.value.theme = theme
    applyTheme(theme)
    saveToStorage()
  }

  function setLanguage(lang: AppLanguage) {
    settings.value.language = lang
    saveToStorage()
  }

  function toggleNotifications() {
    settings.value.notificationsEnabled = !settings.value.notificationsEnabled
    saveToStorage()
  }

  function setNotificationTime(time: string) {
    settings.value.notificationTime = time
    saveToStorage()
  }

  function setPartOfSpeech(pos: PartOfSpeech | 'all') {
    settings.value.partOfSpeech = pos
    saveToStorage()
  }

  watch(() => settings.value.theme, applyTheme)

  return {
    settings,
    loadFromStorage,
    setTheme,
    setLanguage,
    toggleNotifications,
    setNotificationTime,
    setPartOfSpeech
  }
})
