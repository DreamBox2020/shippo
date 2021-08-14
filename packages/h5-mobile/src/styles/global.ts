import { css, createGlobalStyle } from 'styled-components'
import 'antd-mobile/dist/antd-mobile.min.css'

const style = css`
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #root {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }

  ul {
    list-style: none;
  }
`

export const GlobalStyle = createGlobalStyle`
  ${style}
`
