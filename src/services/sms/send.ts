import { BASE_API } from '~/settings'
import { createRequestPack, Http } from '~/utils/http'

interface IRequestResource {
  phone: string
}

export const send = (resource: IRequestResource) =>
  new Http({ url: BASE_API + '/sms/send' }).send(createRequestPack(resource))
