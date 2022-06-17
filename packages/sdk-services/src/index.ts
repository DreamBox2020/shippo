import { HttpRequestConfig } from '@shippo/sdk-utils'
import { request } from './helpers'
import * as passport from './passport'
import * as user from './user'
import * as temp from './temp'
import * as captcha from './captcha'
import * as admin from './admin'
import * as role from './role'
import * as permissionPolicy from './permission_policy'
import * as permissionAccess from './permission_access'
import * as wxArticle from './wx_article'

export * from './types'

export const services = {
  passport,
  user,
  temp,
  captcha,
  admin,
  role,
  permissionPolicy,
  permissionAccess,
  wxArticle,
  use: (config?: HttpRequestConfig) => {
    request.http = request.create(config)
  },
}
