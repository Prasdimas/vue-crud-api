<template>
  <form @submit.prevent="onSubmit"
    class="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded shadow-md mx-auto"
  >
    <h2 class="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
      Login
    </h2>

    <div class="mb-4">
      <label class="block mb-1 text-gray-700 dark:text-gray-300">Username</label>
      <input
        v-model="username"
        type="text"
        required
        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="mb-4">
      <label class="block mb-1 text-gray-700 dark:text-gray-300">Password</label>
      <div class="relative">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          required
          class="w-full border rounded px-3 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          @click="togglePassword"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 dark:text-gray-600 hover:underline focus:outline-none"
        >
          {{ showPassword ? 'Hide' : 'Show' }}
        </button>
      </div>
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 my-6"
    >
      <span v-if="loading">Logging in...</span>
      <span v-else>Login</span>
    </button>

    <Notification
      v-if="notification.message"
      :message="notification.message"
      :type="notification.type"
    />
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Notification from '../components/Notification.vue'

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)
const notification = ref({ message: '', type: 'success' })

const router = useRouter()
const authStore = useAuthStore()

function togglePassword() {
  showPassword.value = !showPassword.value
}

async function onSubmit() {
  loading.value = true
  error.value = ''
  const success = await authStore.login(username.value, password.value)
  loading.value = false

  if (success) {
    notification.value = {
      message: 'Login berhasil!',
      type: 'success',
    }
    setTimeout(() => router.push('/users'), 1500)
  } else {
    notification.value = {
      message: authStore.error || 'Login gagal. Coba lagi.',
      type: 'error',
    }
  }
}
</script>
