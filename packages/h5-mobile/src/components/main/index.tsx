import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledMain = styled.main`
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
`

export const Main: React.FC<PropsWithChildren<{}>> = (props) => {
  return <StyledMain>{props.children}</StyledMain>
}

export default Main
