<template>
  <span :class="['badge', `badge--${variant}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'new' | 'learning' | 'known' | 'primary' | 'default'
}>()
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.badge {
  display: inline-block;
  padding: 2px $spacing-sm;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;

  &--new {
    background: rgba(107, 114, 128, 0.15);
    color: var(--color-new);
  }
  &--learning {
    background: rgba(245, 158, 11, 0.15);
    color: var(--color-learning);
  }
  &--known {
    background: rgba(16, 185, 129, 0.15);
    color: var(--color-known);
  }
  &--primary {
    background: rgba(79, 70, 229, 0.15);
    color: var(--color-primary);
  }
  &--default {
    background: var(--color-bg-input);
    color: var(--color-text-muted);
  }
}
</style>
