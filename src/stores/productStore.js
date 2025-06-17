import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    total: 0,
    limit: 15,
    skip: 0,
    loading: false,
   searchQuery: '',
    filterKey: '',
    filterValue: '',
    selectedProduct:{},
  }),

  actions: {
      async fetchProducts() {
      this.loading = true
      try {
        let url = `https://dummyjson.com/products?limit=${this.limit}&skip=${this.skip}`

        if (this.searchQuery) {
          url = `https://dummyjson.com/products/search?q=${this.searchQuery}&limit=${this.limit}&skip=${this.skip}`
        } else if (this.filterKey) {
          url = `https://dummyjson.com/products/category/${this.filterKey}`
        }

        const res = await axios.get(url)
        this.products = res.data.products
        this.total = res.data.total
      } catch (e) {
        console.error('Failed to fetch products:', e)
      } finally {
        this.loading = false
      }
    },

    setPage(page) {
      this.skip = (page - 1) * this.limit
      this.fetchProducts()
    },

     async fetchProductDetail(id) {
      this.loadingDetail = true
      this.errorDetail = null
      this.selectedProduct = null
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`)
        this.selectedProduct = res.data
      } catch (e) {
        this.errorDetail = 'Failed to fetch product detail'
        console.error(this.errorDetail, e)
      } finally {
        this.loadingDetail = false
      }
    },
async addForm(product) {
  try {
    const res = await axios.post('https://dummyjson.com/products/add', product)
    return res;
  } catch (e) {
    console.error('Failed to add product', e)
        return false
  }
},
async updateForm(product) {
  try {
    const id = product.id
    const payload = {
      title: product.title || '',
      description: product.description || '',
      category: product.category || '',
      price: product.price || 0,
      discountPercentage: product.discountPercentage || 0,
      rating: product.rating || 0,
      stock: product.stock || 0,
      brand: product.brand || '',
      sku: product.sku || '',
      weight: product.weight || 0,
      dimensions: {
        width: product.dimensions?.width || 0,
        height: product.dimensions?.height || 0,
        depth: product.dimensions?.depth || 0,
      },
      warrantyInformation: product.warrantyInformation || '',
      shippingInformation: product.shippingInformation || '',
      availabilityStatus: product.availabilityStatus || '',
      returnPolicy: product.returnPolicy || '',
      minimumOrderQuantity: product.minimumOrderQuantity || 1,
      tags: product.tags || [],
      thumbnail: product.thumbnail || '',
      images: product.images || [],
    }
    const res = await axios.put(`https://dummyjson.com/products/${id}`, payload)
    return res;
  } catch (e) {
    console.error('Failed to update product', e)
    return false;
  }
},
  async deleteProduct(id) {
      try {
        const res = await axios.delete(`https://dummyjson.com/products/${id}`)
        
        // // Hapus dari state lokal jika perlu
        // this.products = this.products.filter(p => p.id !== id)

        return true, res.data
      } catch (e) {
        console.error('Gagal menghapus produk:', e)
        this.error = 'Gagal menghapus produk.'
        return null
      }
    },

  }
})
