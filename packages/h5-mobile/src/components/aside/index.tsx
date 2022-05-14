import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledAside = styled.aside`
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
`

export interface IAsideProps {
  width?: string
}

export const Aside: React.FC<PropsWithChildren<IAsideProps>> = (props) => {
  const { width = '300px', children } = props
  return <StyledAside style={{ width }}>{children}</StyledAside>
}

export default Aside
