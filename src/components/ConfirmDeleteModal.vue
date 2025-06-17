<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
      <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Konfirmasi Hapus
      </h2>
      <p class="text-gray-700 dark:text-gray-200 mb-6">
        Apakah kamu yakin ingin menghapus <strong>{{ productName }}</strong>?
      </p>
      <div class="flex justify-end space-x-4">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
        >
          Batal
        </button>
        <button
          @click="$emit('confirm')"
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Hapus
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  productName: String
})

defineEmits(['confirm', 'cancel'])
</script>
