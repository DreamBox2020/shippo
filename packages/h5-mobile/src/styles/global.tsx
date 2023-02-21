import { Global, css } from '@emotion/react'

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
    background-color: #f5f5f9;
  }

  ul {
    list-style: none;
  }
`

export const GlobalStyle = () => <Global styles={styles} />
