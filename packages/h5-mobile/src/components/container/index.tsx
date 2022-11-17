import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

type direction = 'vertical' | 'horizontal'

const StyledContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  height: 100%;
  ${({ isColumn }: { isColumn: boolean }) =>
    isColumn ? 'flex-direction: column;' : ''}
`

export interface IContainerProps {
  direction: direction
  style?: React.CSSProperties
  className?: string
}

export const Container: React.FC<PropsWithChildren<IContainerProps>> = (
  props
) => {
  const { direction, children, ...rest } = props
  return (
    <StyledContainer isColumn={direction === 'vertical'} {...rest}>
      {children}
    </StyledContainer>
  )
}

export default Container
