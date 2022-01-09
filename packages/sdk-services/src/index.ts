import { HttpRequestConfig } from '@shippo/sdk-utils'
import { request } from './helpers'
import * as passport from './passport'
import * as sms from './sms'
import * as user from './user'
import * as temp from './temp'

export const services = {
  passport,
  sms,
  user,
  temp,
  use: (config?: HttpRequestConfig) => {
    request.http = request.create(config)
  },
}
