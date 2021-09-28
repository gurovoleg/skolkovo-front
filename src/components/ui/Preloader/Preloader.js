import React from 'react'
import './Preloader.scss'
import classNames from "classnames"

const Preloader = ({ onTop, size, shadow, solid, color }) => {
  const width = size && size >= 80 ? size >= 100 ? 6 : 5 : 4 // размер вращающихся элементов

  return (
    <div
      className={classNames(
        'preloader-ring',
        { 'preloader-ring__onTop': onTop,
          'preloader-ring__shadow': shadow,
          'preloader-ring__solid': solid,
          'preloader-ring__blue': color === 'blue',
        })}
      style={{ width: `${size}px`, height: `${size}px` }}>
        <div style={{ borderWidth: `${width}px` }} />
        <div style={{ borderWidth: `${width}px` }} />
    </div>
  )
}

Preloader.defaultProps = {
  onTop: true,
  shadow: false,
  solid: false,
  color: '',
  size: 40
}

export default Preloader
