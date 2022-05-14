import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Setting as Page } from '~/pages/setting'

export const Setting = () => {
  return (
    <Routes>
      <Route key="setting" path="" element={<Page />}></Route>
    </Routes>
  )
}
