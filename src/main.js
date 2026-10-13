import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css' // <--- MUST BE HERE

const app = createApp(App)
app.use(router)
app.mount('#app')


