import { Route, LazyRoute } from '../helpers'
import { LayoutSetting } from '~/layouts/setting'

export const settingRoute = new Route('/setting', <LayoutSetting />)
  .withPermission('/setting')
  .childrenRoute(new LazyRoute('', () => import('~/pages/setting')))
