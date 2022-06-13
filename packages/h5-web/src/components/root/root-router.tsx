import { useMount } from 'ahooks'
import { AxiosResponse } from 'axios'
import React, { lazy } from 'react'
import { useLocation } from 'react-router'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { withFetchLoading, withLoading } from '~/components/loading-hoc'
import { Home } from '~/layouts/home'
import { Passport } from '~/layouts/passport'
import { ResponsePack } from '@shippo/sdk-services/types/helpers'
import { services } from '@shippo/sdk-services'
// import { IResponseResource } from '@shippo/sdk-services/types/passport'
import { message } from 'antd'
import ReadLayout from '~/layouts/read'
import CreationLayout from '~/layouts/creation'
import { Page_passport } from '~/pages/passport'

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
      <Route path="/passport" element={<Passport />}>
        <Route path="" element={<Page_passport />}></Route>
      </Route>
      <Route path="/dashboard" element={<Home />}>
        <Route path="" element={withLoading(lazy(() => import('~/pages/dashboard')))}></Route>
      </Route>
      <Route path="/read" element={<ReadLayout />}></Route>
      <Route path="/creation" element={<CreationLayout />}></Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />}></Route>
    </Routes>
  )
}

export const RootRoute = withFetchLoading(Component, () => [services.passport.create({})])

export default RootRoute
