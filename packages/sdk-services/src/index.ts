import { Http } from '@shippo/sdk-utils'
import { request } from './helpers'
import * as passport from './passport'
import * as sms from './sms'
import * as user from './user'

export const services = { passport, sms, user }

export const use = (http: Http) => {
  request.http = http
}
