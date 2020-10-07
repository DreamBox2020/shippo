import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Home } from './layouts/home'
import { Space } from './layouts/space'

export const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={() => <Redirect to="/home" />}></Route>
      <Route exact path="/home" component={Home}></Route>
      <Route exact path="/discover" component={Home}></Route>
      <Route exact path="/my" component={Home}></Route>
      <Route path="/space/:uid" component={Space}></Route>
    </Switch>
  )
}

export default App
