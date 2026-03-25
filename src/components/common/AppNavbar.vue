<template>
  <nav class="navbar">
    <RouterLink to="/home" class="navbar__link" :class="{ active: route.name === 'home' }">
      <span class="navbar__icon">🏠</span>
      <span class="navbar__label">{{ t('nav.home') }}</span>
    </RouterLink>
    <RouterLink to="/review" class="navbar__link" :class="{ active: route.name === 'review' }">
      <span class="navbar__icon">🔄</span>
      <span class="navbar__label">{{ t('nav.review') }}</span>
    </RouterLink>
    <RouterLink to="/stats" class="navbar__link" :class="{ active: route.name === 'stats' }">
      <span class="navbar__icon">📊</span>
      <span class="navbar__label">{{ t('nav.stats') }}</span>
    </RouterLink>
    <RouterLink to="/settings" class="navbar__link" :class="{ active: route.name === 'settings' }">
      <span class="navbar__icon">⚙️</span>
      <span class="navbar__label">{{ t('nav.settings') }}</span>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: var(--color-bg-card);
  border-top: 1px solid var(--color-border);
  padding: $spacing-sm 0;
  z-index: 100;

  &__link {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: $spacing-xs;
    color: var(--color-text-muted);
    transition: color 0.2s;
    text-decoration: none;

    &.active {
      color: var(--color-primary);
    }
  }

  &__icon {
    font-size: 1.25rem;
  }
  &__label {
    font-size: 0.7rem;
    font-weight: 500;
  }
}
</style>
