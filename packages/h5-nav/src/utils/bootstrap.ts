import moment from 'moment'
import 'moment/locale/zh-cn'
import { services } from '@shippo/sdk-services'
import { config } from '~/config'

services.use({
  baseURL: config.BASE_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

window.addEventListener('blur', () => {
  window.__IS_ACTIVE = false
})

window.addEventListener('focus', () => {
  window.__IS_ACTIVE = true
})

moment.locale('zh-cn')

export {}
