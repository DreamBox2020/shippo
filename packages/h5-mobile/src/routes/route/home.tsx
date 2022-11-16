import { Route, LazyRoute } from '../helpers'
import { LayoutHome } from '~/layouts/home'

export const homeRoute = new Route('/home', <LayoutHome />)
  .withPermission('/home')
  .childrenRoute(new LazyRoute('', () => import('~/pages/home')))
