import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  box-sizing: border-box;
  flex-shrink: 0;
`

export interface IHeaderProps {
  height?: string
}

export const Header: React.FC<IHeaderProps> = (props) => {
  const { height = '60px', children } = props
  return <StyledHeader style={{ height }}>{children}</StyledHeader>
}

export default Header
