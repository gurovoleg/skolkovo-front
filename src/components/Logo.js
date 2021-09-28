import React from 'react'
import classNames from 'classnames'
import image from 'Root/images/skolkovo.png'

const Logo = ({ size, classes, textClasses = {} }) => {
  return (
    <div className={classNames('d-flex', classes)}>
      <img style={{ width: size }} src={image} alt="логотип"/>
      <div className="mar-left_md text_center">
        <div className={classNames('text_bold', textClasses.title )} style={{ lineHeight: 1.2 }}>SKOLKOVO</div>
        <div className={classNames(textClasses.subTitle)}>MOSCOW SCHOOL OF MANAGEMENT</div>
      </div>
    </div>
  )
}

export default Logo
