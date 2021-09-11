import { css, createGlobalStyle } from 'styled-components'
import 'antd/dist/antd.css'

const style = css`
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #root {
    min-height: 100%;
    min-width: 100%;
    box-sizing: border-box;
  }

  ul {
    list-style: none;
  }

  .ant-layout {
    min-height: 100%;
    .ant-layout-header,
    .ant-layout-footer {
      padding: 0;
    }
  }

  @keyframes layout-title-hide {
    0% {
      display: none;
      opacity: 0;
    }
    80% {
      display: none;
      opacity: 0;
    }
    100% {
      display: unset;
      opacity: 1;
    }
  }
`

export const GlobalStyle = createGlobalStyle`
  ${style}
`
