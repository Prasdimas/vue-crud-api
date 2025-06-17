<template>
  <div class="mt-4 flex justify-center gap-2 flex-wrap">
    <!-- Prev Button -->
    <button
      @click="handlePrevSet"
      :disabled="currentSet === 0"
      class="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-sm dark:text-white disabled:opacity-50"
    >
      Prev
    </button>

    <!-- Page Numbers -->
    <button
      v-for="page in visiblePages"
      :key="page"
      @click="emitPage(page)"
      :class="[
        'px-3 py-1 rounded text-sm',
        page === modelValue
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 dark:bg-gray-600 text-black dark:text-white'
      ]"
    >
      {{ page }}
    </button>

    <!-- Next Button -->
    <button
      @click="handleNextSet"
      :disabled="endPage >= totalPages"
      class="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-sm disabled:opacity-50 dark:text-white"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  modelValue: Number,
  totalPages: Number,
})

const emit = defineEmits(['update:modelValue'])

const visibleCount = 5
const currentSet = computed(() => Math.floor((props.modelValue - 1) / visibleCount))
const startPage = computed(() => currentSet.value * visibleCount + 1)
const endPage = computed(() => Math.min(startPage.value + visibleCount - 1, props.totalPages))

const visiblePages = computed(() => {
  const pages = []
  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i)
  }
  return pages
})

function emitPage(page) {
  emit('update:modelValue', page)
}

function handleNextSet() {
  const nextStart = endPage.value + 1
  if (nextStart <= props.totalPages) {
    emit('update:modelValue', nextStart)
  }
}

function handlePrevSet() {
  const prevStart = startPage.value - visibleCount
  if (prevStart > 0) {
    emit('update:modelValue', prevStart)
  } else {
    emit('update:modelValue', 1)
  }
}
</script>
