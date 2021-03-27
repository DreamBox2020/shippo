import { BASE_API } from '~/settings'
import { createRequestPack, Http } from '~/utils/http'

interface IRequestResource {
  phone: string
  code: string
}

interface IResponseResource {
  passport: string
  uid: number
}

export const send = (resource: IRequestResource) =>
  new Http({ url: BASE_API + '/sms/send' }).send<IResponseResource>(createRequestPack(resource))
