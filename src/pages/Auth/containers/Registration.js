import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { actions } from 'Reducers/user'
import { Link, withRouter } from "react-router-dom"
import { Formik, Form } from 'formik'
import { TextControl, PasswordControl } from 'Components'
import { Wrap } from 'Components/ui'
import * as Yup from 'yup'

const initialValues = {
  name: '',
  surname: '',
  email: '',
  password: '',
}

const schema = Yup.object().shape({
  name: Yup.string().required('Введите имя'),
  surname: Yup.string().required('Введите фамилию'),
  email: Yup.string().email('Неверный формат email').required('Введите email'),
  password: Yup.string().min(5, 'Не менее 5 символов').required('Введите пароль'),
  // 'password-confirm': Yup.string().min(5, 'Не менее 5 символов').required('Введите пароль').when(
  //   'password', (password, schema) => password ? schema.test('password-confirm', 'Пароли не совпадают', v => v === password) : schema
  // ),
})

const Registration = ({ submit }) => {
  return (
    <Fragment>

      <div className="text_center mar-btm_md mar-top_xl text_bold text_xl">Регистрация</div>

      <Wrap className="wrap_auth-wide">

        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={(values, formBag) => {
          submit(values, formBag)
        }}>
          {({ isSubmitting, dirty, isValid, values }) => {
            return (
              <Form>

                <div className="row">
                  <div className="col-md-6">
                    <TextControl name="name" label="Имя"/>
                  </div>
                  <div className="col-md-6">
                    <TextControl name="surname" label="Фамилия" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <TextControl name="email" label="Email"/>
                  </div>
                  <div className="col-md-6">
                    <PasswordControl name="password" label="Пароль"/>
                  </div>
                </div>

                <div className="text_center">
                  <button className="button button_lg button_purple mar-top_lg w-100" type="submit" disabled={!isValid || isSubmitting || !dirty}>
                    Зарегистрироваться
                  </button>
                </div>
              </Form>
            )
          }}
        </Formik>

      </Wrap>

      <div className="text_center">
        <span className="mar-right_md text_light text_grey">Уже есть аккаунт?</span>
        <Link to="/login" className="link text_grey">Войдите</Link>
      </div>

    </Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  submit: (data, formBag) => dispatch({ ...actions.userRegister(data), formBag }),
})

export default withRouter(connect(null, mapDispatchToProps)(Registration))
