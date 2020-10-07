import React, { lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { createLoadingComponent } from '~/components'
import { Home } from '~/layouts/home'

export const Root = () => {
  return (
    <Switch>
      <Route exact path="/" component={() => <Redirect to="/home" />}></Route>
      <Route exact path="/home" component={Home}></Route>
      <Route exact path="/discover" component={Home}></Route>
      <Route exact path="/my" component={Home}></Route>
      <Route
        path="/space/:uid"
        component={createLoadingComponent(lazy(() => import('~/layouts/space')))}
      ></Route>
    </Switch>
  )
}

export default Root
