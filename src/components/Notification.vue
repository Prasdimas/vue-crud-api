<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="visible"
      :class="[
        'fixed top-6 right-6 z-50 px-6 py-4 rounded shadow-lg text-white max-w-xs',
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      ]"
    >
      {{ message }}
      {{ dataRespon }}
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  message: String,
  dataRespon : Object,
  type: {
    type: String,
    default: 'success',
  },
  duration: {
    type: Number,
    default: 3000,
  },
})

const visible = ref(true)

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, props.duration)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
