import { HttpRequestConfig } from '@shippo/sdk-utils'
import { request } from './helpers'
import * as passport from './passport'
import * as sms from './sms'
import * as user from './user'
import * as temp from './temp'
import * as captcha from './captcha'

export const services = {
  passport,
  sms,
  user,
  temp,
  captcha,
  use: (config?: HttpRequestConfig) => {
    request.http = request.create(config)
  },
}
