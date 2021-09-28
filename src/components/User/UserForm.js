import React from 'react'
import { Formik, Form } from "formik"
import { Wrap } from 'Components/ui'
import { TextControl, SelectControl, RadioControl, PasswordControl, NumberControl } from 'Components'
import { Checkbox } from 'Components/ui/form/inputs'
import { userStatuses } from 'Root/settings'
import classNames from "classnames"
import { connect } from 'react-redux'
import { rolesSelector, unitsSelector, streamsSelector } from "Selectors"
import { workshopsSelector } from "Selectors/workshop"

const UserForm = ({ submit, history, initialValues, schema, type, roles, workshops, streams, units }) => {

  console.log('89898898989898', units)

  return (
    // <Formik initialValues={initialValues} onSubmit={(values, formBag) => {
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={(values, formBag) => {
      const result = Object.assign({}, values)
      if (!result.changePassword) {
        delete result.password
        delete result.changePassword
      }
      submit(result, formBag)
    }}>
      {({ setFieldValue, setFieldTouched, setFieldError, errors, isSubmitting, dirty, isValid, values }) => {
        return (
          <Wrap className={classNames('wrap_line', { 'wrap_line-red': Object.keys(errors).length > 0 })}>

            {/*<pre>{JSON.stringify(errors, null, 2)}</pre>*/}
            {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}

            <Form>

              <div className="text_lg text_bold pad-btm_md">Личные данные</div>

              <div className="row mar-btm_md">
                <div className="col-auto">
                  <RadioControl inline name='roleId' label="Роль" options={roles}/>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <TextControl name="name" label="Имя"/>
                </div>
                <div className="col-md-4">
                  <TextControl name="surname" label="Фамилия"/>
                </div>
                <div className="col-md-4">
                  <TextControl name="patronymic" label="Отчество"/>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <RadioControl inline name='gender' label="Пол" options={[
                    { label: "Мужской", value: "male" },
                    { label: "Женский", value: "female" },
                  ]}/>
                </div>
                <div className="col-md-4">
                  <NumberControl name="age" min="18" max="100" label="Возраст"/>
                </div>
              </div>

              <div className="text_lg text_bold pad-btm_md pad-top_md">Логин и пароль</div>

              <div className="row">
                <div className="col-md-4">
                  <TextControl name="email" type="email" label="Email"/>
                </div>
                <div className="col-md-4">
                  <PasswordControl name="password" label="Пароль" disabled={!values.changePassword} />
                </div>
                {/* Для существующего пользователя */}
                {type === 'update' &&
                <div className="col-md-4">
                  <Checkbox label="Изменить пароль" onChange={(e) => {
                    setFieldValue('changePassword', e.target.checked ? 'true' : '')
                    if (!e.target.checked) {
                      setFieldError('password', '')
                      setFieldTouched('password', false)
                      setFieldValue('password', '')
                    }
                  }} />
                </div>}
              </div>

              <div className="text_lg text_bold pad-btm_md pad-top_md">Практикум</div>

              <div className="row">
                <div className="col-md-3">
                  <SelectControl name="workshopId" placeholder="Выберите..." label="Практикум" options={workshops}/>
                </div>
                <div className="col-md-3">
                  <SelectControl name="streamId" placeholder="Выберите..." label="Поток" options={streams}/>
                </div>
                <div className="col-md-3">
                  <TextControl name="headquarters" label="Штаб" />
                </div>
                <div className="col-md-3">
                  <SelectControl name="unitId" placeholder="Выберите..." label="Группа" options={units} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <SelectControl name="status" label="Статус" options={Object.values(userStatuses)}/>
                </div>
                <div className="col-md-3">
                  <TextControl name="created" label="Дата создания" disabled />
                </div>

                <div className="col-md-3">
                  <TextControl name="rating" label="Рейтинг" type="number" min="0" max="100"/>
                </div>
              </div>

              <button className="button button_md button_purple mar-top_lg mar-right_md" type="submit" disabled={!isValid || isSubmitting || !dirty}>
              {/*<button className="button button_md button_purple mar-top_md mar-right_md" type="submit">*/}
                Сохранить
              </button>
              <button className="button button_md mar-top_lg" type="button" onClick={history.goBack} disabled={isSubmitting}>
                Отмена
              </button>

            </Form>
          </Wrap>
        )
      }}
    </Formik>
  )
}

const setOptions = (data) => {
  return data.map(item => ({ value: item.id, label: item.title }))
}

const mapStateToProps = state => ({
  roles: setOptions(rolesSelector(state)),
  workshops: setOptions(workshopsSelector(state)),
  streams: setOptions(streamsSelector(state)),
  units: setOptions(unitsSelector(state))
})

export default connect(mapStateToProps)(UserForm)