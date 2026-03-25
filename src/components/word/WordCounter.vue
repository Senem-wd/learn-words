<template>
  <div class="word-counter">
    <span class="word-counter__current">{{ current }}</span>
    <span class="word-counter__sep">/</span>
    <span class="word-counter__total">{{ total }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ current: number; total: number }>()
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.word-counter {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-weight: 600;

  &__current {
    font-size: 1.25rem;
    color: var(--color-primary);
  }
  &__sep {
    color: var(--color-text-muted);
  }
  &__total {
    font-size: 1rem;
    color: var(--color-text-muted);
  }
}
</style>
