import React, { useEffect } from 'react'
import FormGroup from './FormGroup/index'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Text = props => {
  const { id, name, label, labelOptions = {} } = props
  const { alignRight, mini, setFocused, value, type, ...rest } = props

  const inputRef = React.createRef()

  if (setFocused) {
    useEffect(() => {
      inputRef.current.focus()
    }, [props.value])
  }

  return (
    <FormGroup {...rest}>
      <input
        type={type}
        // для типа number значение может приходить null. Поэтому задаем принудительно пустую строку (требования реакт)
        value={value || ''}
        ref={inputRef}
        title={label}
        id={labelOptions.htmlFor || id || name}
        className={classNames('form-input text_md', {
          'form-input_enhanced': label && (!labelOptions || !labelOptions.relative),
          'form-input_mini': mini,
          text_alignRight: alignRight
        })} />
    </FormGroup>
  )
}

Text.propTypes = {
  alignRight: PropTypes.bool, // выравнивание теста по правому краю
  mini: PropTypes.bool, // уменьшенные отступы (padding: 4px)
  setFocused: PropTypes.bool // добавляет фокус на элемент после обновления
}

Text.defaultProps = {
  alignRight: false,
  mini: false,
  setFocused: false
}

export default Text
