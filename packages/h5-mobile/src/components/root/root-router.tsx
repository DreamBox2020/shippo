import { useMount } from 'ahooks'
import { AxiosResponse } from 'axios'
import React, { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Loading, {
  withFetchLoading,
  withLoading,
} from '~/components/loading-hoc'
import { ResponsePack } from '@shippo/sdk-services/types/helpers'
import { services } from '@shippo/sdk-services'
import { IUserInfo } from '@shippo/types'

import LayoutHome from '~/layouts/home'
import LayoutPassport from '~/layouts/passport'
import LayoutTemp from '~/layouts/temp'
import LayoutWx from '~/layouts/wx'
import LayoutSetting from '~/layouts/setting'

import { Permission } from '../permission'

import PagePassport from '~/pages/passport'
import PageSetting from '~/pages/setting'

import { useDispatch, useSelector } from 'react-redux'
import { userActions, userGetters } from '@shippo/sdk-stores'

import { getWxCode } from '~/utils'
import { config } from '~/config'

export interface RootRouteProps {
  result: AxiosResponse<ResponsePack<IUserInfo>>[]
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
        path="/home"
        element={
          <Permission accessRule="/home">
            <LayoutHome />
          </Permission>
        }
      >
        <Route
          path=""
          element={withLoading(lazy(() => import('~/pages/home')))}
        ></Route>
      </Route>
      <Route
        path="/discover"
        element={
          <Permission accessRule="/discover">
            <LayoutHome />
          </Permission>
        }
      >
        <Route
          path=""
          element={withLoading(lazy(() => import('~/pages/discover')))}
        ></Route>
      </Route>
      <Route
        path="/my"
        element={
          <Permission accessRule="/my">
            <LayoutHome />
          </Permission>
        }
      >
        <Route
          path=""
          element={withLoading(lazy(() => import('~/pages/my')))}
        ></Route>
      </Route>
      <Route
        path="/setting"
        element={
          <Permission accessRule="/setting">
            <LayoutSetting />
          </Permission>
        }
      >
        <Route path="" element={<PageSetting />}></Route>
      </Route>
      <Route
        path="/space/:uid"
        element={
          <Permission accessRule="/space/:uid">
            {withLoading(lazy(() => import('~/layouts/space')))}
          </Permission>
        }
      ></Route>
      <Route path="/temp/*" element={<LayoutTemp />}>
        <Route
          path="temp_trade_20220108"
          element={
            <Permission accessRule="/temp/temp_trade_20220108">
              {withLoading(
                lazy(() => import('~/pages/temp/temp_trade_20220108'))
              )}
            </Permission>
          }
        ></Route>
      </Route>

      <Route path="/wx" element={<LayoutWx />}>
        <Route
          path=""
          element={
            <Permission accessRule="/wx">
              {withLoading(lazy(() => import('~/pages/wx')))}
            </Permission>
          }
        ></Route>
        <Route
          path="my"
          element={
            <Permission accessRule="/wx/my">
              {withLoading(lazy(() => import('~/pages/wx/my')))}
            </Permission>
          }
        ></Route>
        <Route
          path="manage"
          element={
            <Permission accessRule="/wx/manage">
              {withLoading(lazy(() => import('~/pages/wx/manage')))}
            </Permission>
          }
        ></Route>
        <Route
          path="edit"
          element={
            <Permission accessRule="/wx/edit">
              {withLoading(lazy(() => import('~/pages/wx/edit')))}
            </Permission>
          }
        ></Route>
        <Route
          path="article/:id"
          element={
            <Permission accessRule="/wx/article/:id">
              {withLoading(lazy(() => import('~/pages/wx/article')))}
            </Permission>
          }
        ></Route>
      </Route>
      <Route
        path="*"
        element={
          <Navigate to={config.isMiniProgram() ? '/wx' : '/home'} replace />
        }
      ></Route>
    </Routes>
  )
}

export const RootRoute = withFetchLoading(Component, () => [
  services.passport.create({
    wxCode: getWxCode(),
  }),
])

export default RootRoute
