import React from 'react'
import PropTypes from 'prop-types'
import { TextMask, InputAdapter } from 'react-text-mask-hoc'

const Masked = props => <TextMask Component={InputAdapter} {...props} />

Masked.propTypes = {
  mask: PropTypes.any.isRequired,
  guide: PropTypes.bool,
  placeholderChar: PropTypes.string,
  keepCharPositions: PropTypes.bool,
  showMask: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pipe: PropTypes.func
}

Masked.defaultProps = {
  className: 'form-input',
  mask: [], // шаблон
  guide: true, // default  - отображение шаблона при вводе данных (___) ___-___
  placeholderChar: '_',	// default - символ по умолчанию для шаблона
  keepCharPositions: false, // default - влияет на расположение уже существующих символов при добавлении/удалении новых
  showMask: false, // default - отображать шаблон вместо placeholder
  value: ''
}

export default Masked
