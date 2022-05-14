import { useState } from 'react'
import { Loading } from '../loading-hoc'
import React from 'react'
type authType = 'ONLY_LOGIN' | 'ONLY_LOGOUT' | 'ALL'

export const withAuth = (CurrentComponent: React.FC, authType: authType) => () => {
  const [isWaiting, setIsWaiting] = useState(true)

  return isWaiting ? <Loading /> : <CurrentComponent />
}
