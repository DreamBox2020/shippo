import { Route, LazyRoute } from '../helpers'
import { LayoutFull } from '~/layouts/full'

export const albumRoute = new Route('/album', <LayoutFull />)
  .withPermission('/album')
  .childrenRoute(new LazyRoute('', () => import('~/pages/album')))
  .childrenRoute(new LazyRoute('create', () => import('~/pages/album/create')))
  .childrenRoute(new LazyRoute('list', () => import('~/pages/album/list')))
