import { createAPI } from '../helpers'

interface IRequestResource {
  phone?: string
  email?: string
}

interface IResponseResource {}

export const send = createAPI<IRequestResource, IResponseResource>({
  url: '/captcha/send',
  method: 'POST',
})
