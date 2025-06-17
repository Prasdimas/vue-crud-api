<template>
  <div class="p-4 min-h-[95vh] dark:bg-gray-800">
    <h1 class="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Product List</h1>

    <!-- Filter & Search -->
    <div class="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      <input
        v-model="localSearchQuery"
        type="search"
       :placeholder="isSelectActive ? 'Nonaktif karena filter aktif' : 'Search...'"
        :disabled="isSelectActive"
        :title="isSelectActive ? 'Nonaktif karena filter aktif' : ''"
        class="border rounded p-2 mb-2 disabled:bg-gray-200"
      />
      <select
        v-model="localSelectedKey"
        :disabled="isSearchActive"
        :title="isSearchActive ? 'Nonaktif karena pencarian aktif' : ''"
        class="border rounded p-2 mb-2 disabled:bg-gray-200"
      >
        <option disabled value="">Pilih filter</option>
        <option v-for="key in filterableProductKeys" :key="key" :value="key">{{ key }}</option>
      </select>
      <div class="flex space-x-2 mb-2">
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
        <p class="mb-2 text-gray-800 dark:text-white">Silahkan Pilih salah satu search / kategori salah satu akan menjadi nonaktif</p>

    <div class="flex justify-end mb-1">
      <button
        @click="openForm('add')"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Add Product
      </button>
    </div>

    <div class="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">#</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">title</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">description</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hidden lg:table-cell">stock</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hidden lg:table-cell">category</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hidden lg:table-cell">price</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(product, i) in store.products"
            :key="product.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="px-4 py-2 dark:text-gray-300">{{ i + 1 + store.skip }}</td>
            <td class="px-4 py-2 whitespace-nowrap dark:text-gray-300">
              <span class="hidden lg:inline">{{ product.title }}</span>
              <span class="inline lg:hidden">{{ truncate(product.title) }}</span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap dark:text-gray-300">
              <span class="hidden lg:inline">{{ crop(product.description) }}</span>
              <span class="inline lg:hidden">{{ truncate(product.description) }}</span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap hidden lg:table-cell dark:text-gray-300">
              {{ product.stock }}
            </td>
            <td class="px-4 py-2 whitespace-nowrap hidden lg:table-cell dark:text-gray-300">
              <span>{{ product.category }}</span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap hidden lg:table-cell dark:text-gray-300">
              {{ product.price }}
            </td>
            <td class="px-4 py-2">
              <div class="flex flex-wrap gap-2 sm:flex-nowrap">
                <button
                  @click="openModal(product.id)"
                  class="flex-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                >
                  Detail
                </button>
                <button
                  @click="openForm('edit', product)"
                  class="flex-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  @click="openDeleteModal(product)"
                  class="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modals -->
      <DetailModal
        :title="detailTitle"
        :show="showModal"
        :loading="isLoading"
        :error="errorMessage"
        :detailData="detailData"
        :fields="detailFields"
        @close="closeModal"
      />
      <FormModal :title="formTitle" :show="showFormModal" @close="closeForm">
        <ProductForm
          :initialData="formProductData"
          :mode="formMode"
          @submitted="onFormSubmitted"
        />
      </FormModal>
      <ConfirmDeleteModal
        v-if="showConfirmDelete"
        :show="showConfirmDelete"
        :productName="selectedProduct?.title"
        @confirm="confirmDelete"
        @cancel="showConfirmDelete = false"
      />
      <Notification
        v-if="notification.message"
        :message="notification.message"
        :type="notification.type"
        :dataRespon="notification.dataRespon"
      />
    </div>

    <Pagination v-model="page" :total-pages="totalPages" v-show="!localSelectedKey"/>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useProductStore } from '../stores/productStore'
import Pagination from '../components/Pagination.vue'
import DetailModal from '../components/DetailModal.vue'
import { filterableProductKeys } from '../constants/keys'
import ProductForm from '../components/ProductForm.vue'
import FormModal from '../components/FormModal.vue'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.vue'
import Notification from '../components/Notification.vue'

const store = useProductStore()

const notification = ref({ message: '', type: 'success', dataRespon: '' })
const showConfirmDelete = ref(false)
const selectedProduct = ref(null)
const localSearchQuery = ref('')
const localSelectedKey = ref('')

const detailTitle = ref('')
const detailFields = ref({})
const detailData = ref({})
const isLoading = ref(false)
const errorMessage = ref('')

const selectedProductId = ref(null)
const showModal = ref(false)
const page = ref(1)
const totalPages = computed(() => Math.ceil(store.total / store.limit))
const showFormModal = ref(false)
const formMode = ref('add')
const formProductData = ref({})
const formTitle = ref('')

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
  formMode.value = mode
  formTitle.value = mode === 'edit' ? 'Edit Product' : 'Add Product'
  formProductData.value = mode === 'edit' ? JSON.parse(JSON.stringify(product)) : {}
  showFormModal.value = true
}

function closeForm() {
  showFormModal.value = false
}

async function onFormSubmitted() {
  await store.fetchProducts()
  closeForm()
}

async function openModal(id) {
  selectedProductId.value = id
  showModal.value = true
  detailTitle.value = 'Product Detail'
  detailFields.value = {
    title: 'Title',
    description: 'Description',
    category: 'Category',
    price: 'Price',
    discountPercentage: 'Discount',
    rating: 'Rating',
    stock: 'Stock',
    brand: 'Brand',
    sku: 'SKU',
    'dimensions.width': 'Width',
    'dimensions.height': 'Height',
    'dimensions.depth': 'Depth',
    returnPolicy: 'Return Policy',
    shippingInformation: 'Shipping Info',
    'meta.barcode': 'Barcode'
  }

  isLoading.value = true
  errorMessage.value = ''
  try {
    await store.fetchProductDetail(id)
    detailData.value = store.selectedProduct
  } catch (e) {
    errorMessage.value = 'Failed to load product detail'
  } finally {
    isLoading.value = false
  }
}

function closeModal() {
  showModal.value = false
  selectedProductId.value = null
}

function truncate(text, length = 8) {
  if (!text) return ''
  return text.length > length ? text.slice(0, length) + '...' : text
}

function crop(text, length = 40) {
  if (!text) return ''
  return text.length > length ? text.slice(0, length) + '...' : text
}

function openDeleteModal(product) {
  selectedProduct.value = product
  showConfirmDelete.value = true
}

async function confirmDelete() {
  if (selectedProduct.value) {
    const editStatus = await store.deleteProduct(selectedProduct.value.id)
    notification.value = {
      message: editStatus ? 'Delete Data berhasil!' : store.error || 'Gagal. Coba lagi.',
      type: editStatus ? 'success' : 'error',
      dataRespon: editStatus || ''
    }
    showConfirmDelete.value = false
    selectedProduct.value = null
  }
}

watch(page, (newPage) => {
  store.skip = (newPage - 1) * store.limit
  store.fetchProducts()
})

onMounted(() => {
  store.fetchProducts()
})
</script>
