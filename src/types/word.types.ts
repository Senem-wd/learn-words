export type WordStatus = 'new' | 'learning' | 'known'
export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'other'

export interface Word {
  id: number
  word: string
  turkish: string
  definition: string
  turkishDefinition: string
  example: string
  collocations: string[]
  partOfSpeech: PartOfSpeech
  frequency: number
}

export interface WordProgress {
  wordId: number
  status: WordStatus
  interval: number
  nextReview: string
  reviewCount: number
  lastSeen: string
}
