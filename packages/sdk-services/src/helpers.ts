import { Request } from '@shippo/sdk-utils'

export { RequestPack, ResponsePack } from '@shippo/sdk-utils'

export const request = new Request({
  baseURL: '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})
