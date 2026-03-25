import { ref, type Ref } from 'vue'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): {
  value: Ref<T>
  setValue: (v: T) => void
  removeValue: () => void
} {
  const stored = localStorage.getItem(key)
  const initial = stored ? (JSON.parse(stored) as T) : defaultValue
  const value = ref<T>(initial) as Ref<T>

  function setValue(v: T) {
    value.value = v
    localStorage.setItem(key, JSON.stringify(v))
  }

  function removeValue() {
    value.value = defaultValue
    localStorage.removeItem(key)
  }

  return { value, setValue, removeValue }
}
