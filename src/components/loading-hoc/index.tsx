import React, { Suspense } from 'react'
import styled from 'styled-components'

const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  background: url(${require('~/assets/loading.gif')}) center / 100% no-repeat fixed #fff;
`

export const Loading: React.FC = () => {
  return <StyledLoading></StyledLoading>
}

export const withLoading = (CurrentComponent: React.ElementType) => () => (
  <Suspense fallback={<Loading />}>
    <CurrentComponent />
  </Suspense>
)

export default Loading
