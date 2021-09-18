import React from 'react'
import { Route, RouteProps, Switch } from 'react-router-dom'

export type RouteS = RouteProps & { key: string }

export interface ISwitchRouteProps {
  routes: Array<RouteS>
}

export const SwitchRoute: React.FC<ISwitchRouteProps> = (props) => {
  return (
    <Switch>
      {props.routes.map((routeProps) => (
        <Route {...routeProps} />
      ))}
    </Switch>
  )
}

export default SwitchRoute
