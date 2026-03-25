import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settingsStore'
import type { AppLanguage } from '@/types/settings.types'

export function useLanguage() {
  const settingsStore = useSettingsStore()
  const { locale } = useI18n()

  const currentLang = computed(() => settingsStore.settings.language)

  function toggleLanguage() {
    const next: AppLanguage = currentLang.value === 'tr' ? 'en' : 'tr'
    settingsStore.setLanguage(next)
    locale.value = next
  }

  function setLanguage(lang: AppLanguage) {
    settingsStore.setLanguage(lang)
    locale.value = lang
  }

  return { currentLang, toggleLanguage, setLanguage }
}
