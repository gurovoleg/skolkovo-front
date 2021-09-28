import React from 'react'
import { Form, Formik } from "formik"
import classNames from "classnames"
import { Wrap } from 'Components/ui'

/*
    Шаблон для работы с формой. Включает заголовок, форму, контролы (Сохранить/Отмена/Удалить).
    Для детей возвращает функцию с методами и свойствами Formik.
    В качестве детей ожидаются поля формы - formik components.
*/

// TODO Удалить debug на production
const FormLayout = ({ initialValues, submit, cancel, remove, schema, children, title, debug = false }) => {
  return (
    // <Formik initialValues={initialValues} onSubmit={(values, formBag) => {
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={(values, formBag) => {
      submit(values, formBag)
    }}>
      {(props) => {
        const { errors, isSubmitting, dirty, isValid, values } = props

        return (
          <Wrap className={classNames('wrap_line', { 'wrap_line-red': Object.keys(errors).length > 0 })}>

            {/* Данные формы в режиме отладки  */}
            {debug && <pre>{JSON.stringify(errors, null, 2)}</pre>}
            {debug && <pre>{JSON.stringify(values, null, 2)}</pre>}

            <Form>

              {/* Заголовок */}
              {title && <div className="text_lg text_bold pad-btm_md">{title}</div>}

              {/* Поля формы */}
              {children(props)}

              {/* Контролы - Сохранить/Отмена/Удалить */}
              <div className="row justify-content-between mar-top_lg">
                <div className="col-auto">
                  <button type="submit" disabled={!isValid || isSubmitting || !dirty} className="button button_md button_purple mar-right_md mar-btm_sm">
                    Сохранить
                  </button>
                  {cancel &&
                  <button type="button" disabled={isSubmitting} className="button button_md mar-btm_sm" onClick={cancel}>Отмена</button>}
                </div>
                {remove &&
                <div className="col-auto">
                  <button type="button" disabled={isSubmitting} className="button text_alignRight button_red button_md" onClick={() => remove(values.id)}>Удалить</button>
                </div>}
              </div>

            </Form>
          </Wrap>
        )
      }}
    </Formik>
  )
}

export default FormLayout