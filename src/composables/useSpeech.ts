export function useSpeech() {
  const isSupported = 'speechSynthesis' in window

  function speak(word: string, lang = 'en-US') {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = lang
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }

  return { speak, isSupported }
}
