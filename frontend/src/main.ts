import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { createApp } from 'vue'
import {createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'
import { routes } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  window.$message.error(
    `请求错误: ${error.message}`
  )
  return Promise.reject(error)
})

app.mount('#app')

dayjs.extend(relativeTime)