import { createRouter, createWebHistory } from 'vue-router'
import ProjectLogin from '@/views/ProjectLogin.vue'

const routes = [
  {
    path: '/',
    component: () => import('../views/ProjectsList.vue'),
  },
  {path: '/login',component: ProjectLogin},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
