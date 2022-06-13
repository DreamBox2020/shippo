import { useMount } from 'ahooks'
import { AxiosResponse } from 'axios'
import React, { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Loading, { withFetchLoading, withLoading } from '~/components/loading-hoc'
import { Home } from '~/layouts/home'
import { Passport } from '~/layouts/passport'
import { ResponsePack } from '@shippo/sdk-services/types/helpers'
import { services } from '@shippo/sdk-services'
import { Setting } from '~/layouts/setting'
import { TempLayout } from '~/layouts/temp'
import { Page_passport } from '~/pages/passport'
import { Page_setting } from '~/pages/setting'
import { getWxCode } from '~/utils'
import { useDispatch, useSelector } from 'react-redux'
import { userAction, userSelector } from '@shippo/sdk-stores'
import { IS_MINIPROGRAM } from '~/settings'
import { Permission } from '../permission'
import WxLayout from '~/layouts/wx'

export interface RootRouteProps {
  result: AxiosResponse<ResponsePack<any>>[]
}

const Component: React.FC<RootRouteProps> = ({ result }) => {
  const userInfo = useSelector(userSelector.infoGetter())
  const dispatch = useDispatch()

  useMount(() => {
    console.log(result)
    const resource = result[0].data.resource
    window.localStorage.setItem('__PASSPORT', resource.passport)
    window.localStorage.setItem('__USER_INFO', JSON.stringify(resource))
    dispatch(userAction.userUpdateInfo(resource))
  })

  if (!userInfo.access.length) {
    console.log('userInfo.access.length', userInfo.access)
    return <Loading></Loading>
  }

  return (
    <Routes>
      <Route path="/passport" element={<Passport />}>
        <Route path="" element={<Page_passport />}></Route>
      </Route>
      <Route
        path="/home"
        element={
          <Permission accessRule="/home">
            <Home />
          </Permission>
        }
      >
        <Route path="" element={withLoading(lazy(() => import('~/pages/home')))}></Route>
      </Route>
      <Route
        path="/discover"
        element={
          <Permission accessRule="/discover">
            <Home />
          </Permission>
        }
      >
        <Route path="" element={withLoading(lazy(() => import('~/pages/discover')))}></Route>
      </Route>
      <Route
        path="/my"
        element={
          <Permission accessRule="/my">
            <Home />
          </Permission>
        }
      >
        <Route path="" element={withLoading(lazy(() => import('~/pages/my')))}></Route>
      </Route>
      <Route
        path="/setting"
        element={
          <Permission accessRule="/setting">
            <Setting />
          </Permission>
        }
      >
        <Route path="" element={<Page_setting />}></Route>
      </Route>
      <Route
        path="/space/:uid"
        element={
          <Permission accessRule="/space/:uid">
            {withLoading(lazy(() => import('~/layouts/space')))}
          </Permission>
        }
      ></Route>
      <Route path="/temp/*" element={<TempLayout />}>
        <Route
          path="temp_trade_20220108"
          element={
            <Permission accessRule="/temp/temp_trade_20220108">
              {withLoading(lazy(() => import('~/pages/temp/temp_trade_20220108')))}
            </Permission>
          }
        ></Route>
      </Route>

      <Route path="/wx" element={<WxLayout />}>
        <Route path="" element={withLoading(lazy(() => import('~/pages/wx')))}></Route>
        <Route path="my" element={withLoading(lazy(() => import('~/pages/wx/my')))}></Route>
        <Route path="manage" element={withLoading(lazy(() => import('~/pages/wx/manage')))}></Route>
        <Route path="edit" element={withLoading(lazy(() => import('~/pages/wx/edit')))}></Route>
      </Route>
      <Route path="*" element={<Navigate to={IS_MINIPROGRAM ? '/wx' : '/home'} replace />}></Route>
    </Routes>
  )
}

export const RootRoute = withFetchLoading(Component, () => [
  services.passport.create({
    wxCode: getWxCode(),
  }),
])

export default RootRoute
