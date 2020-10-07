import React from 'react'
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
  ${({ isColumn }: { isColumn: boolean }) => (isColumn ? 'flex-direction: column;' : '')}
`

export interface IContainerProps {
  direction: direction
}

export const Container: React.FC<IContainerProps> = (props) => {
  const { direction, children } = props
  return <StyledContainer isColumn={direction === 'vertical'}>{children}</StyledContainer>
}

export default Container
