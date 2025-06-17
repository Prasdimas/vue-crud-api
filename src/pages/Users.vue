<template>
  <div class="p-4 min-h-[95vh] dark:bg-gray-800">
    <h1 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">User List</h1>

    <!-- Filter & Search Container -->
    <div
      class="flex flex-col sm:flex-row gap-2 mb-4 items-start sm:items-center"
    >
     <input
      v-model="localSearchQuery"
      type="search"
      placeholder="Search users..."
      class="border rounded p-2 mb-2"
    />

    <select v-model="localSelectedKey" class="border rounded p-2 mb-2">
      <option disabled value="">Pilih filter</option>
      <option v-for="key in filterableUserKeys" :key="key" :value="key">{{ key }}</option>
    </select>

    <input
      v-if="localSelectedKey"
      v-model="localFilterValue"
      type="text"
      placeholder="Filter value"
      class="border rounded p-2 mb-2"
    />
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

    <div class="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th
              class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              #
            </th>
            <th
              class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </th>
            <th
              class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </th>
            <th
              class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hidden lg:table-cell"
            >
              Age
            </th>
            <th
              class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hidden lg:table-cell"
            >
              Phone
            </th>
            <th
              class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hidden lg:table-cell"
            >
              Company
            </th>
            <th
              class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody
          class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
        >
          <tr
            v-for="(user, i) in store.users"
            :key="user.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="px-4 py-2 dark:text-gray-300">{{ i + 1 + store.skip }}</td>

            <td class="px-4 py-2 whitespace-nowrap dark:text-gray-300">
              <span class="hidden lg:inline">
                {{ user.firstName + ' ' + user.lastName }}
              </span>
              <span class="inline lg:hidden">
                {{ truncate(user.firstName + ' ' + user.lastName) }}
              </span>
            </td>

            <td class="px-4 py-2 whitespace-nowrap dark:text-gray-300">
              <span class="hidden lg:inline">{{ user.email }}</span>
              <span class="inline lg:hidden">{{ truncate(user.email) }}</span>
            </td>

            <td class="px-4 py-2 whitespace-nowrap hidden lg:table-cell dark:text-gray-300">
              {{ user.age }}
            </td>

            <td class="px-4 py-2 whitespace-nowrap hidden lg:table-cell dark:text-gray-300">
              <span>{{ user.phone }}</span>
            </td>

            <td class="px-4 py-2 whitespace-nowrap hidden lg:table-cell dark:text-gray-300">
              {{ user.company?.name || '-' }}
            </td>

            <td class="px-4 py-2">
              <button
                @click="openModal(user.id)"
                class="text-blue-600 hover:underline dark:text-detail-400 font-bold"
              >
                Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>

<DetailModal
  :title="detailTitle"
  :show="showModal"
  :loading="isLoading"
  :error="errorMessage"
  :detailData="detailData"
  :fields="detailFields"
  @close="closeModal"
/>
    </div>

    <Pagination v-model="page" :total-pages="totalPages" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useUserStore } from '../stores/userStore'
import Pagination from '../components/Pagination.vue'
import DetailModal from '../components/DetailModal.vue'
import { filterableUserKeys } from '../constants/keys'

const selectedKey = ref('')
const filterValue = ref('')
const searchQuery = ref('')
const store = useUserStore()
const selectedUserId = ref(null)
const page = ref(1)
const showModal = ref(false)

const totalPages = computed(() => Math.ceil(store.total / store.limit))

const localSearchQuery = ref('')
const localSelectedKey = ref('')
const localFilterValue = ref('')

function applyFilter() {
  store.searchQuery = localSearchQuery.value.trim()
  store.filterKey = localSelectedKey.value
  store.filterValue = localFilterValue.value.trim()
  store.skip = 0 
  store.fetchUsers()
}

// const canApply = computed(() => {
//   return (
//     (searchQuery.value.trim().length > 0) ||
//     (selectedKey.value && filterValue.value.trim().length > 0)
//   )
// })

const detailTitle = ref('')
const detailFields = ref({})
const detailData = ref({})
const isLoading = ref(false)
const errorMessage = ref('')

function openModal(id) {
  selectedUserId.value = id
  showModal.value = true
  detailTitle.value = 'User Detail'
  detailFields.value = {
    image: 'Avatar',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    username: 'Username',
    age: 'Age',
    gender: 'Gender',
    phone: 'Phone',
    birthDate: 'Birth Date',
    bloodGroup: 'Blood Group',
    height: 'Height',
    weight: 'Weight',
    eyeColor: 'Eye Color',
    'hair.color': 'Hair Color',
    'hair.type': 'Hair Type',
    'address.address': 'Street Address',
    'address.city': 'City',
    'address.state': 'State',
    university: 'University',
    'company.name': 'Company',
    'company.department': 'Department',
    role: 'Role'
  }

  isLoading.value = true
  errorMessage.value = ''
  store.fetchUserDetail(id)
    .then(() => {
      detailData.value = store.selectedUser
    })
    .catch(() => {
      errorMessage.value = 'Failed to load user data'
    })
    .finally(() => {
      isLoading.value = false
    })
}

function closeModal() {
  showModal.value = false
  selectedUserId.value = null
}

function truncate(text, length = 8) {
  if (!text) return ''
  return text.length > length ? text.slice(0, length) + '...' : text
}


function resetFilter() {
  localSearchQuery.value = ''
  localSelectedKey.value = ''
  localFilterValue.value = ''

  store.searchQuery = ''
  store.filterKey = ''
  store.filterValue = ''
  store.skip = 0
  store.fetchUsers()
}
watch(page, (newPage) => {
  if (selectedKey.value && filterValue.value.trim()) {
    store.setPage(newPage)
    store.fetchUsers('', { key: selectedKey.value, value: filterValue.value.trim() })
  } else if (searchQuery.value.trim()) {
    store.setPage(newPage)
    store.fetchUsers(searchQuery.value)
  } else {
    store.setPage(newPage)
    store.fetchUsers()
  }
})

onMounted(() => {
  store.fetchUsers()
})
</script>
