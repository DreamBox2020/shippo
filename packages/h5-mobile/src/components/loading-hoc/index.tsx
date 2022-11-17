import { SpinLoading } from 'antd-mobile'
import React, { lazy, Suspense, useEffect, useState } from 'react'

export const Loading: React.FC = () => {
  return (
    <SpinLoading
      style={{
        '--size': '80px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

export const withLoading = (CurrentComponent: React.ComponentType) => {
  return (
    <Suspense fallback={<Loading />}>
      <CurrentComponent />
    </Suspense>
  )
}

export const withFetchLoading =
  (
    CurrentComponent: React.ComponentType<any>,
    requests: () => Promise<any>[]
  ) =>
  () => {
    const [result, setResult] = useState<any[] | null>(null)

    useEffect(() => {
      Promise.all(requests()).then((_) => setResult(_))
    }, [])

    return result ? <CurrentComponent result={result} /> : <Loading />
  }

export type factory = () => Promise<{ default: React.ComponentType<any> }>

export const loadable = (factory: factory, fallback?: React.ReactNode) => {
  const CurrentComponent = lazy(factory)
  return (
    <Suspense fallback={fallback || <Loading />}>
      <CurrentComponent />
    </Suspense>
  )
}

export default Loading
