import React from 'react'
import { useField } from "formik"

const withField = (WrappedComponent) => (props) => {
  let { name, fastField, errors, onChange, parser, ...rest } = props
  const [field, meta, helpers] = useField(name)

  // Передаем данные об ошибках и визуального отображения (подсветка полей) согласно заданным валидаторам
  if (meta.error && meta.touched) {
    errors = {
      hasError: !!field.value,
      hasWarning: !field.value,
      messages: meta.error,
      show: true
    }
  }

  // Если задан custom onChange, то заменяем им Formik.onChange и добавляем параметр для компонента customOnChange = true
  if (onChange) {
    field.onChange = (e) => onChange(e, field, helpers)
  }
  // field.onChange = onChange || field.onChange

  // parser - обработка ввода данных
  if (parser && typeof parser === 'function') {
    onChange = true

    // Заменяем OnChange
    field.onChange = e => {
      helpers.setValue(parser(e.target.value, field.value))
    }
  }

  // customOnChange задаем этото параметр, чтобы компонент знал, что пришел пользовательский onChange, а не formik,
  // так как у компонента внутри может быть задан свой, например как у SelectControl
  return (
    <WrappedComponent errors={errors} {...field} customOnChange={onChange ? true : undefined} formikBag={helpers} {...rest} />
  )
}

export default withField
