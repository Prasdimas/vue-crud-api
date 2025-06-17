<template>
  <form @submit.prevent="submitForm" class="grid grid-cols-2 gap-4">
    <div>
      <label class="dark:text-white">Title</label>
      <input v-model="form.title" placeholder="Title" class="border p-2 rounded w-full" />
        <p v-if="errors.title" class="text-sm text-red-600">{{ errors.title }}</p>
    </div>

    <div>
      <label class="dark:text-white">Brand</label>
      <input v-model="form.brand" placeholder="Brand" class="border p-2 rounded w-full" />
        <p v-if="errors.brand" class="text-sm text-red-600">{{ errors.brand }}</p>
    </div>

    <div class="col-span-2">
      <label class="dark:text-white">Description</label>
      <textarea v-model="form.description" placeholder="Description" class="border p-2 rounded w-full" />
        <p v-if="errors.description" class="text-sm text-red-600">{{ errors.description }}</p>
    </div>

    <div>
      <label class="dark:text-white">Category</label>
<select v-model="form.category" class="border rounded p-2 w-full">
      <option disabled value="">Select Category</option>
      <option v-for="key in filterableProductKeys" :key="key" :value="key">{{ key }}</option>
    </select>
        <p v-if="errors.category" class="text-sm text-red-600">{{ errors.category }}</p>
    </div>

    <div>
      <label class="dark:text-white">Price</label>
      <input v-model.number="form.price" type="text" placeholder="Price" class="border p-2 rounded w-full" />
              <p v-if="errors.price" class="text-sm text-red-600">{{ errors.price }}</p>
    </div>

    <div>
      <label class="dark:text-white">Discount (%)</label>
      <input v-model.text="form.discountPercentage" type="text" placeholder="Discount (%)" class="border p-2 rounded w-full" />
              <p v-if="errors.discountPercentage" class="text-sm text-red-600">{{ errors.discountPercentage }}</p>
    </div>

    <div>
      <label class="dark:text-white">Rating</label>
      <input v-model.text="form.rating" type="text" step="0.1" placeholder="Rating" class="border p-2 rounded w-full" />
                   <p v-if="errors.rating" class="text-sm text-red-600">{{ errors.rating }}</p>
    </div>

    <div>
      <label class="dark:text-white">Stock</label>
      <input v-model.text="form.stock" type="text" placeholder="Stock" class="border p-2 rounded w-full" />
                   <p v-if="errors.stock" class="text-sm text-red-600">{{ errors.stock }}</p>
    </div>

    <div>
      <label class="dark:text-white">SKU</label>
      <input v-model="form.sku" placeholder="SKU" class="border p-2 rounded w-full" />
                   <p v-if="errors.sku" class="text-sm text-red-600">{{ errors.sku }}</p>
    </div>

    <div>
      <label class="dark:text-white">Weight</label>
      <input v-model.text="form.weight" type="text" placeholder="Weight" class="border p-2 rounded w-full" />
                   <p v-if="errors.weight" class="text-sm text-red-600">{{ errors.weight }}</p>
    </div>

    <div>
      <label class="dark:text-white">Width</label>
      <input v-model.text="form.dimensions.width" type="text" placeholder="Width" class="border p-2 rounded w-full" />
                   <p v-if="errors.width" class="text-sm text-red-600">{{ errors.width }}</p>
    </div>

    <div>
      <label class="dark:text-white">Height</label>
      <input v-model.text="form.dimensions.height" type="text" placeholder="Height" class="border p-2 rounded w-full" />
                                     <p v-if="errors.height" class="text-sm text-red-600">{{ errors.height }}</p>
    </div>

    <div>
      <label class="dark:text-white">Depth</label>
      <input v-model.text="form.dimensions.depth" type="text" placeholder="Depth" class="border p-2 rounded w-full" />
                                     <p v-if="errors.depth" class="text-sm text-red-600">{{ errors.depth }}</p>
    </div>

    <div>
      <label class="dark:text-white">Warranty Info</label>
      <input v-model="form.warrantyInformation" placeholder="Warranty Info" class="border p-2 rounded w-full" />
                                     <p v-if="errors.warrantyInformation" class="text-sm text-red-600">{{ errors.warrantyInformation }}</p>
    </div>

    <div>
      <label class="dark:text-white">Shipping Info</label>
      <input v-model="form.shippingInformation" placeholder="Shipping Info" class="border p-2 rounded w-full" />
                                     <p v-if="errors.shippingInformation" class="text-sm text-red-600">{{ errors.shippingInformation }}</p>
    </div>

    <div>
      <label class="dark:text-white">Availability Status</label>
      <input v-model="form.availabilityStatus" placeholder="Availability Status" class="border p-2 rounded w-full" />
                               <p v-if="errors.availabilityStatus" class="text-sm text-red-600">{{ errors.availabilityStatus }}</p>
    </div>

    <div>
      <label class="dark:text-white">Return Policy</label>
      <input v-model="form.returnPolicy" placeholder="Return Policy" class="border p-2 rounded w-full" />
                         <p v-if="errors.returnPolicy" class="text-sm text-red-600">{{ errors.returnPolicy }}</p>
    </div>

    <div>
      <label class="dark:text-white">Min Order Qty</label>
      <input v-model.text="form.minimumOrderQuantity" type="text" placeholder="Min Order Qty" class="border p-2 rounded w-full" />
                   <p v-if="errors.minimumOrderQuantity" class="text-sm text-red-600">{{ errors.minimumOrderQuantity }}</p>
    </div>

    <div class="col-span-2">
      <label class="dark:text-white">Thumbnail URL optional</label>
      <input v-model="form.thumbnail" placeholder="Thumbnail URL" class="border p-2 rounded w-full" />
    </div>

    <div class="col-span-2">
      <label class="dark:text-white">Tags (comma separated)</label>
      <textarea v-model="form.tags" placeholder="Tags (comma separated)" class="border p-2 rounded w-full" />
                   <p v-if="errors.tags" class="text-sm text-red-600">{{ errors.tags }}</p>
    </div>

    <div class="col-span-2 flex justify-between gap-4">
 <button
    type="button"
