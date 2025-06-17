<template>
  <div class="p-4 min-h-[95vh] dark:bg-gray-800">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Product List</h1>
    <span class="font-boldtext-gray-800 dark:text-white">Search dan Kategori silahkan pilih salah satu </span>

    <!-- Filter & Search Container -->
    <div class="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      <!-- Search input -->
      <input
        v-model="localSearchQuery"
        type="search"
        :placeholder="isSelectActive ? 'Nonaktif karena filter aktif' : ''"
        :disabled="isSelectActive"
        :title="isSelectActive ? 'Nonaktif karena filter aktif' : ''"
        class="border rounded p-2 mb-1 disabled:bg-gray-200"
      />

      <!-- Filter select -->
      <select
        v-model="localSelectedKey"
        :disabled="isSearchActive"
        :title="isSearchActive ? 'Nonaktif karena pencarian aktif' : ''"
        class="border rounded p-2 mb-1 disabled:bg-gray-200"
      >
        <option disabled value="">Pilih Kategori</option>
        <option v-for="key in filterableProductKeys" :key="key" :value="key">
          {{ key }}
        </option>
      </select>

      <div class="flex space-x-2 mb-1">
        <button
          @click="applyFilter"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Apply
        </button>
        <button
          @click="resetFilter"
          class="px-4 py-2 bg-gray-400 text-black rounded hover:bg-gray-500"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- Button add -->
    <div class="flex justify-end mb-4">
      <button
        @click="openForm('add')"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Add Product
      </button>
    </div>

    <!-- Product table (ringkas) -->
    <div class="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
      <!-- Table -->
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">#</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Title</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Description</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Category</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i) in store.products" :key="product.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-4 py-2 dark:text-gray-300">{{ i + 1 + store.skip }}</td>
            <td class="px-4 py-2 dark:text-gray-300">{{ product.title }}</td>
            <td class="px-4 py-2 dark:text-gray-300">{{ crop(product.description) }}</td>
            <td class="px-4 py-2 dark:text-gray-300">{{ product.category }}</td>
            <td class="px-4 py-2">
              <button @click="openModal(product.id)" class="px-2 py-1 bg-blue-500 text-white rounded text-sm">Detail</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination v-model="page" :total-pages="totalPages" v-show="!localSelectedKey" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useProductStore } from '../stores/productStore'
import { filterableProductKeys } from '../constants/keys'
import Pagination from '../components/Pagination.vue'

const store = useProductStore()

const localSearchQuery = ref('')
const localSelectedKey = ref('')
const page = ref(1)

const totalPages = computed(() => Math.ceil(store.total / store.limit))

// Disable logic
const isSearchActive = computed(() => localSearchQuery.value.trim() !== '')
const isSelectActive = computed(() => localSelectedKey.value !== '')

function applyFilter() {
  store.searchQuery = localSearchQuery.value.trim()
  store.filterKey = localSelectedKey.value
  store.skip = 0
  store.fetchProducts()
  page.value = 1
}

function resetFilter() {
  localSearchQuery.value = ''
  localSelectedKey.value = ''
  store.searchQuery = ''
  store.filterKey = ''
  store.filterValue = ''
  store.skip = 0
  store.fetchProducts()
  page.value = 1
}

function openForm(mode, product = {}) {
  console.log('Open form', mode, product)
}

function openModal(id) {
  console.log('Open detail modal for ID:', id)
}

function crop(text, length = 40) {
  if (!text) return ''
  return text.length > length ? text.slice(0, length) + '...' : text
}

watch(page, (newPage) => {
  store.skip = (newPage - 1) * store.limit
  store.fetchProducts()
})

onMounted(() => {
  store.fetchProducts()
})
</script>
