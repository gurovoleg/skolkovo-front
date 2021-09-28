import React from 'react'
import './layouts.css'

const Center = (props) => {
  return (
    <div className="layout-center-wrapper">
      <div className="layout-center">
        {props.children}
      </div>
    </div>
  )
}

export default Center