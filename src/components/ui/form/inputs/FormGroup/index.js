import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Label from './Label'
import Description from './Description'
// import { printToConsole } from 'utils/print-to-console'

const FormGroup = props => {
  const { debug, customOnChange, formikBag, required, className, hasError, hasWarning, label, labelOptions, description, errors, children, ...rest } = props

  // Выводим данные с параметрами в консоль (Debug mode)
  // printToConsole(debug, getControlName(props), 'orange')(null, props)

  // label
  const labelContent = <Label {...labelOptions}
                              className={classNames(labelOptions.className)}
                              htmlFor={labelOptions.htmlFor ? labelOptions.htmlFor : rest.id ? rest.id : rest.name}
                              errors={errors}
                              text={label} />

  return (
    // Основная обертка + отображение цвета контрола (ошибка, предупреждение)
    <div className={classNames('form mar-btm_md', className, {
      form_red: hasError || errors.hasError,
      form_yellow: hasWarning || errors.hasWarning || (required && (!rest.value && rest.value !== 0) && !hasError && !errors.hasError),
      form_disabled: rest.disabled
    })}>

      {/* Label относительное позиционирование (для радио-кнопок и файлов) */}
      {labelOptions.relative && labelContent}

      {/* инпут */}
      {React.Children.map(children, child => child ? React.cloneElement(child, rest) : null)}

      {/* Label абсолютное позиционирование (по умолчанию) */}
      {!labelOptions.relative && labelContent}

      {/* Описание дополнительно */}
      <Description text={description} />

    </div>
  )
}

FormGroup.propTypes = {
  debug: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string, // для основной обертки
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  label: PropTypes.string,
  labelOptions: PropTypes.shape({
    htmlFor: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
    noWrap: PropTypes.bool,
    overflow: PropTypes.bool,
    relative: PropTypes.bool // относительное позиционирование (по умолчанию в стилях абсолютное)
  }),
  description: PropTypes.string,
  errors: PropTypes.shape({
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
    show: PropTypes.bool,
    showAll: PropTypes.bool,
    messages: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ])
  }),
  required: PropTypes.bool,
  // customOnChange - параметр, указывающий что пришел пользовательский onChange. Используется для случаев, когда оnChange
  // прописан в самом компоненте, например как у SelectControl. В самой обертке не используется. Вынимаем его здесь, чтобы
  // не передавать дальше
  customOnChange: PropTypes.bool,
  // используется в некоторых компонентах formik для получения методов работы с полями. В самой обертки не используется.
  formikBag: PropTypes.object,
}

FormGroup.defaultProps = {
  debug: false,
  hasError: false,
  hasWarning: false,
  labelOptions: {
    noWrap: true,
    overflow: true,
    relative: false
  },
  errors: {
    hasError: false,
    hasWarning: false,
    show: false,
    showAll: false
  },
  required: false // для выделения полей необходимых для заполнения (подсветка желтым)
}

const getControlName = (props) => {
  const { name, type, fileType } = props
  if (type) return `${type} - ${name}`
  if (fileType) return `File - ${fileType}`
  return name || 'FormGroup - unknown field'
}

export default FormGroup
