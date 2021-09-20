import { useMount } from 'ahooks'
import { AxiosResponse } from 'axios'
import React from 'react'
import { useLocation } from 'react-router'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { withFetchLoading } from '~/components/loading-hoc'
import { Home } from '~/layouts/home'
import { Passport } from '~/layouts/passport'
import { ResponsePack } from '@shippo/sdk-services/types/helpers'
import { services } from '@shippo/sdk-services'
import { IResponseResource } from '@shippo/sdk-services/types/passport'
import { message } from 'antd'
import { Transform } from '~/pages/transform'
import ReadLayout from '~/layouts/read'
import CreationLayout from '~/layouts/creation'

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
      message.success(`已经登录，UID为${resource.uid}`)
      if (location.pathname.startsWith('/passport')) {
        history.push('/')
      }
    } else {
      message.error('没有登录')
      history.push('/passport')
    }
  })

  return (
    <Switch>
      <Route exact path="/" component={() => <Redirect to="/dashboard" />}></Route>
      <Route exact path="/passport" component={Passport}></Route>
      <Route exact path="/dashboard" component={Home}></Route>
      <Route exact path="/read" component={ReadLayout}></Route>
      <Route exact path="/creation" component={CreationLayout}></Route>
      <Route exact path="/users" component={Home}></Route>
      <Route exact path="/transform" component={Transform}></Route>
    </Switch>
  )
}

export const RootRoute = withFetchLoading(Component, () => [services.passport.create()])

export default RootRoute
