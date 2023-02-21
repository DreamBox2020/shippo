import React, { PropsWithChildren } from 'react'
import styled from '@emotion/styled'

const StyledMain = styled.main`
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
`

interface MainProps {
  style?: React.CSSProperties
  className?: string
}

export const Main: React.FC<PropsWithChildren<MainProps>> = (props) => {
  const { children, ...rest } = props
  return <StyledMain {...rest}>{children}</StyledMain>
}

export default Main
