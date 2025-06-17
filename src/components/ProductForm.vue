<template>
  <form @submit.prevent="submitForm" class="grid grid-cols-2 gap-4">
    <div>
      <label class="dark:text-white">Title</label>
      <input v-model="form.title" placeholder="Title" class="border p-2 rounded w-full" />
    </div>

    <div>
      <label class="dark:text-white">Brand</label>
      <input v-model="form.brand" placeholder="Brand" class="border p-2 rounded w-full" />
    </div>

    <div class="col-span-2">
      <label class="dark:text-white">Description</label>
      <textarea v-model="form.description" placeholder="Description" class="border p-2 rounded w-full" />
    </div>

    <div>
      <label class="dark:text-white">Category</label>
      <input v-model="form.category" placeholder="Category" class="border p-2 rounded w-full" />
    </div>

    <div>
      <label class="dark:text-white">Price</label>
      <input v-model.number="form.price" type="text" placeholder="Price" class="border p-2 rounded w-full" />
    </div>

    <div>
      <label class="dark:text-white">Discount (%)</label>
      <input v-model.text="form.discountPercentage" type="text" placeholder="Discount (%)" class="border p-2 rounded w-full" />
    </div>

    <div>
      <label class="dark:text-white">Rating</label>
      <input v-model.text="form.rating" type="text" step="0.1" placeholder="Rating" class="border p-2 rounded w-full" />
    </div>

    <div>
      <label class="dark:text-white">Stock</label>
      <input v-model.text="form.stock" type="text" placeholder="Stock" class="border p-2 rounded w-full" />
    </div>

    <div>
      <label class="dark:text-white">SKU</label>
      <input v-model="form.sku" placeholder="SKU" class="border p-2 rounded w-full" />
    </div>

    <div>
      <label class="dark:text-white">Weight</label>
      <input v-model.text="form.weight" type="text" placeholder="Weight" class="border p-2 rounded w-full" />
    </div>

    <div>
      <label class="dark:text-white">Width</label>
      <input v-model.text="form.dimensions.width" type="text" placeholder="Width" class="border p-2 rounded w-full" />
    </div>

    <div>
      <label class="dark:text-white">Height</label>
      <input v-model.text="form.dimensions.height" type="text" placeholder="Height" class="border p-2 rounded w-full" />
    </div>

    <div>
      <label class="dark:text-white">Depth</label>
      <input v-model.text="form.dimensions.depth" type="text" placeholder="Depth" class="border p-2 rounded w-full" />
    </div>

    <div>
      <label class="dark:text-white">Warranty Info</label>
      <input v-model="form.warrantyInformation" placeholder="Warranty Info" class="border p-2 rounded w-full" />
    </div>

    <div>
      <label class="dark:text-white">Shipping Info</label>
      <input v-model="form.shippingInformation" placeholder="Shipping Info" class="border p-2 rounded w-full" />
    </div>

    <div>
      <label class="dark:text-white">Availability Status</label>
      <input v-model="form.availabilityStatus" placeholder="Availability Status" class="border p-2 rounded w-full" />
    </div>

    <div>
      <label class="dark:text-white">Return Policy</label>
      <input v-model="form.returnPolicy" placeholder="Return Policy" class="border p-2 rounded w-full" />
    </div>

    <div>
      <label class="dark:text-white">Min Order Qty</label>
      <input v-model.text="form.minimumOrderQuantity" type="text" placeholder="Min Order Qty" class="border p-2 rounded w-full" />
    </div>

    <div class="col-span-2">
      <label class="dark:text-white">Thumbnail URL</label>
      <input v-model="form.thumbnail" placeholder="Thumbnail URL" class="border p-2 rounded w-full" />
    </div>

    <div class="col-span-2">
      <label class="dark:text-white">Tags (comma separated)</label>
      <textarea v-model="form.tags" placeholder="Tags (comma separated)" class="border p-2 rounded w-full" />
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

const emit = defineEmits(['submitted','close'])
const notification = ref({ message: '', type: 'success' ,dataRespon : ""})

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
watch(() => props.initialData, (val) => {
  Object.assign(form, JSON.parse(JSON.stringify(val)))
}, { immediate: true })

const submitForm = async () => {
  if (props.mode === 'edit') {
    const editStatus = await store.updateForm(form);
     if (editStatus) {
    notification.value = {
      message: 'Update Data berhasil!',
      type: 'success',
      dataRespon : editStatus
    }
  } else {
    notification.value = {
      message: store.error || 'gagal. Coba lagi.',
      type: 'error',
    }
  }
  } else {
   const editStatus = await store.addForm(form);
       if (editStatus) {
    notification.value = {
      message: 'Data berhasil Ditambahkan !',
      type: 'success',
      dataRespon : editStatus
    }
  } else {
    notification.value = {
      message: store.error || 'gagal. Coba lagi.',
      type: 'error',
    }
  }
  }
//   emit('submitted') 
  setTimeout(() => {
    emit('submitted')
  }, 3000)
}
</script>
