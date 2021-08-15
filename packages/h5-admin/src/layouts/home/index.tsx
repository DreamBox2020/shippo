import React, { lazy } from 'react'
import { withLoading } from '~/components/loading-hoc'
import { SwitchRoute, RouteS } from '~/components/switch-route'

type tabBarItem = RouteS & {
  path: string
}

const tabBarItems: Array<tabBarItem> = [
  {
    key: 'home',
    path: '/home',
    exact: true,
    component: withLoading(lazy(() => import('~/pages/home'))),
  },
]

export const Home = () => {
  return (
    <div>
      <SwitchRoute routes={tabBarItems} />
    </div>
  )
}

export default Home
