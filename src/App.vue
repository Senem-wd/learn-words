<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppNavbar from './components/common/AppNavbar.vue'

const route = useRoute()
const showNavbar = computed(() =>
  ['home', 'review', 'stats', 'settings'].includes(String(route.name))
)
</script>

<template>
  <RouterView />
  <AppNavbar v-if="showNavbar" />
</template>
