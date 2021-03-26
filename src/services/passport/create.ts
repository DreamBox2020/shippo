import { BASE_API } from '~/settings'
import { createRequestPack, Http } from '~/utils/http'

export interface ICreateResource {
  passport: string
  uid: number
}

export const create = () =>
  new Http({ url: BASE_API + '/passport/create' }).send<ICreateResource>(createRequestPack())
