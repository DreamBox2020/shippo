import { getQueryVariable } from '@kazura/web-util'
import { config } from '~/config'

export {}

export const getWxCode = () => {
  if (config.isMiniProgram()) {
    return getQueryVariable('wxCode', window.location.hash)
  }
  return ''
}
