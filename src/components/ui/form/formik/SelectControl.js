import React from 'react'
import { Select } from '../inputs'
import withField from './hoc/withField'

const SelectControl = ({ formikBag, customOnChange, onChange, ...rest }) => {
  // Задаем новое значение поля - передаем только value (может быть объект или массив для мульти select)
  const _onChange = (value) => {
    const newValue = value && value.length > 0 ? value.map(item => item.value) : value.value
    formikBag.setValue(newValue)
  }

  return (
    <Select
      {...rest}
      onChange={customOnChange ? onChange : _onChange}
      onBlur={() => formikBag.setTouched(true)}
      value={rest.options.filter(({ value }) => {
        if (Array.isArray(rest.value)) {
          return rest.value.includes(value)
        } else {
          return value === rest.value
        }
      })}
    />
  )
}

export default withField(SelectControl)
