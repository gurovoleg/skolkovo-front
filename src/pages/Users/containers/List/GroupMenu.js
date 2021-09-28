import React from 'react'
import { Form, Formik } from "formik"
import classNames from "classnames"
import { PluralValue } from 'Components/ui'
import { TextControl, SelectControl, CheckboxControl } from 'Components'
import { userStatuses } from 'Root/settings'
import { connect } from 'react-redux'
import { actions } from 'Reducers/user'
import { streamsSelector, unitsSelector } from "Selectors"
import { workshopsSelector } from "Selectors/workshop"

let initialValues = {
  status: { enabled: false, value: '' },
  workshopId: { enabled: false, value: '' },
  streamId: { enabled: false, value: '' },
  unitId: { enabled: false, value: '' },
  headquarters: { enabled: false, value: '' },
}

// валидатор формы
const validateForm = (props) => {
  let isAnyEnabled = false
  let isEmpty = false
  Object.keys(props).forEach(key => {
    if (props[key].enabled && !props[key].value) isEmpty = true
    if (props[key].enabled) isAnyEnabled = true
  })
  if (isEmpty) return { error: 'Не заполнено поле' }
  if (!isAnyEnabled) return { error: 'Не выбрано ни одного поля' }
}

// подготавливаем данные для отправки на бэк
const formatValues = values => {
  return Object.keys(values).reduce((result, key) => {
    return values[key].value ? { ...result, [key]: values[key].value } : result
  }, {})
}

const GroupMenu = ({ cancel, idList, workshops, streams, units, submitHandler }) => {
  return (
    <Formik initialValues={initialValues} validate={validateForm} onSubmit={(values, formBag) => {
      submitHandler(formatValues(values), idList, formBag)
    }}>
      {({ errors, isSubmitting, dirty, isValid, values, setSubmitting }) => {
        return (
          <div className={classNames('wrap wrap_yellow wrap_shadow wrap_round pad-top_md pad-btm_md mar-btm_md')}>

            {/*<pre>{JSON.stringify(errors, null, 2)}</pre>*/}
            {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}

            {idList.length > 0 &&
            <Form>

              <div className="text_md text_bold pad-btm_md pad-top_md">
                Выбрано <PluralValue number={idList.length} values={['пользователь', 'пользователя', 'пользователей']}/>
              </div>

              <div className="row">
                <div className="col-md">
                  <CheckboxControl name="workshopId.enabled" label="Практикум"/>
                  <SelectControl name="workshopId.value" placeholder="Не выбран" options={workshops} disabled={!values.workshopId.enabled}/>
                </div>
                <div className="col-md">
                  <CheckboxControl name="streamId.enabled" label="Поток"/>
                  <SelectControl name="streamId.value" placeholder="Не выбран" options={streams} disabled={!values.streamId.enabled}/>
                </div>
                <div className="col-md">
                  <CheckboxControl name="headquarters.enabled" label="Штаб"/>
                  <TextControl name="headquarters.value" placeholder="Не указан" disabled={!values.headquarters.enabled}/>
                </div>
                <div className="col-md">
                  <CheckboxControl name="unitId.enabled" label="Группа"/>
                  <SelectControl name="unitId.value" placeholder="Не выбрана" options={units} disabled={!values.unitId.enabled}/>
                </div>
                <div className="col-md">
                  <CheckboxControl name="status.enabled" label="Статус"/>
                  <SelectControl name="status.value" placeholder="Не выбран" options={Object.values(userStatuses)} disabled={!values.status.enabled}/>
                </div>
              </div>

              <button className="button button_md button_purple text_sm mar-top_md mar-right_sm" type="submit" disabled={!isValid || isSubmitting || !dirty}>
                {/*<button className="button button_md button_purple mar-top_md mar-right_md" type="submit">*/}
                Сохранить
              </button>
              <button className="button button_md text_sm" type="button" onClick={cancel} disabled={isSubmitting}>
                Отмена
              </button>

            </Form>}

            {idList.length === 0 &&
            <div className="row justify-content-between align-items-center">
              <div className="text_md text_bold pad-btm_md pad-top_md">Выберите пользователей</div>
              <button className="button text_sm button_md" type="button" onClick={cancel} disabled={isSubmitting}>
                Отмена
              </button>
            </div>}

          </div>
        )
      }}
    </Formik>
  )
}

const setOptions = (data) => {
  return data.map(item => ({ value: item.id, label: item.title }))
}

const mapStateToProps = (state) => ({
  workshops: setOptions(workshopsSelector(state)),
  streams: setOptions(streamsSelector(state)),
  units: setOptions(unitsSelector(state))
})

const mapDispatchToProps = dispatch => ({
  submitHandler: (values, idList, formBag) => dispatch({ ...actions.userBatchUpdate(values, idList), formBag }),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupMenu)
