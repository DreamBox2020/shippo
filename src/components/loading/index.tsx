import React, { Suspense } from 'react'
import styled from 'styled-components'

const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  background: url(${require('~/assets/loading.gif')}) center / 100% no-repeat fixed #fff;
`

export const Loading: React.FC = (props) => {
  return <Suspense fallback={<StyledLoading />}>{props.children}</Suspense>
}

export const createLoadingComponent = (CurrentComponent: React.ElementType) => () => (
  <Loading>
    <CurrentComponent />
  </Loading>
)

export default Loading
