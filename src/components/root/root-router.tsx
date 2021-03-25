import React, { lazy, useEffect } from 'react'
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom'
import { withFetchLoading, withLoading } from '~/components/loading-hoc'
import { Home } from '~/layouts/home'
import { Passport } from '~/layouts/passport'
import { services } from '~/services'
import { IResponsePack } from '~/utils/http'

export interface RootRouteProps {
  result: {
    response: Response
    result: IResponsePack
    resource:
      | ''
      | {
          passport: string
          uid: number
        }
  }[]
}
const Component: React.FC<RootRouteProps> = ({ result }) => {
  console.log(result)
  useEffect(() => {
    const resource = result[0].resource
    if (resource !== '') {
      localStorage.setItem('__PASSPORT', resource.passport)
    }
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
