import './utils/bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { App } from './App'
import { GlobalStyle } from './styles/global'

ReactDOM.render(
  <HashRouter>
    <GlobalStyle></GlobalStyle>
    <App />
  </HashRouter>,
  document.getElementById('root')
)
