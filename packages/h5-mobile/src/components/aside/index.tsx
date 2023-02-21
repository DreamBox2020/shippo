import React, { PropsWithChildren } from 'react'
import styled from '@emotion/styled'

const StyledAside = styled.aside`
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
`

export interface IAsideProps {
  width?: string
  style?: React.CSSProperties
  className?: string
}

export const Aside: React.FC<PropsWithChildren<IAsideProps>> = (props) => {
  const { width = '300px', children, style, ...rest } = props
  return (
    <StyledAside style={{ width, ...style }} {...rest}>
      {children}
    </StyledAside>
  )
}

export default Aside
