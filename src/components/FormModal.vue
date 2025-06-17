<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-[60rem] w-full shadow-lg 
                max-h-screen overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">{{ title }}</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-800 dark:hover:text-white">
          &times;
        </button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  show: Boolean
})
defineEmits(['close'])
</script>
