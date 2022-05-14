import { useMount } from 'ahooks'
import { Toast } from 'antd-mobile'
import { AxiosResponse } from 'axios'
import React, { lazy } from 'react'
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'
import { withFetchLoading, withLoading } from '~/components/loading-hoc'
import { Home } from '~/layouts/home'
import { Passport } from '~/layouts/passport'
import { ResponsePack } from '@shippo/sdk-services/types/helpers'
import { services } from '@shippo/sdk-services'
// import { IResponseResource } from '@shippo/sdk-services/types/passport'
import { Setting } from '~/layouts/setting'
import { TempLayout } from '~/layouts/temp'

export interface RootRouteProps {
  result: AxiosResponse<ResponsePack<any>>[]
}

const Component: React.FC<RootRouteProps> = ({ result }) => {
  const history = useNavigate()
  const location = useLocation()

  useMount(() => {
    console.log(result)
    const resource = result[0].data.resource
    localStorage.setItem('__PASSPORT', resource.passport)
    if (resource.uid > 0) {
      Toast.show({
        icon: 'success',
        content: `已经登录，UID为${resource.uid}`,
      })
      if (location.pathname.startsWith('/passport')) {
        history('/')
      }
    } else {
      Toast.show({
        icon: 'fail',
        content: '没有登录',
      })

      if (!location.pathname.startsWith('/temp')) {
        history('/passport')
      }
    }
  })

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />}></Route>
      <Route path="/passport" element={<Passport />}></Route>
      <Route path="/setting/*" element={<Setting />}></Route>
      <Route
        path="/space/:uid"
        element={withLoading(lazy(() => import('~/layouts/space')))}
      ></Route>
      <Route path="/temp" element={<TempLayout />}></Route>
      <Route path="/*" element={<Home />}></Route>
      <Route path="/aa" element={<Home />}></Route>
    </Routes>
  )
}

export const RootRoute = withFetchLoading(Component, () => [services.passport.create()])

export default RootRoute
