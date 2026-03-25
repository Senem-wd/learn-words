<template>
  <div class="word-status">
    <button
      v-for="s in statuses"
      :key="s.value"
      :class="['word-status__btn', `word-status__btn--${s.value}`, { active: current === s.value }]"
      @click="select(s.value)"
    >
      {{ t(`status.${s.value}`) }} 
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProgressStore } from '@/stores/progressStore'
import type { WordStatus } from '@/types/word.types'

const props = defineProps<{ wordId: number }>()
const { t } = useI18n()
const progressStore = useProgressStore()

const statuses: { value: WordStatus }[] = [
  { value: 'tekrar' },
  { value: 'biliyorum' }
]

const current = computed(() => progressStore.progress[props.wordId]?.status ?? null)

function select(status: WordStatus) {
  progressStore.setStatus(props.wordId, status)
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.word-status {
  display: flex;
  gap: $spacing-sm;

  &__btn {
    flex: 1;
    padding: $spacing-sm;
    border-radius: $radius-sm;
    font-size: 0.875rem;
    font-weight: 600;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
    background: var(--color-bg-input);
    color: var(--color-text-muted);

    &--tekrar.active {
      background: rgba(245, 158, 11, 0.15);
      color: var(--color-learning);
      border-color: var(--color-learning);
    }
    &--biliyorum.active {
      background: rgba(16, 185, 129, 0.15);
      color: var(--color-known);
      border-color: var(--color-known);
    }

    &:hover:not(.active) {
      background: var(--color-border);
    }
  }
}
</style>
