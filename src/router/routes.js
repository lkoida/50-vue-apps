import { createRouter, createWebHistory } from 'vue-router'
import ProjectLogin from '@/views/ProjectLogin.vue'
import { useUsersStore } from '@/stores/usersStore.js'

const routes = [
  {
    path: '/',
    redirect: { name: 'projects' },
  },
  {
    path: '/50-vue-apps',
    name: 'projects',
    component: () => import('../views/ProjectsList.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  { path: '/50-vue-apps/login', name: 'login', component: ProjectLogin },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const usersStore = useUsersStore();
  if (to.meta.requiresAuth && !usersStore.isLoggedIn) {
    return '/50-vue-apps/login'
  }
})
