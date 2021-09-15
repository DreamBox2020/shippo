import React from 'react'

export interface WhiteSpaceProps {
  size?: number
  style?: React.CSSProperties
}

export const WhiteSpace: React.FC<WhiteSpaceProps> = (props) => {
  const { size = 9, style } = props
  return <div style={{ height: size, ...style }} />
}
