import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Users from '../pages/Users.vue'
import Products from '../pages/Products.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/users', component: Users, meta: { requiresAuth: true } },
  { path: '/products', component: Products, meta: { requiresAuth: true } },
  { path: '/', redirect: '/users' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
