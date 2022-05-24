import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { stores } from '~/modules'

export const Root: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <Provider store={stores}>{children}</Provider>
}
