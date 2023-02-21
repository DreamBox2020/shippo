import { Global, css } from '@emotion/react'
import 'antd/dist/antd.css'

const styles = css`
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

export const GlobalStyle = () => <Global styles={styles} />
