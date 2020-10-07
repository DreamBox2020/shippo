import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  box-sizing: border-box;
  flex-shrink: 0;
`

export interface IFooterProps {
  height?: string
}

export const Footer: React.FC<IFooterProps> = (props) => {
  const { height = '60px', children } = props
  return <StyledFooter style={{ height }}>{children}</StyledFooter>
}

export default Footer
