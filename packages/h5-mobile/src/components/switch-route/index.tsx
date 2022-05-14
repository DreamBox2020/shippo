import React from 'react'
import { Route, RouteProps, Routes } from 'react-router-dom'

export type RouteS = RouteProps & { key: string }

export interface ISwitchRouteProps {
  routes: Array<RouteS>
}

export const SwitchRoute: React.FC<ISwitchRouteProps> = (props) => {
  return (
    <Routes>
      {props.routes.map((routeProps) => (
        <Route {...routeProps} />
      ))}
    </Routes>
  )
}

export default SwitchRoute
