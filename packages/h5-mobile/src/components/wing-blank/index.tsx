import React from 'react'

export interface WingBlankProps {
  size?: number
  style?: React.CSSProperties
}

export const WingBlank: React.FC<WingBlankProps> = (props) => {
  const { size = 8, children, style } = props
  return (
    <div
      style={{
        marginLeft: size,
        marginRight: size,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
