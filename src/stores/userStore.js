import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    total: 0,
    limit: 15,
    skip: 0,
    loading: false,
   searchQuery: '',
    filterKey: '',
    filterValue: ''
  }),

  actions: {
      async fetchUsers() {
      this.loading = true
      try {
        let url = `https://dummyjson.com/users?limit=${this.limit}&skip=${this.skip}`

        if (this.searchQuery) {
          url = `https://dummyjson.com/users/search?q=${this.searchQuery}&limit=${this.limit}&skip=${this.skip}`
        } else if (this.filterKey && this.filterValue) {
          url = `https://dummyjson.com/users/filter?key=${this.filterKey}&value=${this.filterValue}&limit=${this.limit}&skip=${this.skip}`
        }

        const res = await axios.get(url)
        this.users = res.data.users
        this.total = res.data.total
      } catch (e) {
        console.error('Failed to fetch users:', e)
      } finally {
        this.loading = false
      }
    },

    setPage(page) {
      this.skip = (page - 1) * this.limit
      this.fetchUsers()
    },

     async fetchUserDetail(id) {
      this.loadingDetail = true
      this.errorDetail = null
      this.selectedUser = null
      try {
        const res = await axios.get(`https://dummyjson.com/users/${id}`)
        this.selectedUser = res.data
      } catch (e) {
        this.errorDetail = 'Failed to fetch user detail'
        console.error(this.errorDetail, e)
      } finally {
        this.loadingDetail = false
      }
    },
  }
})
