import { createApp } from 'vue'
import AppWrapper from '@/AppWrapper.vue'
import { createPinia } from 'pinia'
import { router } from '@/router/routes.ts'

const pinia = createPinia()

createApp(AppWrapper).use(pinia).use(router).mount('#app')
