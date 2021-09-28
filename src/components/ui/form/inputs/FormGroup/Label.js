import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Errors from './Errors'

const Label = ({ htmlFor, errors, title, className, relative, noWrap, overflow, text }) => {
  if (text || errors.messages) {
    // подсказка: добавляем текст ошибок или текст лейбла
    title = errors.messages ? Array.isArray(errors.messages) ? errors.messages.join('. ') : errors.messages : text

    return (
      <label
        title={title}
        htmlFor={htmlFor}
        className={classNames(className, 'mar-btm_xs', {
          'form-title': !relative, // абсолютное или относительное позиционирование
          'text-nowrap': noWrap,
          'text-overflow': overflow
        })}>
        {/* текст лейбл или ошибки */}
        {errors.messages ? <Errors {...errors} /> : (text || '\u00A0')}
      </label>
    )
  }

  return null
}

Label.propTypes = {
  htmlFor: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  noWrap: PropTypes.bool,
  overflow: PropTypes.bool
}

Label.defaultProps = {
  noWrap: true,
  overflow: true
}

export default Label
