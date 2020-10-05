import React from 'react'

export interface IIconProps {
  type: string
}

export const Icon: React.FC<IIconProps> = (props) => {
  return <em className={`shippo shippo-${props.type}`}></em>
}
