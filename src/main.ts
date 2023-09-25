import { createApp } from 'vue'
import App from './App.vue'
import roteador from './router'

import '@fortawesome/fontawesome-free/css/all.css'
import { key, store } from './store'

createApp(App)
    .use(roteador)
    .use(store, key)
    .mount('#app')
