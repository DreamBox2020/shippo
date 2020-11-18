import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {Login} from '~/pages/passport/login'

export const Passport = () => {
    return <Switch>
        <Route key="login" path="/passport/login" exact={true} component={Login}></Route>
    </Switch>
}