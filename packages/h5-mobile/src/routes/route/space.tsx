import { LazyRoute } from '../helpers'

export const spaceRoute = new LazyRoute(
  '/space/:uid',
  () => import('~/layouts/space')
).withPermission('/space/:uid')
