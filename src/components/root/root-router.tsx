import React, { lazy, useEffect } from 'react'
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom'
import { withFetchLoading, withLoading } from '~/components/loading-hoc'
import { Home } from '~/layouts/home'
import { Passport } from '~/layouts/passport'
import { services } from '~/services'
import { ICreateResource } from '~/services/passport'
import { HttpResult } from '~/utils/http'

export interface RootRouteProps {
  result: HttpResult<ICreateResource>[]
}
const Component: React.FC<RootRouteProps> = ({ result }) => {
  useEffect(() => {
    console.log(result)
    const resource = result[0].resource
    localStorage.setItem('__PASSPORT', resource.passport)
  }, [result])

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/home" />}></Route>
        <Route exact path="/passport" component={Passport}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/discover" component={Home}></Route>
        <Route exact path="/my" component={Home}></Route>
        <Route
          path="/space/:uid"
          component={withLoading(lazy(() => import('~/layouts/space')))}
        ></Route>
      </Switch>
    </HashRouter>
  )
}

export const RootRoute = withFetchLoading(Component, () => [services.passport.create()])

export default RootRoute
