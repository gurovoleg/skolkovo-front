import React from 'react'
import PropTypes from 'prop-types'
import { RadioInput } from './Toggle'
import classNames from 'classnames'

const Radio = ({ id, name, value, inline, options, disabled, wrapperClass, ...rest }) => {
  const values = Array.isArray(options) ? options : [options]

  return (
    <React.Fragment>
      {values.map((option, index) => {
        return (
          <div key={index} className={classNames('pad-btm_sm', wrapperClass, {
            'pad-right_md': inline, // отступ правый
            'd-inline-block': inline // расположение в строчку
          })}>
            <RadioInput
                name={name}
                value={option.value}
                label={option.label}
                title={option.title}
                checked={value == option.value}
                {...rest}
                disabled={disabled || option.disabled}
              />
          </div>)
        })}
    </React.Fragment>
  )
}

Radio.propTypes = {
  // name: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  options: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired
  ])
}

Radio.defaultProps = {
  inline: false
  // name: ''
}

export default Radio
