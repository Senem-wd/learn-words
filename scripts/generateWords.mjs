import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const WORDLIST_PATH = join(__dirname, 'wordlist.txt')
const OUTPUT_PATH = join(__dirname, '../public/data/words.json')
const PROGRESS_PATH = join(__dirname, 'progress.json')

const DELAY_MS = 400
const BATCH_SAVE_EVERY = 50

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getPartOfSpeech(meanings) {
  if (!meanings || meanings.length === 0) return 'other'
  const pos = meanings[0].partOfSpeech?.toLowerCase() ?? ''
  if (pos === 'noun') return 'noun'
  if (pos === 'verb') return 'verb'
  if (pos === 'adjective') return 'adjective'
  if (pos === 'adverb') return 'adverb'
  return 'other'
}

async function fetchDefinition(word) {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    if (!res.ok) return null
    const data = await res.json()
    const entry = data[0]
    if (!entry) return null

    let definition = ''
    let example = ''

    for (const meaning of entry.meanings) {
      for (const def of meaning.definitions) {
        if (!definition && def.definition) {
          definition = def.definition
        }
        if (!example && def.example) {
          example = def.example
        }
        if (definition && example) break
      }
      if (definition && example) break
    }

    return { definition: definition || '', example: example || '', meanings: entry.meanings }
  } catch {
    return null
  }
}

async function translateToTurkish(text) {
  if (!text) return ''
  try {
    const encoded = encodeURIComponent(text.slice(0, 200))
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encoded}&langpair=en|tr`
    )
    if (!res.ok) return ''
    const data = await res.json()
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText
    }
    return ''
  } catch {
    return ''
  }
}

async function main() {
  const words = readFileSync(WORDLIST_PATH, 'utf-8')
    .split('\n')
    .map(w => w.trim())
    .filter(Boolean)

  console.log(`📋 ${words.length} kelime bulundu`)

  // Daha önce kaydedilmiş ilerlemeyi yükle
  let results = []
  let startFrom = 0
  if (existsSync(PROGRESS_PATH)) {
    try {
      results = JSON.parse(readFileSync(PROGRESS_PATH, 'utf-8'))
      startFrom = results.length
      console.log(`⏩ Devam ediliyor: ${startFrom}. kelimeden başlanıyor`)
    } catch {
      results = []
    }
  }

  for (let i = startFrom; i < words.length; i++) {
    const word = words[i]
    const rank = i + 1

    process.stdout.write(`[${rank}/${words.length}] ${word}... `)

    // 1. İngilizce tanım + örnek cümle
    const dictData = await fetchDefinition(word)
    await sleep(DELAY_MS)

    const definition = dictData?.definition || `The word "${word}" and its common usage`
    const example = dictData?.example || `Please use "${word}" correctly in a sentence.`
    const partOfSpeech = getPartOfSpeech(dictData?.meanings)

    // 2. Türkçe kelime çevirisi
    const turkish = await translateToTurkish(word)
    await sleep(DELAY_MS)

    // 3. Türkçe tanım çevirisi
    const turkishDefinition = await translateToTurkish(definition)
    await sleep(DELAY_MS)

    const wordObj = {
      id: rank,
      word,
      turkish: turkish || word,
      definition,
      turkishDefinition: turkishDefinition || '',
      example,
      collocations: [],
      partOfSpeech,
      frequency: Math.max(1, 3000 - rank + 1)
    }

    results.push(wordObj)
    console.log(`✓ "${turkish || '?'}"`)

    // Her BATCH_SAVE_EVERY kelimede bir ara kayıt
    if (rank % BATCH_SAVE_EVERY === 0) {
      writeFileSync(PROGRESS_PATH, JSON.stringify(results, null, 2))
      console.log(`💾 Ara kayıt: ${rank} kelime kaydedildi`)
    }
  }

  // Final kayıt
  writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2))
  console.log(`\n✅ Tamamlandı! ${results.length} kelime → public/data/words.json`)

  // Progress dosyasını temizle
  if (existsSync(PROGRESS_PATH)) {
    writeFileSync(PROGRESS_PATH, '[]')
  }
}

main().catch(err => {
  console.error('❌ Hata:', err.message)
  process.exit(1)
})
