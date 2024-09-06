import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ToastPlugin)

app.mount('#app')
