import React, { Suspense, useState } from 'react'
import styled from 'styled-components'

const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  background: url(${require('~/assets/loading.gif').default}) center / 100% no-repeat fixed #fff;
`

export const Loading: React.FC = () => {
  return <StyledLoading></StyledLoading>
}

export const withLoading = (CurrentComponent: React.ComponentType) => () => (
  <Suspense fallback={<Loading />}>
    <CurrentComponent />
  </Suspense>
)

export const withFetchLoading = (
  CurrentComponent: React.ComponentType<any>,
  requests: () => Promise<any>[]
) => () => {
  const [result, setResult] = useState<any[] | null>(null)
  Promise.all(requests()).then((_) => setResult(_))
  return result ? <CurrentComponent result={result} /> : <Loading />
}

export default Loading
