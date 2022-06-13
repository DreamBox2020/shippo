import { getQueryVariable } from '@kazura/web-util'
import { IS_MINIPROGRAM } from '~/settings'

export {}

export const getWxCode = () => {
  if (IS_MINIPROGRAM) {
    return getQueryVariable('wxCode', window.location.hash)
  }
  return ''
}
