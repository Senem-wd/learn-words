<template>
  <div class="settings">
    <h2 class="settings__title">{{ t('settings.title') }}</h2>

    <!-- Profile -->
    <section class="settings__section">
      <h3 class="settings__section-title">{{ t('settings.profile') }}</h3>
      <div class="settings__row">
        <AppInput v-model="form.firstName" :label="t('register.firstName')" />
        <AppInput v-model="form.lastName" :label="t('register.lastName')" />
      </div>
      <AppInput v-model="form.email" :label="t('register.email')" type="email" />
      <AppInput v-model="form.age" :label="t('register.age')" type="number" />
      <AppSelect v-model="form.dailyGoal" :label="t('register.dailyGoal')" :options="goalOptions" />
      <AppButton variant="primary" @click="saveProfile">{{ t('settings.save') }}</AppButton>
    </section>

    <!-- Appearance -->
    <section class="settings__section">
      <h3 class="settings__section-title">{{ t('settings.appearance') }}</h3>
      <div class="settings__toggle-row">
        <span>{{ t('settings.theme') }}</span>
        <div class="settings__theme-btns">
          <button
            :class="['settings__theme-btn', { active: currentTheme === 'light' }]"
            @click="settingsStore.setTheme('light')"
          >
            ☀️ {{ t('settings.light') }}
          </button>
          <button
            :class="['settings__theme-btn', { active: currentTheme === 'dark' }]"
            @click="settingsStore.setTheme('dark')"
          >
            🌙 {{ t('settings.dark') }}
          </button>
        </div>
      </div>
    </section>

    <!-- Language -->
    <section class="settings__section">
      <h3 class="settings__section-title">{{ t('settings.language') }}</h3>
      <div class="settings__theme-btns">
        <button
          :class="['settings__theme-btn', { active: currentLang === 'tr' }]"
          @click="setLanguage('tr')"
        >
          🇹🇷 Türkçe
        </button>
        <button
          :class="['settings__theme-btn', { active: currentLang === 'en' }]"
          @click="setLanguage('en')"
        >
          🇬🇧 English
        </button>
      </div>
    </section>

    <!-- Word Filter -->
    <section class="settings__section">
      <h3 class="settings__section-title">{{ t('settings.wordFilter') }}</h3>
      <div class="settings__theme-btns" style="flex-wrap: wrap">
        <button
          v-for="pos in ['all', 'noun', 'verb', 'adjective', 'adverb', 'other']"
          :key="pos"
          :class="['settings__theme-btn', { active: settingsStore.settings.partOfSpeech === pos }]"
          @click="settingsStore.setPartOfSpeech(pos as any)"
        >
          {{ t(`partOfSpeech.${pos}`) }}
        </button>
      </div>
    </section>

    <!-- Notifications -->
    <section class="settings__section">
      <h3 class="settings__section-title">{{ t('settings.notifications') }}</h3>
      <div class="settings__toggle-row">
        <span>{{ t('settings.notifications') }}</span>
        <label class="settings__toggle">
          <input
            type="checkbox"
            :checked="settingsStore.settings.notificationsEnabled"
            @change="settingsStore.toggleNotifications()"
          />
          <span class="settings__toggle-slider" />
        </label>
      </div>
      <AppInput
        v-if="settingsStore.settings.notificationsEnabled"
        v-model="notifTime"
        :label="t('settings.notificationTime')"
        type="time"
        @change="settingsStore.setNotificationTime(notifTime)"
      />
    </section>

    <!-- Logout -->
    <AppButton variant="danger" :full="true" @click="handleLogout">
      {{ t('settings.logout') }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/userStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { useLanguage } from '@/composables/useLanguage'
import AppInput from '@/components/common/AppInput.vue'
import AppSelect from '@/components/common/AppSelect.vue'
import AppButton from '@/components/common/AppButton.vue'

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const { currentLang, setLanguage } = useLanguage()

const currentTheme = computed(() => settingsStore.settings.theme)

const form = reactive({
  firstName: userStore.user?.firstName ?? '',
  lastName: userStore.user?.lastName ?? '',
  email: userStore.user?.email ?? '',
  age: String(userStore.user?.age ?? ''),
  dailyGoal: String(userStore.user?.dailyGoal ?? '')
})

const notifTime = ref(settingsStore.settings.notificationTime)

const goalOptions = [5, 10, 20, 30, 50].map((g) => ({
  value: g,
  label: t(`goals.${g}`)
}))

function saveProfile() {
  userStore.updateUser({
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    age: Number(form.age),
    dailyGoal: Number(form.dailyGoal)
  })
}

function handleLogout() {
  userStore.logout()
  router.push('/register')
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.settings {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  padding: $spacing-lg $spacing-md;
  padding-bottom: calc(70px + $spacing-lg);
  max-width: 600px;
  margin: 0 auto;

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
  }

  &__section {
    background: var(--color-bg-card);
    border-radius: $radius-md;
    padding: $spacing-lg;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__section-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-md;

    @media (max-width: #{$bp-mobile}) {
      grid-template-columns: 1fr;
    }
  }

  &__toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.95rem;
  }

  &__theme-btns {
    display: flex;
    gap: $spacing-sm;
  }

  &__theme-btn {
    padding: $spacing-xs $spacing-md;
    border-radius: $radius-sm;
    border: 2px solid var(--color-border);
    background: var(--color-bg-input);
    color: var(--color-text-muted);
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;

    &.active {
      border-color: var(--color-primary);
      color: var(--color-primary);
      background: rgba(79, 70, 229, 0.08);
    }
  }

  &__toggle {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    &-slider {
      position: absolute;
      inset: 0;
      background: var(--color-border);
      border-radius: 24px;
      cursor: pointer;
      transition: background 0.2s;

      &::before {
        content: '';
        position: absolute;
        width: 18px;
        height: 18px;
        left: 3px;
        top: 3px;
        background: white;
        border-radius: 50%;
        transition: transform 0.2s;
      }
    }

    input:checked + &-slider {
      background: var(--color-primary);
    }

    input:checked + &-slider::before {
      transform: translateX(20px);
    }
  }
}
</style>
