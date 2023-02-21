import React, { PropsWithChildren } from 'react'
import styled from '@emotion/styled'

const StyledHeader = styled.header`
  box-sizing: border-box;
  flex-shrink: 0;
`

export interface IHeaderProps {
  height?: string
  style?: React.CSSProperties
  className?: string
}

export const Header: React.FC<PropsWithChildren<IHeaderProps>> = (props) => {
  const { height = '60px', children, style, ...rest } = props
  return (
    <StyledHeader style={{ height, ...style }} {...rest}>
      {children}
    </StyledHeader>
  )
}

export default Header
