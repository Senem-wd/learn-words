<template>
  <button v-if="isSupported" class="audio-btn" @click="speak(word)" title="Telaffuz">🔊</button>
</template>

<script setup lang="ts">
import { useSpeech } from '@/composables/useSpeech'

defineProps<{ word: string }>()
const { speak, isSupported } = useSpeech()
</script>

<style lang="scss" scoped>
.audio-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
}
</style>
