import { AxiosResponse } from 'axios'
import React, { lazy, useEffect } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { withFetchLoading, withLoading } from '~/components/loading-hoc'
import { Home } from '~/layouts/home'
import { Passport } from '~/layouts/passport'
import { ResponsePack, services } from '~/services'
import { IResponseResource } from '~/services/passport'

export interface RootRouteProps {
  result: AxiosResponse<ResponsePack<IResponseResource>>[]
}

const Component: React.FC<RootRouteProps> = ({ result }) => {
  const history = useHistory()

  useEffect(() => {
    console.log(result)
    const resource = result[0].data.resource
    localStorage.setItem('__PASSPORT', resource.passport)
    if (resource.uid > 0) {
      history.push('/')
    }
  }, [result, history])

  return (
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
  )
}

export const RootRoute = withFetchLoading(Component, () => [services.passport.create()])

export default RootRoute
