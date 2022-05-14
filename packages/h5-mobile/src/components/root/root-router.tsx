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
import { Page_passport } from '~/pages/passport'
import { Page_setting } from '~/pages/setting'

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
      <Route path="/passport" element={<Passport />}>
        <Route path="" element={<Page_passport />}></Route>
      </Route>
      <Route path="/home" element={<Home />}>
        <Route path="" element={withLoading(lazy(() => import('~/pages/home')))}></Route>
      </Route>
      <Route path="/discover" element={<Home />}>
        <Route path="" element={withLoading(lazy(() => import('~/pages/discover')))}></Route>
      </Route>
      <Route path="/my" element={<Home />}>
        <Route path="" element={withLoading(lazy(() => import('~/pages/my')))}></Route>
      </Route>
      <Route path="/setting/*" element={<Setting />}>
        <Route path="" element={<Page_setting />}></Route>
      </Route>
      <Route
        path="/space/:uid"
        element={withLoading(lazy(() => import('~/layouts/space')))}
      ></Route>
      <Route path="/temp/*" element={<TempLayout />}>
        <Route
          path="temp_trade_20220108"
          element={withLoading(lazy(() => import('~/pages/temp/temp_trade_20220108')))}
        ></Route>
      </Route>
      <Route path="*" element={<Navigate to="/home" replace />}></Route>
    </Routes>
  )
}

export const RootRoute = withFetchLoading(Component, () => [services.passport.create()])

export default RootRoute
