import React from 'react'

const Value = ({ v, text, zero, className, children }) => {
  return v || (v === 0 && zero === true)
    ? <span>{children || v}</span>
    : <span className={className}>{text}</span>
}

Value.defaultProps = {
  className: 'text_purple',
  text: 'не указано',
  zero: false
}

export default Value
