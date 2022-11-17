import { Route, LazyRoute } from '../helpers'
import { LayoutHome } from '~/layouts/home'

export const discoverRoute = new Route('/discover', <LayoutHome />)
  .withPermission('/discover')
  .childrenRoute(new LazyRoute('', () => import('~/pages/discover')))
