import { useMount } from 'ahooks'
import { AxiosResponse } from 'axios'
import React, { lazy } from 'react'
import { useLocation } from 'react-router'
import { Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom'
import { withFetchLoading, withLoading } from '~/components/loading-hoc'
import { ResponsePacket } from '@shippo/sdk-services/types/helpers'
import { services } from '@shippo/sdk-services'
import { message } from 'antd'

import { Home } from '~/layouts/home'
import { Passport } from '~/layouts/passport'

import { Transform } from '~/pages/transform'
import { Page_passport } from '~/pages/passport'

export interface RootRouteProps {
  result: AxiosResponse<
    ResponsePacket<{
      passport: string
      uid: number
    }>
  >[]
}

const Component: React.FC<RootRouteProps> = ({ result }) => {
  const history = useNavigate()
  const location = useLocation()

  useMount(() => {
    console.log(result)
    const resource = result[0].data.resource
    localStorage.setItem('__PASSPORT', resource.passport)
    if (resource.uid > 0) {
      message.success(`已经登录，UID为${resource.uid}`)
      if (location.pathname.startsWith('/passport')) {
        history('/')
      }
    } else {
      message.error('没有登录')
      history('/passport')
    }
  })

  return (
    <Routes>
      <Route path="/devtools/*" element={<Home />}>
        <Route
          path="apitest"
          element={withLoading(lazy(() => import('~/pages/devtools/apitest')))}
        ></Route>
      </Route>
      <Route path="/passport" element={<Passport />}>
        <Route path="" element={<Page_passport />}></Route>
      </Route>
      <Route path="/transform" element={<Transform />}></Route>
      <Route path="/dashboard" element={<Home />}>
        <Route
          path=""
          element={withLoading(lazy(() => import('~/pages/dashboard')))}
        ></Route>
      </Route>
      <Route path="/users" element={<Home />}>
        <Route
          path=""
          element={withLoading(lazy(() => import('~/pages/users')))}
        ></Route>
      </Route>
      <Route path="/temp/*" element={<Home />}>
        <Route
          path="temp_trade_20220108"
          element={withLoading(
            lazy(() => import('~/pages/temp/temp_trade_20220108'))
          )}
        ></Route>
      </Route>
      <Route path="/permission/*" element={<Home />}>
        <Route
          path="role"
          element={withLoading(lazy(() => import('~/pages/permission/role')))}
        ></Route>
        <Route
          path="access"
          element={withLoading(lazy(() => import('~/pages/permission/access')))}
        ></Route>
        <Route
          path="policy"
          element={withLoading(lazy(() => import('~/pages/permission/policy')))}
        ></Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />}></Route>
    </Routes>
  )
}

export const RootRoute = withFetchLoading(Component, () => [
  services.passport.create({}),
])

export default RootRoute
