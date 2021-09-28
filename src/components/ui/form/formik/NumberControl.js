import React from 'react'
import { Text } from '../inputs'
import withField from './hoc/withField'

/*
 * Используем этот контрол для работы с типом integer, чтобы в качестве пустого значения можно было задавать null для БД.
 * То есть с помощью _onChange задаем в формике значение null. А в самом инпуте для этого случая задаем пустую строку (компонент Text).
 * Приходится это делать, иначе реакт ругается на значение null для управляемого компонента.
 */
const _onChange = (e, setValue) => {
  if (e.target.value === '') {
    setValue(null)
  } else {
    setValue(e.target.value)
  }
}

const NumberControl = (props) => (
  <Text type="number" {...props} onChange={(e) => _onChange(e, props.formikBag.setValue)} />
)

export default withField(NumberControl)
