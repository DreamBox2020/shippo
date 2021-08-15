import { useMount } from 'ahooks'
import { Toast } from 'antd-mobile'
import { AxiosResponse } from 'axios'
import React, { lazy } from 'react'
import { useLocation } from 'react-router'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { withFetchLoading, withLoading } from '~/components/loading-hoc'
import { Home } from '~/layouts/home'
import { Passport } from '~/layouts/passport'
import { ResponsePack } from '@shippo/sdk-services/types/helpers'
import { services } from '@shippo/sdk-services'
import { IResponseResource } from '@shippo/sdk-services/types/passport'

export interface RootRouteProps {
  result: AxiosResponse<ResponsePack<IResponseResource>>[]
}

const Component: React.FC<RootRouteProps> = ({ result }) => {
  const history = useHistory()
  const location = useLocation()

  useMount(() => {
    console.log(result)
    const resource = result[0].data.resource
    localStorage.setItem('__PASSPORT', resource.passport)
    if (resource.uid > 0) {
      Toast.success(`已经登录，UID为${resource.uid}`)
      if (location.pathname.startsWith('/passport')) {
        history.push('/')
      }
    } else {
      Toast.fail('没有登录')
      history.push('/passport')
    }
  })

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
