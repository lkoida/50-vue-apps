import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AppHome from '@/pages/AppHome.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: AppHome
  },
  {
    path: '/project-name',
    name: 'Project Name',
    component: () => import('@/pages/[ProjectNameHome].vue'),
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
