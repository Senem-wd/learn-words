<template>
  <div class="review">
    <h2 class="review__title">{{ t('review.title') }}</h2>

    <div v-if="completed" class="review__completed">
      <div class="review__completed-icon">🎉</div>
      <p>{{ t('review.completed') }}</p>
    </div>

    <div v-else-if="reviewWords.length === 0" class="review__empty">
      <div class="review__empty-icon">✅</div>
      <p>{{ t('review.noWords') }}</p>
    </div>

    <template v-else>
      <div class="review__progress">
        <div class="review__progress-bar">
          <div class="review__progress-fill" :style="{ width: progressPercent + '%' }" />
        </div>
        <span class="review__progress-text"
          >{{ currentReviewIndex + 1 }}/{{ reviewWords.length }}</span
        >
      </div>

      <WordCard v-if="currentReviewWord" :word="currentReviewWord" />

      <div class="review__actions">
        <AppButton variant="danger" @click="selectStatus('new')">
          {{ t('status.new') }}
        </AppButton>
        <AppButton variant="warning" @click="selectStatus('learning')">
          {{ t('status.learning') }}
        </AppButton>
        <AppButton variant="success" @click="selectStatus('known')">
          {{ t('status.known') }}
        </AppButton>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProgressStore } from '@/stores/progressStore'
import { useWordsStore } from '@/stores/wordsStore'
import type { WordStatus } from '@/types/word.types'
import WordCard from '@/components/word/WordCard.vue'
import AppButton from '@/components/common/AppButton.vue'

const { t } = useI18n()
const progressStore = useProgressStore()
const wordsStore = useWordsStore()

const currentReviewIndex = ref(0)
const completed = ref(false)

const reviewWords = computed(() => progressStore.wordsForReview)

const currentReviewWord = computed(() => {
  const entry = reviewWords.value[currentReviewIndex.value]
  if (!entry) return null
  return wordsStore.words.find((w) => w.id === entry.wordId) ?? null
})

const progressPercent = computed(() =>
  reviewWords.value.length > 0 ? (currentReviewIndex.value / reviewWords.value.length) * 100 : 0
)

function selectStatus(status: WordStatus) {
  const entry = reviewWords.value[currentReviewIndex.value]
  if (!entry) return

  progressStore.setStatus(entry.wordId, status)

  if (currentReviewIndex.value < reviewWords.value.length - 1) {
    currentReviewIndex.value++
  } else {
    completed.value = true
  }
}

onMounted(async () => {
  if (wordsStore.words.length === 0) {
    await wordsStore.fetchWords()
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.review {
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

  &__completed,
  &__empty {
    text-align: center;
    padding: $spacing-xl;
    background: var(--color-bg-card);
    border-radius: $radius-lg;
    color: var(--color-text-muted);
  }

  &__completed-icon,
  &__empty-icon {
    font-size: 3rem;
    margin-bottom: $spacing-md;
  }

  &__progress {
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }

  &__progress-bar {
    flex: 1;
    height: 8px;
    background: var(--color-bg-input);
    border-radius: 4px;
    overflow: hidden;
  }

  &__progress-fill {
    height: 100%;
    background: var(--color-primary);
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  &__progress-text {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    white-space: nowrap;
  }

  &__actions {
    display: flex;
    gap: $spacing-sm;

    .app-btn {
      flex: 1;
    }
  }
}
</style>
