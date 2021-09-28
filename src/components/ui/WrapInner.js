import React from 'react'
import classNames from "classnames"

const WrapInner = ({ children, color = 'grey', className }) => {
  return (
    <div className={classNames(
      'wrap-inner-block wrap-inner-block_round', className,
      { 'wrap-inner-block_yellow': color === 'yellow' },
      { 'wrap-inner-block_grey': color === 'grey' },
      { 'wrap-inner-block_white': color === 'white' },
      { 'wrap-inner-block_green': color === 'green' }
    )}>
      {children}
    </div>
  )
}

export default WrapInner
