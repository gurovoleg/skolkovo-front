import React from 'react'
import { Date } from '../inputs'
import withField from './hoc/withField'

const DateControl = ({ formikBag, customOnChange, onChange, ...rest }) => {
  return (
    <Date
      {...rest}
      onChange={value => customOnChange ? onChange(value) : formikBag.setValue(value)}
      onBlur={() => formikBag.setTouched(true)}
    />
  )
}

export default withField(DateControl)
