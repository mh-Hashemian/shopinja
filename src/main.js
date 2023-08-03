import { createApp } from "vue"
import { createPinia } from "pinia"
import Vue3Toastify from "vue3-toastify"
import "vue3-toastify/dist/index.css"
import "./style.css"

import App from "./App.vue"
import router from "./router"

createApp(App)
  .use(router)
  .use(createPinia())
  .use(Vue3Toastify, {
    autoClose: 3000,
    rtl: true,
  })
  .mount("#app")
