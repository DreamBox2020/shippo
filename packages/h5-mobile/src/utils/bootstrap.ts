import moment from 'moment'
import 'moment/locale/zh-cn'

window.addEventListener('blur', () => {
  window.__IS_ACTIVE = false
})

window.addEventListener('focus', () => {
  window.__IS_ACTIVE = true
})

moment.locale('zh-cn')

export {}
