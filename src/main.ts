import '@/assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import tr from './i18n/tr'
import en from './i18n/en'

import { useUserStore } from './stores/userStore'
import { useSettingsStore } from './stores/settingsStore'
import { useProgressStore } from './stores/progressStore'

const storedSettings = localStorage.getItem('voca_settings')
const parsedSettings = storedSettings ? JSON.parse(storedSettings) : null
const defaultLocale = parsedSettings?.language ?? 'tr'

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'tr',
  messages: { tr, en }
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)

// Load persisted data
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const progressStore = useProgressStore()

userStore.loadFromStorage()
settingsStore.loadFromStorage()
progressStore.loadFromStorage()

app.mount('#app')
