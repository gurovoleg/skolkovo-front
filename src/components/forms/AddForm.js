import React from 'react'
import { Formik, Form } from 'formik'
import { TextControl } from 'Components'

const AddForm = ({ submit, cancel, header, initialValues = { title: '' } }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={(values, formBag) => {
      submit(values, formBag)
    }}>
      {({ isSubmitting, dirty }) => {
        return (
          <Form>
            <div className="text_bold mar-btm_md">{header}</div>
            <div className="row align-items-center mar-btm_lg">
              <div className="col-md-8">
                <TextControl name="title" placeholder="Введите название" />
              </div>
              <div className="col-md-auto">
                <button type="submit" disabled={isSubmitting || !dirty} className="button button_sm text_md button_purple mar-right_md mar-btm_md">Сохранить</button>
                <button type="button" disabled={isSubmitting} className="button button_sm text_md mar-btm_md" onClick={cancel}>Отмена</button>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AddForm