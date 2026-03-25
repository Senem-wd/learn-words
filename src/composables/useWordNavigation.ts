import { computed } from 'vue'
import { useWordsStore } from '@/stores/wordsStore'

export function useWordNavigation() {
  const wordsStore = useWordsStore()

  const canGoNext = computed(() => wordsStore.currentIndex < wordsStore.totalWords - 1)
  const canGoPrev = computed(() => wordsStore.currentIndex > 0)

  function next() {
    if (canGoNext.value) wordsStore.nextWord()
  }

  function prev() {
    if (canGoPrev.value) wordsStore.prevWord()
  }

  return { next, prev, canGoNext, canGoPrev }
}
