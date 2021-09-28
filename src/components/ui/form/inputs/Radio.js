import React from 'react'
import FormGroup from './FormGroup'
import { Radio as RadioInput } from './Inputs'

const Radio = (props) => {
  const { options, label, labelOptions, disabled, checked, ...rest } = props

  /*
    1. relative (boolean) - для относительного позиционирования основной label (заголовок для всего блока). По умолчанию absolute
    2. disabled (boolean) - можно задавать как для каждого инпута отдельно через options, так и для всего блока (все инпуты неактивны)
    disabled вынимаем и пробрасываем мимо обертки, так как в FormGroup disabled ипользуется для других контролов. В этом случае у радиокнопки
    свой label, для которого задается класс form_disabled
  */

  return (
    <FormGroup {...rest} label={label} labelOptions={{ ...labelOptions, relative: true }}>
      <RadioInput options={options} disabled={disabled} />
    </FormGroup>
  )
}

export default Radio
