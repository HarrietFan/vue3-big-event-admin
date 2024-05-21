import '@/assets/main.scss'

import { createApp } from 'vue'
import pinia from '@/stores'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)

router.addRoute({
  path:'/',
  redirect: "/404",
})

app.use(router)

app.mount('#app')
