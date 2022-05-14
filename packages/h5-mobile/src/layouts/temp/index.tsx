import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Page_temp_trade_20220108 } from '~/pages/temp/temp_trade_20220108'

export const TempLayout = () => {
  return (
    <Routes>
      <Route
        key="Page_temp_trade_20220108"
        path="/temp_trade_20220108"
        element={<Page_temp_trade_20220108 />}
      ></Route>
    </Routes>
  )
}
