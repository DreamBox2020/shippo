import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Setting as Page } from '~/pages/setting'

export const Setting = () => {
  return (
    <Switch>
      <Route key="setting" path="/setting" exact={true} component={Page}></Route>
    </Switch>
  )
}
