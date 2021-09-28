import React from 'react'
import FormGroup from './FormGroup/index'
import classNames from 'classnames'

const TextArea = (props) => {
  const { id, name, label, labelOptions = {} } = props

  return (
    <FormGroup {...props}>
      <textarea
        id={labelOptions.htmlFor || id || name}
        title={label}
        className={classNames('form-input form-textarea text_md', {
          'form-input_enhanced': label && (!labelOptions || !labelOptions.relative)
        })} />
    </FormGroup>

  )
}

export default TextArea
