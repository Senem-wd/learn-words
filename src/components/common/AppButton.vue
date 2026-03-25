<template>
  <button
    :class="['app-btn', `app-btn--${variant}`, { 'app-btn--full': full }]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost'
  full?: boolean
  disabled?: boolean
}>()
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.app-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-lg;
  border-radius: $radius-sm;
  font-size: 0.95rem;
  font-weight: 600;
  transition:
    opacity 0.2s,
    transform 0.1s;
  cursor: pointer;
  border: none;

  &:active {
    transform: scale(0.97);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &--full {
    width: 100%;
  }

  &--primary {
    background: var(--color-primary);
    color: #fff;
    &:hover:not(:disabled) {
      opacity: 0.88;
    }
  }
  &--secondary {
    background: var(--color-bg-input);
    color: var(--color-text);
    &:hover:not(:disabled) {
      opacity: 0.8;
    }
  }
  &--success {
    background: var(--color-success);
    color: #fff;
    &:hover:not(:disabled) {
      opacity: 0.88;
    }
  }
  &--warning {
    background: var(--color-warning);
    color: #fff;
    &:hover:not(:disabled) {
      opacity: 0.88;
    }
  }
  &--danger {
    background: var(--color-danger);
    color: #fff;
    &:hover:not(:disabled) {
      opacity: 0.88;
    }
  }
  &--ghost {
    background: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    &:hover:not(:disabled) {
      background: var(--color-primary);
      color: #fff;
    }
  }
}
</style>
