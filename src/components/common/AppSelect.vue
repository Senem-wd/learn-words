<template>
  <div class="app-select">
    <label v-if="label" class="app-select__label">{{ label }}</label>
    <select
      :value="modelValue"
      :class="['app-select__field', { 'app-select__field--error': error }]"
      v-bind="$attrs"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
    <span v-if="error" class="app-select__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string | number
  label?: string
  placeholder?: string
  error?: string
  options: { value: string | number; label: string }[]
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.app-select {
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
    cursor: pointer;
    transition: border-color 0.2s;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 32px;

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
