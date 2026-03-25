import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/user.types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const isRegistered = computed(() => user.value !== null)
  const fullName = computed(() =>
    user.value ? `${user.value.firstName} ${user.value.lastName}` : ''
  )

  function register(userData: User) {
    user.value = userData
    saveToStorage()
  }

  function updateUser(partial: Partial<User>) {
    if (user.value) {
      user.value = { ...user.value, ...partial }
      saveToStorage()
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('voca_user')
  }

  function loadFromStorage() {
    const stored = localStorage.getItem('voca_user')
    if (stored) {
      try {
        user.value = JSON.parse(stored)
      } catch {
        user.value = null
      }
    }
  }

  function saveToStorage() {
    if (user.value) {
      localStorage.setItem('voca_user', JSON.stringify(user.value))
    }
  }

  return { user, isRegistered, fullName, register, updateUser, logout, loadFromStorage }
})
