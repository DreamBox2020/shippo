import { HttpRequestConfig } from '@shippo/sdk-utils'
import { request } from './helpers'
import * as passport from './passport'
import * as user from './user'
import * as temp from './temp'
import * as captcha from './captcha'
import * as admin from './admin'

export const services = {
  passport,
  user,
  temp,
  captcha,
  admin,
  use: (config?: HttpRequestConfig) => {
    request.http = request.create(config)
  },
}
