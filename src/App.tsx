import React from 'react'
import { Switch, Route } from 'react-router'
import { Home } from './layouts/home'

export const App = () => {
  return <Switch>
      <Route exact path="/" component={Home}></Route>
  </Switch>
}
