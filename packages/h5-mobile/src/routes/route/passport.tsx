import { Route } from '../helpers'
import { LayoutPassport } from '~/layouts/passport'
import { PagePassport } from '~/pages/passport'

export const passportRoute = new Route(
  '/passport',
  <LayoutPassport />
).childrenRoute(new Route('', <PagePassport />))
