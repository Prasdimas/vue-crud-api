<!-- DetailModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-xl w-full p-6 max-h-[90vh] overflow-auto relative">
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xl font-bold"
      >
        ×
      </button>

      <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{{ title }}</h2>

      <div v-if="loading" class="text-center py-10">Loading...</div>

      <div v-else-if="detailData">
              <div v-if="detailData.image">
        <div class="flex items-center space-x-4 mb-4">
          <img :src="detailData.image" alt="User Avatar" class="w-20 h-20 rounded-full object-cover" />
          <div>
            <h3 class="text-lg font-semibold dark:text-white">{{ detailData.firstName }} {{ detailData.lastName }}</h3>
          </div>
        </div>
</div>
        <ul class="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
          <li v-for="(label, key) in fields" :key="key">
            <strong>{{ label }}:</strong> {{ getValue(detailData, key) }}
          </li>
        </ul>
      </div>

      <div v-else-if="error" class="text-center py-10 text-red-500">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: Boolean,
  loading: Boolean,
  error: String,
  title: String,
  detailData: Object,
  fields: Object, 
})

const getValue = (obj, key) => {
  return key.split('.').reduce((acc, part) => acc?.[part], obj) ?? "-"
}
</script>
