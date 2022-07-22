import { ReactElement, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { hasAccess } from '@shippo/sdk-utils'
import { useSelector } from 'react-redux'
import { userGetters } from '@shippo/sdk-stores'
import { message } from 'antd'

export interface PermissionProps {
  accessRule: string
  children: ReactElement
}

export const Permission: React.FC<PermissionProps> = (props) => {
  const userInfo = useSelector(userGetters.infoGetter())
  const history = useNavigate()
  const location = useLocation()

  const hasPermission = useMemo(() => {
    return hasAccess(
      `sys_web:${props.accessRule}`,
      userInfo.access
        .filter((i) => i.accessType === 'resource')
        .map((i) => i.accessRule)
    )
  }, [userInfo.access, props.accessRule])

  useEffect(() => {
    if (!hasPermission) {
      if (userInfo.uid > 0) {
        message.error('权限不足')
        history('/', { replace: true })
      } else {
        message.error('请登录后访问')
        history('/passport', { replace: true })
      }
    }
  }, [userInfo.uid, hasPermission, history])

  if (hasPermission) {
    return props.children
  }
  return null
}
