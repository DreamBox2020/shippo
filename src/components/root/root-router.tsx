import React, { lazy, useState } from 'react'
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom'
import Loading, { withLoading } from '~/components/loading-hoc'
import { Home } from '~/layouts/home'
import { Passport } from '~/layouts/passport'

export const RootRoute = () => {
  const [passport, setPassport] = useState('')

  return passport ? (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/home" />}></Route>
        <Route exact path="/passport" component={Passport}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/discover" component={Home}></Route>
        <Route exact path="/my" component={Home}></Route>
        <Route
          path="/space/:uid"
          component={withLoading(lazy(() => import('~/layouts/space')))}
        ></Route>
      </Switch>
    </HashRouter>
  ) : (
    <Loading />
  )
}

export default RootRoute
