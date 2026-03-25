import type { Word, PartOfSpeech } from '@/types/word.types'

export function filterByPartOfSpeech(words: Word[], pos: PartOfSpeech | 'all'): Word[] {
  if (pos === 'all') return words
  return words.filter((w) => w.partOfSpeech === pos)
}

export function sortByFrequency(words: Word[]): Word[] {
  return [...words].sort((a, b) => b.frequency - a.frequency)
}

export function searchWords(words: Word[], query: string): Word[] {
  const q = query.toLowerCase().trim()
  if (!q) return words
  return words.filter(
    (w) => w.word.toLowerCase().includes(q) || w.turkish.toLowerCase().includes(q)
  )
}
