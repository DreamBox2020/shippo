import { ReactElement, useEffect, useMemo } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { keyMatch2 } from '@shippo/sdk-utils'
import { useSelector } from 'react-redux'
import { userSelector } from '@shippo/sdk-stores'
import { Toast } from 'antd-mobile'
import { useMount } from 'ahooks'

export interface PermissionProps {
  accessRule: string
  children: ReactElement
}

export const Permission: React.FC<PermissionProps> = (props) => {
  const userInfo = useSelector(userSelector.infoGetter())
  const history = useNavigate()

  const hasAccess = useMemo(() => {
    const key1 = `sys_mobile:${props.accessRule}`
    console.log('hasAccess->access:', userInfo.access)
    console.log('hasAccess->key1:', key1)
    return userInfo.access
      .filter((item) => item.accessType === 'resource')
      .some((item) => {
        console.log('hasAccess->key2:', item.accessRule)
        const tag = keyMatch2(key1.toLowerCase(), item.accessRule.toLowerCase())
        console.log('hasAccess->tag:', tag)
        return tag
      })
  }, [userInfo.access, props.accessRule])

  useEffect(() => {
    if (!hasAccess) {
      if (userInfo.uid > 0) {
        Toast.show({
          icon: 'fail',
          content: '权限不足',
        })
        history('/', { replace: true })
      } else {
        Toast.show({
          icon: 'fail',
          content: '请登录后访问',
        })
        history('/passport', { replace: true })
      }
    }
  }, [userInfo.uid, hasAccess, history])

  if (hasAccess) {
    return props.children
  }
  return null
}
