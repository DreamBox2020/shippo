import { useMount } from 'ahooks'
import { AxiosResponse } from 'axios'
import React, { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Loading, {
  withFetchLoading,
  withLoading,
} from '~/components/loading-hoc'
import { ResponsePacket } from '@shippo/sdk-services/types/helpers'
import { services } from '@shippo/sdk-services'
import { IUserInfo } from '@shippo/sdk-types'

import LayoutHome from '~/layouts/home'
import LayoutPassport from '~/layouts/passport'
import ReadLayout from '~/layouts/read'
import CreationLayout from '~/layouts/creation'

import { Permission } from '../permission'

import PagePassport from '~/pages/passport'

import { useDispatch, useSelector } from 'react-redux'
import { userActions, userGetters } from '@shippo/sdk-stores'

export interface RootRouteProps {
  result: AxiosResponse<ResponsePacket<IUserInfo>>[]
}

const Component: React.FC<RootRouteProps> = ({ result }) => {
  const userInfo = useSelector(userGetters.infoGetter())
  const dispatch = useDispatch()

  useMount(() => {
    console.log(result)
    const resource = result[0].data.resource
    window.localStorage.setItem('__PASSPORT', resource.passport)
    window.localStorage.setItem('__USER_INFO', JSON.stringify(resource))
    dispatch(userActions.userUpdateInfo(resource))
  })

  if (!userInfo.access.length) {
    console.log('userInfo.access.length', userInfo.access)
    return <Loading></Loading>
  }

  return (
    <Routes>
      <Route path="/passport" element={<LayoutPassport />}>
        <Route path="" element={<PagePassport />}></Route>
      </Route>
      <Route
        path="/"
        element={
          <Permission accessRule="/">
            <LayoutHome />
          </Permission>
        }
      >
        <Route
          path=""
          element={withLoading(lazy(() => import('~/pages/index')))}
        ></Route>
      </Route>
      <Route
        path="/read"
        element={
          <Permission accessRule="/read">
            <ReadLayout />
          </Permission>
        }
      ></Route>
      <Route
        path="/creation"
        element={
          <Permission accessRule="/creation">
            <CreationLayout />
          </Permission>
        }
      ></Route>
      <Route path="*" element={<Navigate to="/" replace />}></Route>
    </Routes>
  )
}

export const RootRoute = withFetchLoading(Component, () => [
  services.passport.create({}),
])

export default RootRoute
