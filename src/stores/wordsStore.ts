import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Word, PartOfSpeech } from '@/types/word.types'
import { useSettingsStore } from './settingsStore'

export const useWordsStore = defineStore('words', () => {
  const allWords = ref<Word[]>([])
  const currentIndex = ref(0)
  const isLoading = ref(false)

  const filteredWords = computed(() => {
    const settingsStore = useSettingsStore()
    const pos = settingsStore.settings.partOfSpeech
    if (pos === 'all') return allWords.value
    return allWords.value.filter((w) => w.partOfSpeech === pos)
  })

  const words = computed(() => filteredWords.value)
  const currentWord = computed(() => filteredWords.value[currentIndex.value] ?? null)
  const totalWords = computed(() => filteredWords.value.length)
  const totalAllWords = computed(() => allWords.value.length)
  const wordsByPartOfSpeech = computed(
    () => (pos: PartOfSpeech) => allWords.value.filter((w) => w.partOfSpeech === pos)
  )

  async function fetchWords() {
    isLoading.value = true
    try {
      const response = await fetch('/data/words.json')
      const all: Word[] = await response.json()
      allWords.value = all
      currentIndex.value = 0
    } finally {
      isLoading.value = false
    }
  }

  function nextWord() {
    if (currentIndex.value < filteredWords.value.length - 1) {
      currentIndex.value++
    }
  }

  function prevWord() {
    if (currentIndex.value > 0) {
      currentIndex.value--
    }
  }

  function goToIndex(index: number) {
    if (index >= 0 && index < filteredWords.value.length) {
      currentIndex.value = index
    }
  }

  return {
    words,
    allWords,
    currentIndex,
    isLoading,
    currentWord,
    totalWords,
    totalAllWords,
    wordsByPartOfSpeech,
    fetchWords,
    nextWord,
    prevWord,
    goToIndex
  }
})
