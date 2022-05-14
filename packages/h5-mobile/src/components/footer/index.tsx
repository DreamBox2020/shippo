import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  box-sizing: border-box;
  flex-shrink: 0;
`

export interface IFooterProps {
  height?: string
  style?: React.CSSProperties
}

export const Footer: React.FC<PropsWithChildren<IFooterProps>> = (props) => {
  const { height = '60px', children, style } = props
  return <StyledFooter style={{ height, ...style }}>{children}</StyledFooter>
}

export default Footer
