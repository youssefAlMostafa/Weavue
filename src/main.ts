import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)

app.mount('#app')

const loader = document.getElementById('app-loader')
if (loader) {
  loader.classList.add('fade-out')
  setTimeout(() => {
    loader.remove()
  }, 300)
}
