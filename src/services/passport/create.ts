import { BASE_API } from '~/settings'
import { createRequestPack, Http } from '~/utils/http'

export const create = () =>
  new Http({ url: BASE_API + '/passport/create' }).send<{
    passport: string
    uid: number
  }>(createRequestPack())
