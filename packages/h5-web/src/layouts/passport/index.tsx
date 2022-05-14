import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Passport as Page } from '~/pages/passport'

export const Passport = () => {
  return (
    <Routes>
      <Route key="login" path="" element={<Page />}></Route>
    </Routes>
  )
}
