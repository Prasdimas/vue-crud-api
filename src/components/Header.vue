<template>
  <header class="bg-white dark:bg-gray-900 shadow-md">
    <div class="flex justify-between items-center px-6 py-4">
      <h1 class="text-xl font-bold text-gray-900 dark:text-white">My CRUD App</h1>

      <!-- Desktop Menu -->
      <nav class="hidden md:flex space-x-6 items-center">
        <RouterLink
          to="/users"
          class="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
        >
          Users 
        </RouterLink>
        <RouterLink
          to="/products"
          class="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
        >
          Products
        </RouterLink>
        <button
          @click="logout"
          class="text-red-600 dark:text-red-400 hover:underline font-medium"
        >
          Logout
        </button>
        <button
          @click="toggleDarkMode"
          class="ml-4 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <template v-if="isDark">
            <svg class="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m8.485-9h-1M4.515 12h-1m14.142-5.657l-.707.707M6.343 17.657l-.707.707m12.02 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"
              />
            </svg>
          </template>
          <template v-else>
            <svg class="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              />
            </svg>
          </template>
        </button>
      </nav>

      <!-- Mobile Menu Button -->
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 text-gray-800 dark:text-white">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div v-if="mobileMenuOpen" class="md:hidden px-6 pb-4 space-y-2">
      <RouterLink
        to="/users"
        class="block text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
        @click="mobileMenuOpen = false"
      >
        Users
      </RouterLink>
      <RouterLink
        to="/products"
        class="block text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
        @click="mobileMenuOpen = false"
      >
        Products
      </RouterLink>
      <button
        @click="logout"
        class="block text-red-600 dark:text-red-400 hover:underline font-medium"
      >
        Logout
      </button>
      <button
        @click="toggleDarkMode"
        class="mt-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <template v-if="isDark">
          🌙 Dark Mode
        </template>
        <template v-else>
          ☀️ Light Mode
        </template>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const isDark = ref(false)
const mobileMenuOpen = ref(false)

const router = useRouter()
const authStore = useAuthStore()

function logout() {
  authStore.logout()
  router.push('/login')
}

function toggleDarkMode() {
  isDark.value = !isDark.value
}

if (localStorage.getItem('darkMode') === 'true') {
  isDark.value = true
}

watchEffect(() => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('darkMode', 'true')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('darkMode', 'false')
  }
})
</script>

<style scoped>

.router-link-active {
  font-weight: bold;
  color: #2563eb; 
}
</style>
