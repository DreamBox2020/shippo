import { useMount } from 'ahooks'
import { AxiosResponse } from 'axios'
import { useRoutes } from 'react-router-dom'
import { Loading, withFetchLoading } from '~/components/loading-hoc'
import { ResponsePacket } from '@shippo/sdk-services/types/helpers'
import { services } from '@shippo/sdk-services'
import { IUserInfo } from '@shippo/types'

import { useDispatch, useSelector } from 'react-redux'
import { userActions, userGetters } from '@shippo/sdk-stores'

import { getWxCode } from '~/utils'
import { routes } from '~/routes'

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

  const element = useRoutes(routes)

  if (!userInfo.access.length) {
    console.log('userInfo.access.length', userInfo.access)
    return <Loading />
  }

  return element
}

export const RootRoute = withFetchLoading(Component, () => [
  services.passport.create({
    wxCode: getWxCode(),
  }),
])

export default RootRoute
