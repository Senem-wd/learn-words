<template>
  <div class="home">
    <div class="home__header">
      <WordCounter :current="progressStore.knownCount" :total="wordsStore.totalAllWords" />
      <div class="home__goal">
        <span class="home__goal-text">{{ t('home.dailyGoal') }}</span>
        <div class="home__goal-bar">
          <div class="home__goal-fill" :style="{ width: goalPercent + '%' }" />
        </div>
        <span class="home__goal-count">{{ todayCount }}/{{ dailyGoal }}</span>
      </div>
    </div>

    <div v-if="wordsStore.isLoading" class="home__loading">
      {{ t('home.loading') }}
    </div>

    <WordCard v-else :word="wordsStore.currentWord" class="home__card" />

    <div class="home__nav">
      <AppButton variant="secondary" :disabled="!canGoPrev" @click="prev"> ← Geri </AppButton>
      <AppButton variant="primary" :disabled="!canGoNext" @click="next"> İleri → </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWordsStore } from '@/stores/wordsStore'
import { useUserStore } from '@/stores/userStore'
import { useProgressStore } from '@/stores/progressStore'

import WordCard from '@/components/word/WordCard.vue'
import WordCounter from '@/components/word/WordCounter.vue'
import AppButton from '@/components/common/AppButton.vue'

const { t } = useI18n()
const wordsStore = useWordsStore()
const userStore = useUserStore()
const progressStore = useProgressStore()
const dailyGoal = computed(() => userStore.user?.dailyGoal ?? 10)
const todayCount = computed(() => wordsStore.currentIndex + 1)
const goalPercent = computed(() => Math.min((todayCount.value / dailyGoal.value) * 100, 100))

const canGoPrev = computed(() => wordsStore.currentIndex > 0)
const canGoNext = computed(() => wordsStore.currentIndex < dailyGoal.value - 1 && wordsStore.currentIndex < wordsStore.totalWords - 1)

function next() { if (canGoNext.value) wordsStore.nextWord() }
function prev() { if (canGoPrev.value) wordsStore.prevWord() }

onMounted(async () => {
  if (wordsStore.allWords.length === 0) {
    await wordsStore.fetchWords()
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.home {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  padding: $spacing-lg $spacing-md;
  padding-bottom: calc(70px + $spacing-lg);
  max-width: 600px;
  margin: 0 auto;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: $spacing-sm;
  }

  &__goal {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    font-size: 0.85rem;
    color: var(--color-text-muted);
  }

  &__goal-text {
    font-weight: 500;
    white-space: nowrap;
  }

  &__goal-bar {
    width: 80px;
    height: 6px;
    background: var(--color-bg-input);
    border-radius: 3px;
    overflow: hidden;
  }

  &__goal-fill {
    height: 100%;
    background: var(--color-primary);
    border-radius: 3px;
    transition: width 0.4s ease;
  }

  &__goal-count {
    font-size: 0.8rem;
  }

  &__loading {
    text-align: center;
    padding: $spacing-xl;
    color: var(--color-text-muted);
  }

  &__nav {
    display: flex;
    gap: $spacing-md;

    .app-btn {
      flex: 1;
    }
  }
}
</style>
