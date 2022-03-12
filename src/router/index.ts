import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import ApiView from '../views/ApiView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children:[
        {
          path: '/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue')
        },
        {
          path: '/api',
          name: 'api',
          component: ApiView
        }
      ]
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
  ]
})

export default router
