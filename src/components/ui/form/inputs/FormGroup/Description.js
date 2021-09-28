import React from 'react'

const Description = ({ text }) => {
  return text
    ? <small className="help-block">{text}</small>
    : null
}

export default Description
