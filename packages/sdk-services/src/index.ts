import { HttpRequestConfig } from '@shippo/sdk-utils'
import { request } from './helpers'
import * as passport from './passport'
import * as sms from './sms'
import * as user from './user'

export const services = {
  passport,
  sms,
  user,
  use: (config?: HttpRequestConfig) => {
    request.http = request.create(config)
  },
}
