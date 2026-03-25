<template>
  <div class="word-card" v-if="word">
    <div class="word-card__header">
      <AppBadge variant="primary">{{ t(`partOfSpeech.${word.partOfSpeech}`) }}</AppBadge>
      <WordAudio :word="word.word" />
    </div>

    <div class="word-card__main">
      <h1 class="word-card__word">{{ word.word }}</h1>
      <p class="word-card__translation">{{ word.turkish }}</p>
    </div>

    <div class="word-card__section">
      <h3 class="word-card__section-title">{{ t('word.meaning') }}</h3>
      <p class="word-card__text">{{ word.definition }}</p>
      <p class="word-card__text word-card__text--muted">{{ word.turkishDefinition }}</p>
    </div>

    <div class="word-card__section">
      <h3 class="word-card__section-title">{{ t('word.example') }}</h3>
      <p class="word-card__example">{{ word.example }}</p>
    </div>

    <div class="word-card__section">
      <h3 class="word-card__section-title">{{ t('word.collocations') }}</h3>
      <WordCollocation :collocations="word.collocations" />
    </div>

    <WordStatus :wordId="word.id" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Word } from '@/types/word.types'
import AppBadge from '@/components/common/AppBadge.vue'
import WordAudio from './WordAudio.vue'
import WordCollocation from './WordCollocation.vue'
import WordStatus from './WordStatus.vue'

defineProps<{ word: Word | null }>()
const { t } = useI18n()
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.word-card {
  background: var(--color-bg-card);
  border-radius: $radius-lg;
  padding: $spacing-xl;
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__main {
    text-align: center;
    padding: $spacing-md 0;
  }

  &__word {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: $spacing-xs;
  }

  &__translation {
    font-size: 1.25rem;
    color: var(--color-primary);
    font-weight: 500;
  }

  &__section-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    margin-bottom: $spacing-xs;
  }

  &__text {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--color-text);

    &--muted {
      color: var(--color-text-muted);
      margin-top: 4px;
    }
  }

  &__example {
    font-style: italic;
    color: var(--color-text);
    font-size: 0.95rem;
    line-height: 1.6;
    padding: $spacing-sm $spacing-md;
    border-left: 3px solid var(--color-primary);
    background: var(--color-bg-input);
    border-radius: 0 $radius-sm $radius-sm 0;
  }
}
</style>
