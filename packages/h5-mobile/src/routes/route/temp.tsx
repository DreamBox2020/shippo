import { Route, LazyRoute } from '../helpers'
import { LayoutTemp } from '~/layouts/temp'

export const tempRoute = new Route('/temp/*', <LayoutTemp />)
  .childrenRoute(
    new LazyRoute(
      'temp_trade_20220108',
      () => import('~/pages/temp/temp_trade_20220108')
    ).withPermission('/temp/temp_trade_20220108')
  )
  .childrenRoute(
    new LazyRoute(
      'temp_express_20220914',
      () => import('~/pages/temp/temp_express_20220914')
    ).withPermission('/temp/temp_express_20220914')
  )
