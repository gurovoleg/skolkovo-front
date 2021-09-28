import React, { Fragment } from 'react'
import { withFormik, Form } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { actions } from 'Reducers/auth'
import { Link } from 'react-router-dom'
import { TextControl, PasswordControl } from 'Components'
import { Wrap } from 'Components/ui'


const LoginComponent = (props) => {
  const { isSubmitting, isValid, dirty } = props

  return (
    <Fragment>

      <div className="text_center mar-btm_md mar-top_xl text_bold text_xl">Авторизация</div>

      <Wrap className="wrap_auth">
        <Form>
          <TextControl name="email" label="Email" />
          <PasswordControl name="password" label="Пароль" />
          <div className="text_center pad-top_md">
            <button className="button button_lg button_purple mar-top_sm w-100" type="submit" disabled={!isValid || isSubmitting || !dirty}>
              Войти
            </button>
          </div>
        </Form>
      </Wrap>

      <div className="text_center">
        <span className="mar-right_md text_light text_grey">Нет аккаунта?</span>
        <Link to="/registration" className="link text_grey">Зарегистрируйтесь</Link>
      </div>

    </Fragment>
  )
}

const Login = withFormik({
  mapPropsToValues(props) {
    return {
      email: props.email || '',
      password: props.password || ''
    }
  },
  handleSubmit({ password, email }, formikBag) {
    formikBag.props.login({ password, email }, formikBag)
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Неверный формат email').required('Необходимо ввести email'),
    password: Yup.string().min(5, 'Пароль должен быть не менее 5 символов').required('Необходимо ввести пароль')
  })
})(LoginComponent)

const mapDispatchToProps = dispatch => ({
  login: (data, formikBag) => dispatch({ ...actions.login(data), formikBag }),
})

export default connect(null, mapDispatchToProps)(Login)
