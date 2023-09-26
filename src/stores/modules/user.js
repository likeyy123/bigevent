import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user-like', () => {
  const token = ref('')
  const setToken = (newToken) => {
    token.value = newToken
  }
  const removeToken = () => {
    token.value = ''
  }

  return {
    token,
    setToken,
    removeToken
  }
})
