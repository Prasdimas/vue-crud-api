<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-xl w-full p-6 max-h-[90vh] overflow-auto relative">
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xl font-bold"
      >
        ×
      </button>

      <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">User Detail</h2>
      <div v-if="loading" class="text-center py-10">Loading...</div>

      <div v-else-if="user">
        <div class="flex items-center space-x-4 mb-4">
          <img :src="user.image" alt="User Avatar" class="w-20 h-20 rounded-full object-cover" />
          <div>
            <h3 class="text-lg font-semibold">{{ user.firstName }} {{ user.lastName }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">{{ user.email }}</p>
          </div>
        </div>

        <ul class="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
          <li><strong>Username:</strong> {{ user.username }}</li>
          <li><strong>Age:</strong> {{ user.age }}</li>
          <li><strong>Gender:</strong> {{ user.gender }}</li>
          <li><strong>Phone:</strong> {{ user.phone }}</li>
          <li><strong>Birth Date:</strong> {{ user.birthDate }}</li>
          <li><strong>Blood Group:</strong> {{ user.bloodGroup }}</li>
          <li><strong>Height:</strong> {{ user.height }} cm</li>
          <li><strong>Weight:</strong> {{ user.weight }} kg</li>
          <li><strong>Eye Color:</strong> {{ user.eyeColor }}</li>
          <li><strong>Hair:</strong> {{ user.hair.color }}, {{ user.hair.type }}</li>
          <li><strong>Address:</strong> {{ user.address.address }}, {{ user.address.city }}, {{ user.address.state }}</li>
          <li><strong>University:</strong> {{ user.university }}</li>
          <li><strong>Company:</strong> {{ user.company.name }} ({{ user.company.department }})</li>
          <li><strong>Role:</strong> {{ user.role }}</li>
        </ul>
      </div>

      <div v-else-if="error" class="text-center py-10 text-red-500">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useUserStore } from '../stores/userStore'

const props = defineProps({
  userId: Number,
  show: Boolean
})

const emit = defineEmits(['close'])

const userStore = useUserStore()

const user = computed(() => userStore.selectedUser)
const loading = computed(() => userStore.loadingDetail)
const error = computed(() => userStore.errorDetail)

watch(
  () => [props.userId, props.show],
  async ([newId, show]) => {
    if (show && newId) {
      await userStore.fetchUserDetail(newId)
    }
  },
  { immediate: true }
)
</script>
