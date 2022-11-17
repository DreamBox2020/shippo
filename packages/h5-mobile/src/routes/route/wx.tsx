import { Route, LazyRoute } from '../helpers'
import { LayoutWx } from '~/layouts/wx'

export const wxRoute = new Route('/wx', <LayoutWx />)
  .childrenRoute(
    new LazyRoute('', () => import('~/pages/wx')).withPermission('/wx')
  )
  .childrenRoute(
    new LazyRoute('my', () => import('~/pages/wx/my')).withPermission('/wx/my')
  )
  .childrenRoute(
    new LazyRoute('manage', () => import('~/pages/wx/manage')).withPermission(
      '/wx/manage'
    )
  )
  .childrenRoute(
    new LazyRoute('edit', () => import('~/pages/wx/edit')).withPermission(
      '/wx/edit'
    )
  )
  .childrenRoute(
    new LazyRoute(
      'article/:id',
      () => import('~/pages/wx/article')
    ).withPermission('/wx/article/:id')
  )
