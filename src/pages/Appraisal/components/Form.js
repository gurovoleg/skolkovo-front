import React from 'react'
import classNames from "classnames"
import { Icon, Label } from "semantic-ui-react"
import { connect } from 'react-redux'
import { withRemoteData, SelectControl } from 'Components'
import { appraisalSelector, appraisalInitialStateSelector } from 'Selectors/appraisal'
import { WrapInner, Wrap, Empty } from 'Components/ui'
import { momentFromDate } from 'Utils/date'
import { Answer, Label as AppraisalLabel } from './index'
import { actions } from 'Reducers/appraisal'
import { Form, Formik } from "formik"
import * as Yup from "yup"

const schema = Yup.object().noUnknown().shape({
  certifier: Yup.string().required('Не указан certifier'),
  attested: Yup.string().required('Не выбран участник'),
  workshopId: Yup.string().required('Не указан практикум'),
  module: Yup.string().required('Не указан модуль'),
  event: Yup.string().required('Не указано событие'),
  quizId: Yup.string().required('Не указан опросник'),
  result: Yup.array().of(
    Yup.object().noUnknown().shape({
      id: Yup.string().required(),
      // text: Yup.string().required(),
      answer: Yup.string().required('Не задан ответ'),
      ratingRange: Yup.string()
      // isRating: Yup.bool()
    })
  )
})

const setUserOptions = users => {
  return users.map(user => ({ label: `${user.name} ${user.surname}`, value: user.id, stream: user.streamId }))
}

const FormComponent = ({ appraisal, initialValues, submit }) => {
  const { workshop, quiz, users } = appraisal

  return (
    <React.Fragment>

      {(users.length === 0 || quiz.questions.length === 0) && <Empty message="Нет данных для аттестации." />}

      {(users.length > 0 &&  quiz.questions.length > 0) &&
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
        {({ values, setFieldValue, errors, isSubmitting, dirty, isValid }) => (
          <Wrap className={classNames('wrap_line', { 'wrap_line-red': Object.keys(errors).length > 0 })}>
            <Form>
              {/* Практикум */}
              <AppraisalLabel name="Практикум" icon="sitemap"/>

              {/*<pre>{JSON.stringify(errors, null, 2)}</pre>*/}
              {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}

              <Label.Group size='large' className="mar-btm_lg">
                <Label color="red"><Icon name="sitemap"/>{workshop.title}</Label>
                <Label color="blue"><Icon name="clone"/>Модуль {workshop.modulesCurrent}</Label>
                <Label color="blue"><Icon name="bullseye"/>Событие {workshop.eventsCurrent}</Label>
                <Label color="green"><Icon name="calendar alternate outline"/>{momentFromDate().format('YYYY-MM-DD')}</Label>
              </Label.Group>

              {/* Аттестуемый */}
              <AppraisalLabel name="Аттестуемый" icon="user plus"/>

              <WrapInner className="mar-btm_lg">
                <div className="row align-items-center">
                  <div className="col-12 mar-btm_md text_xs text_purple">
                    * Выберите участника, которого вы будете аттестовывать
                  </div>

                  <div className="col-md-4">
                    <SelectControl className="mar-btm_no" name="attested" label="Участник аттестации" options={setUserOptions(users)} onChange={(v) => {
                       setFieldValue('attested', v.value)
                      setFieldValue('streamId', v.stream)
                    }}/>
                  </div>
                </div>
              </WrapInner>

              {/* Вопросы */}
              <AppraisalLabel name="Вопросы" icon="clipboard"/>

              {quiz.questions && quiz.questions.map((question, idx) => {
                const hasAnswer = values.result[idx].answer !== ''

                return (
                  <WrapInner color={hasAnswer ? 'grey' : 'yellow'} key={idx} className="mar-btm_md pad-top_lg">
                    <div className="row">
                      <div className="col">
                        <div className="text_md text_regular mar-btm_md">{idx + 1}. {question.text}</div>
                      </div>
                    </div>

                    <div className="row">
                      <Answer data={question.answers} name={`result[${idx}].answer`} setFieldValue={setFieldValue}/>
                    </div>
                  </WrapInner>)
              })}

              {/* Контрол - Сохранить */}
              <div className="text_center mar-top_lg">
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting || !dirty}
                  className="button button_md button_purple w-100">
                  Сохранить
                </button>
              </div>

            </Form>
          </Wrap>
        )}
      </Formik>}

    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  appraisal: appraisalSelector(state),
  initialValues: appraisalInitialStateSelector(state)
})

const mapDispatchToProps = dispatch => ({
  submit: (payload, formBag) => dispatch({ ...actions.appraisalCreate(payload), formBag })
})

export default withRemoteData({
  url: '/appraisal', entity: 'appraisal'
})(connect(mapStateToProps, mapDispatchToProps)(FormComponent))
