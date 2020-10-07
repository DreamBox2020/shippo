import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { Home } from './layouts/home'

export const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={() => <Redirect to="/home" />}></Route>
      <Route exact path="/home" component={Home}></Route>
      <Route exact path="/discover" component={Home}></Route>
      <Route exact path="/my" component={Home}></Route>
      <Route path="/space" component={Home}></Route>
    </Switch>
  )
}

export default App
