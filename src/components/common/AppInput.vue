<template>
  <div class="app-input">
    <label v-if="label" :for="inputId" class="app-input__label">{{ label }}</label>
    <input
      :id="inputId"
      v-bind="$attrs"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :class="['app-input__field', { 'app-input__field--error': error }]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="error" class="app-input__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: string | number
  label?: string
  type?: string
  placeholder?: string
  error?: string
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()

const inputId = computed(() => `input-${Math.random().toString(36).slice(2, 7)}`)
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.app-input {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;

  &__label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-muted);
  }

  &__field {
    padding: $spacing-sm $spacing-md;
    border-radius: $radius-sm;
    border: 1.5px solid var(--color-border);
    background: var(--color-bg-input);
    color: var(--color-text);
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: var(--color-primary);
    }
    &--error {
      border-color: var(--color-danger);
    }
  }

  &__error {
    font-size: 0.75rem;
    color: var(--color-danger);
  }
}
</style>
