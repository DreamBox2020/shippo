import { Route, LazyRoute } from '../helpers'
import { LayoutHome } from '~/layouts/home'

export const myRoute = new Route('/my', <LayoutHome />)
  .withPermission('/my')
  .childrenRoute(new LazyRoute('', () => import('~/pages/my')))
