<template>
  <div class="stats">
    <h2 class="stats__title">{{ t('stats.title') }}</h2>

    <!-- Streak -->
    <div class="stats__streak">
      <span class="stats__streak-icon">🔥</span>
      <div>
        <div class="stats__streak-number">{{ progressStore.streakDays }}</div>
        <div class="stats__streak-label">{{ t('stats.streak') }}</div>
      </div>
    </div>

    <!-- Summary cards -->
    <div class="stats__summary">
      <div class="stats__card stats__card--known">
        <div class="stats__card-number">{{ progressStore.knownCount }}</div>
        <div class="stats__card-label">{{ t('stats.known') }}</div>
      </div>
      <div class="stats__card stats__card--learning">
        <div class="stats__card-number">{{ progressStore.learningCount }}</div>
        <div class="stats__card-label">{{ t('stats.learning') }}</div>
      </div>
    </div>

    <!-- Daily progress -->
    <div class="stats__section">
      <h3 class="stats__section-title">{{ t('stats.dailyProgress') }}</h3>
      <div class="stats__daily">
        <div class="stats__daily-bar">
          <div class="stats__daily-fill" :style="{ width: dailyPercent + '%' }" />
        </div>
        <span>{{ todayCount }} / {{ dailyGoal }}</span>
      </div>
    </div>

    <!-- Weekly activity -->
    <div class="stats__section">
      <h3 class="stats__section-title">{{ t('stats.weeklyActivity') }}</h3>
      <div class="stats__weekly">
        <div v-for="day in weekDays" :key="day.date" class="stats__day">
          <div
            class="stats__day-bar"
            :style="{ height: day.height + 'px' }"
            :class="{ active: day.count > 0 }"
          />
          <span class="stats__day-label">{{ day.label }}</span>
        </div>
      </div>
    </div>

    <!-- Total -->
    <div class="stats__total">
      <span class="stats__total-label">{{ t('stats.totalWords') }}</span>
      <span class="stats__total-number">{{ wordsStore.totalWords }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProgressStore } from '@/stores/progressStore'
import { useWordsStore } from '@/stores/wordsStore'
import { useUserStore } from '@/stores/userStore'
import { getTodayISO, addDays } from '@/utils/dateUtils'

const { t } = useI18n()
const progressStore = useProgressStore()
const wordsStore = useWordsStore()
const userStore = useUserStore()

const dailyGoal = computed(() => userStore.user?.dailyGoal ?? 10)
const todayCount = computed(() => {
  const today = getTodayISO()
  return progressStore.stats.dailyActivity[today] ?? 0
})
const dailyPercent = computed(() => Math.min((todayCount.value / dailyGoal.value) * 100, 100))

const weekDays = computed(() => {
  const days = []
  const today = getTodayISO()
  const dayLabels = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']

  for (let i = 6; i >= 0; i--) {
    const date = addDays(today, -i)
    const count = progressStore.stats.dailyActivity[date] ?? 0
    const d = new Date(date)
    days.push({
      date,
      count,
      label: dayLabels[d.getDay() === 0 ? 6 : d.getDay() - 1],
      height: Math.max(4, Math.min(count * 4, 60))
    })
  }
  return days
})

onMounted(async () => {
  if (wordsStore.words.length === 0) {
    await wordsStore.fetchWords()
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.stats {
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

  &__streak {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    background: var(--color-bg-card);
    border-radius: $radius-md;
    padding: $spacing-lg;

    &-icon {
      font-size: 2rem;
    }
    &-number {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-warning);
    }
    &-label {
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }
  }

  &__summary {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-sm;
  }

  &__card {
    background: var(--color-bg-card);
    border-radius: $radius-md;
    padding: $spacing-md;
    text-align: center;

    &-number {
      font-size: 1.75rem;
      font-weight: 700;
    }
    &-label {
      font-size: 0.75rem;
      color: var(--color-text-muted);
      margin-top: 4px;
    }

    &--known .stats__card-number {
      color: var(--color-known);
    }
    &--learning .stats__card-number {
      color: var(--color-learning);
    }
    &--new .stats__card-number {
      color: var(--color-new);
    }
  }

  &__section {
    background: var(--color-bg-card);
    border-radius: $radius-md;
    padding: $spacing-lg;
  }

  &__section-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    margin-bottom: $spacing-md;
  }

  &__daily {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  &__daily-bar {
    flex: 1;
    height: 10px;
    background: var(--color-bg-input);
    border-radius: 5px;
    overflow: hidden;
  }

  &__daily-fill {
    height: 100%;
    background: var(--color-primary);
    border-radius: 5px;
    transition: width 0.4s ease;
  }

  &__weekly {
    display: flex;
    align-items: flex-end;
    gap: $spacing-sm;
    height: 80px;
  }

  &__day {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;

    &-bar {
      width: 100%;
      background: var(--color-bg-input);
      border-radius: 3px 3px 0 0;
      transition: height 0.3s ease;

      &.active {
        background: var(--color-primary);
        opacity: 0.7;
      }
    }

    &-label {
      font-size: 0.65rem;
      color: var(--color-text-muted);
    }
  }

  &__total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--color-bg-card);
    border-radius: $radius-md;
    padding: $spacing-md $spacing-lg;

    &-label {
      color: var(--color-text-muted);
      font-size: 0.9rem;
    }
    &-number {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-primary);
    }
  }
}
</style>
