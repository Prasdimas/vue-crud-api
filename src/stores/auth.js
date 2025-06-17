import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null,
    loading: false,
    error: null,
  }),
  actions: {
    async login(username, password) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('https://dummyjson.com/auth/login', {
          username,
          password
        }, {
          headers: { 'Content-Type': 'application/json' }
        })
        this.token = response.data.token
        this.user = response.data
        localStorage.setItem('token', response.data.accessToken);
localStorage.setItem('data', JSON.stringify(response.data));
        this.loading = false
        return true
      } catch (e) {
        this.error = e.response?.data?.message || 'Login failed'
        this.loading = false
        return false
      }
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('data')
    }
  }
})
