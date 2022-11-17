import { RouteObject } from 'react-router-dom'
import { albumRoute } from './route/album'
import { discoverRoute } from './route/discover'
import { homeRoute } from './route/home'
import { myRoute } from './route/my'
import { passportRoute } from './route/passport'
import { settingRoute } from './route/setting'
import { spaceRoute } from './route/space'
import { tempRoute } from './route/temp'
import { wxRoute } from './route/wx'
import { route404 } from './route404'

export const routes: RouteObject[] = [
  discoverRoute,
  homeRoute,
  myRoute,
  passportRoute,
  settingRoute,
  spaceRoute,
  tempRoute,
  wxRoute,
  albumRoute,
  route404,
].map((_) => _.toRouteObject())

console.log(routes)
