import { BASE_API } from '~/settings'
import { createRequestPack, Http } from '~/utils/http'

interface IResource {
  phone: string
}

export const send = (resource: IResource) =>
  new Http({ url: BASE_API + '/sms/send' }).send(createRequestPack(resource))
