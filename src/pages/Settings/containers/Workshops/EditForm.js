import React from 'react'
import { connect } from "react-redux"
import { ValueWithLabel } from 'Components/ui'
import { withRouter } from "react-router-dom"
import { withRemoteData, TextControl, NumberControl, SelectControl, FormLayout } from 'Components'
import { workshopEditInitialStateSelector } from 'Selectors/workshop'
import { quizzesSelector } from 'Selectors/quiz'
import * as Yup from "yup"
import { actions } from 'Reducers/settings'
import { workshopStatuses as statuses } from "Root/settings"

const setStatusOptions = data => Object.keys(data).map(key => ({ value: data[key].value, label: data[key].label }))
const setQuizOptions = data => data.map(item => ({ value: item.id, label: item.title }))

const schema = Yup.object().shape({
  id: Yup.string().required(),
  title: Yup.string().required('Введите название'),
  status: Yup.string(),
  modulesTotal: Yup.number().nullable(true).transform((c, o) => o === '' ? null : c).required('Укажите модули').min(1, 'Не менее 1').max(100, 'Не более 100'),
  eventsTotal: Yup.number().nullable(true).transform((c, o) => o === '' ? null : c).required('Укажите события').min(1, 'Не менее 1').max(100, 'Не более 100'),
  modulesCurrent: Yup.number().nullable(true).transform((c, o) => o === '' ? null : c),
  eventCurrent: Yup.number().nullable(true).transform((c, o) => o === '' ? null : c),
  quizId: Yup.number().nullable(true).transform((c, o) => o === '' ? null : c)
})

const EditForm = ({ initialValues, quizzes, history, submit, remove }) => {
  return (
    <FormLayout
      title="Редактирование"
      schema={schema}
      initialValues={initialValues}
      submit={submit}
      cancel={history.goBack}
      remove={(id) => remove(id, true)}>

      {({ values }) => (
        <React.Fragment>

          <div className="row mar-btm_md">
            <div className="col-md-3">
              <TextControl name="title" label="Название" />
            </div>
            <div className="col-md-3">
              <ValueWithLabel label="Дата создания" value={values.created} />
            </div>
            <div className="col-md-3">
              <ValueWithLabel label="Дата обновления" value={values.updated} />
            </div>
            <div className="col-md-3">
              <ValueWithLabel label="Участники" value={values.usersTotal} />
            </div>
          </div>

          <div className="row mar-btm_md">
            <div className="col-md-3">
              <SelectControl label="Статус" name="status" options={setStatusOptions(statuses)} />
            </div>
          </div>

          <div className="row mar-btm_md">
            <div className="col-md-3">
              <NumberControl name="modulesTotal" label="Кол-во модулей" min={0} max={100} />
            </div>
            <div className="col-md-3">
              <NumberControl name="eventsTotal" label="Кол-во событий" min={0} max={100} />
            </div>
          </div>

          <div className="row mar-btm_lg">
            <div className="col-md-3">
              <NumberControl name="modulesCurrent" label="Активный модуль" min={0} max={initialValues.modulesTotal} />
            </div>
            <div className="col-md-3">
              <NumberControl name="eventsCurrent" label="Активное событие" min={0} max={initialValues.eventsTotal} />
            </div>
            <div className="col-md-3">
              <SelectControl options={setQuizOptions(quizzes)} name="quizId" label="Опросник" placeholder="Выберите..." />
            </div>
          </div>

        </React.Fragment>
      )}

    </FormLayout>
  )
}

const mapStateToProps = (state, props) => ({
  initialValues: workshopEditInitialStateSelector(state, props),
  quizzes: quizzesSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  submit: (data, formBag) => dispatch({ ...actions.updateWorkshop(data), formBag }),
})

export default withRouter(withRemoteData({
  url: [
    { url: ({ match }) => `/workshop/${match.params.workshopId}`, entity: 'workshop' },
    { url: '/quiz/list', entity: 'quiz' }
  ]
})(connect(mapStateToProps, mapDispatchToProps)(EditForm)))
