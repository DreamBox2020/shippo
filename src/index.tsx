import './utils/bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { GlobalStyle } from './styles/global'
import { Root } from '~/components/root'

ReactDOM.render(
  <HashRouter>
    <GlobalStyle></GlobalStyle>
    <Root />
  </HashRouter>,
  document.getElementById('root')
)
