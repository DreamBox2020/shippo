import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Page_temp_trade_20220108 } from '~/pages/temp/temp_trade_20220108'

export const TempLayout = () => {
  return (
    <Switch>
      <Route
        key="Page_temp_trade_20220108"
        path="/temp/temp_trade_20220108"
        exact={true}
        component={Page_temp_trade_20220108}
      ></Route>
    </Switch>
  )
}
