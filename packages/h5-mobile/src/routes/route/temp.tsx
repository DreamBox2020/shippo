import { Route, LazyRoute } from '../helpers'
import { LayoutHome } from '~/layouts/home'

export const tempRoute = new Route('/temp/*', <LayoutHome />).childrenRoute(
  new LazyRoute(
    'temp_trade_20220108',
    () => import('~/pages/temp/temp_trade_20220108')
  ).withPermission('/temp/temp_trade_20220108')
)