@click="$emit('submitted')"
    class="bg-red-800 text-white px-4 py-2 rounded flex-1 hover:bg-gray-400"
  >
    Cancel
  </button>

        <button
    type="submit"
    class="bg-blue-600 text-white px-4 py-2 rounded flex-1"
  >
    {{ mode === 'edit' ? 'Update Product' : 'Add Product' }}
  </button>

</div>

    <Notification
v-if="notification.message"
:message="notification.message"
:type="notification.type"
:dataRespon="notification.dataRespon"
/>
  </form>
</template>


<script setup>
import { ref, watch, reactive } from 'vue'
import { useProductStore } from '../stores/productStore'
import Notification from '../components/Notification.vue'
import { filterableProductKeys } from '../constants/keys'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  },
  mode: {
    type: String,
    default: 'add'
  }
})

const emit = defineEmits(['submitted', 'close'])

const notification = ref({
  message: '',
  type: 'success',
  dataRespon: ''
})

const store = useProductStore()

const form = reactive({
  title: '',
  description: '',
  category: '',
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  brand: '',
  sku: '',
  weight: 0,
  dimensions: {
    width: 0,
    height: 0,
    depth: 0
  },
  warrantyInformation: '',
  shippingInformation: '',
  availabilityStatus: '',
  returnPolicy: '',
  minimumOrderQuantity: 1,
  tags: [],
  thumbnail: '',
  images: []
})

const errors = reactive({
  title: '',
  brand: '',
  description: '',
  category: '',
  price: '',
  rating: '',
  stock: '',
  minimumOrderQuantity: '',
})

watch(
  () => props.initialData,
  (val) => {
    Object.assign(form, JSON.parse(JSON.stringify(val)))
  },
  { immediate: true }
)

const validateForm = () => {
  errors.title = !form.title ? 'Title is required' : ''
  errors.brand = !form.brand ? 'Brand is required' : ''
  errors.description = !form.description ? 'Description is required' : ''
  errors.category = !form.category ? 'Category is required' : ''
  errors.price = isNaN(form.price) || form.price <= 0 ? 'Price must be a positive number' : ''
  errors.stock = isNaN(form.stock) || form.stock < 0 ? 'Stock must be a number' : ''
  errors.rating = isNaN(form.rating) || form.rating < 0 || form.rating > 5 ? 'Rating must be between 0-5' : ''
  errors.minimumOrderQuantity =
    isNaN(form.minimumOrderQuantity) || form.minimumOrderQuantity <= 0
      ? 'Min order must be > 0'
      : ''

  return Object.values(errors).every((e) => !e)
}

const submitForm = async () => {
  if (!validateForm()) {
    notification.value = {
      message: 'Please correct the form errors.',
      type: 'error'
    }
    return
  }

  let responseStatus = null

  if (props.mode === 'edit') {
    responseStatus = await store.updateForm(form)
    notification.value = responseStatus
      ? {
          message: 'Update Data berhasil!',
          type: 'success',
          dataRespon: responseStatus
        }
      : {
          message: store.error || 'Gagal update. Coba lagi.',
          type: 'error'
        }
  } else {
    responseStatus = await store.addForm(form)
    notification.value = responseStatus
      ? {
          message: 'Data berhasil Ditambahkan!',
          type: 'success',
          dataRespon: responseStatus
        }
      : {
          message: store.error || 'Gagal tambah. Coba lagi.',
          type: 'error'
        }
  }

  setTimeout(() => {
    emit('submitted')
  }, 5000)
}
</script>
