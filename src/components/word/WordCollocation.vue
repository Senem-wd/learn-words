<template>
  <div class="collocations">
    <span v-for="col in collocations" :key="col" class="collocations__item">
      {{ col }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ collocations: string[] }>()
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.collocations {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-xs;

  &__item {
    padding: 4px $spacing-sm;
    background: var(--color-bg-input);
    border-radius: $radius-sm;
    font-size: 0.8rem;
    color: var(--color-text-muted);
    border: 1px solid var(--color-border);
  }
}
</style>
