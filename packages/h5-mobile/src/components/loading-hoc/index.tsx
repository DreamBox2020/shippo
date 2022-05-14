import React, { Suspense, useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
`

export const Loading: React.FC = () => {
  return <StyledLoading></StyledLoading>
}

export const withLoading = (CurrentComponent: React.ComponentType) => {
  const Component = () => (
    <Suspense fallback={<Loading />}>
      <CurrentComponent />
    </Suspense>
  )
  return <Component />
}

export const withFetchLoading =
  (CurrentComponent: React.ComponentType<any>, requests: () => Promise<any>[]) => () => {
    const [result, setResult] = useState<any[] | null>(null)

    useEffect(() => {
      Promise.all(requests()).then((_) => setResult(_))
    }, [])

    return result ? <CurrentComponent result={result} /> : <Loading />
  }

export default Loading
