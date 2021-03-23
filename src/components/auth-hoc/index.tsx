import { useState } from 'react'
import { Loading } from '../loading-hoc'

type authType = 'ONLY_LOGIN' | 'ONLY_LOGOUT' | 'ALL'

export const withAuth = (CurrentComponent: React.ElementType, authType: authType) => () => {
  const [isWaiting, setIsWaiting] = useState(true)

  return isWaiting ? <Loading /> : <CurrentComponent />
}
