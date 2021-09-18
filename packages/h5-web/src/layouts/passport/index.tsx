import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Passport as Page } from '~/pages/passport'

export const Passport = () => {
  return (
    <Switch>
      <Route key="login" path="/passport" exact={true} component={Page}></Route>
    </Switch>
  )
}
