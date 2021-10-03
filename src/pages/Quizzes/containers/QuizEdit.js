import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from "react-router-dom"
import { quizEditInitialStateSelector } from 'Selectors/quiz'
import { actions } from 'Reducers/quiz'
import { withRemoteData, FormLayout, TextControl, TextAreaControl } from 'Components'
import { FieldArray } from "formik"
import { Icon } from "semantic-ui-react"
import { questionsSelector } from 'Selectors/question'
import { Select } from 'Components/ui/form/inputs'
import * as Yup from "yup"
import classNames from 'classnames'

// задаем спсиок вопросов для селекта, исключая уже выбранные вопросы
const setOptions = (questions, values) => {
  questions = questions.filter(q => !values.questions.find(e => e.id === q.id))
  return questions.map(item => ({ value: item.id, label: `${item.title}: ${item.text}` }))
}

const schema = Yup.object().noUnknown().shape({
  id: Yup.number().required(),
  title: Yup.string().required('Введите название'),
  comment: Yup.string(),
  questions: Yup.array().min(1, 'Добавьте вопрос')
})


const QuizEdit = ({ initialValues, submit, history, questions }) => {
  const [question, setQuestion] = useState('')

  return (
    <FormLayout title="Редактирование" initialValues={initialValues} submit={submit} cancel={history.goBack} schema={schema}>
      {({ values, errors }) => {
        return (
          <Fragment>

            {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}

            <FieldArray name="questions" render={({ push, remove }) => {
              return (
                <Fragment>

                  <div className="row mar-btm_md">
                    <div className="col">
                      <TextControl name='title' label="Название"/>
                    </div>
                  </div>

                  <div className="row mar-btm_md">
                    <div className="col">
                      <TextAreaControl name='comment' label="Комментарий"/>
                    </div>
                  </div>

                  <div className="wrap wrap_yellow wrap_round pad-top_md mar-btm_md">

                    <div className="text_md text_light mar-btm_sm">Добавить новый вопрос</div>

                    <div className="row align-items-center">
                      <div className="col-md-9">
                        <Select options={setOptions(questions, values)} placeholder="Выберите..." onChange={(e) => {
                          const result = questions.find(item => item.id === e.value)
                          setQuestion(result)
                        }}/>
                      </div>

                      <div className="col-auto">
                        {question &&
                        <button className="button button_md button_grey-border mar-btm_md" type="button" onClick={() => {
                          push(question)
                          setQuestion('')
                        }}>
                          Добавить
                        </button>}
                        {!question &&
                        <button className="button button_disabled button_md button_grey-border mar-btm_md" type="button">
                          Добавить
                        </button>}
                      </div>
                    </div>

                  </div>

                  <div className={classNames(
                    'wrap-inner-block wrap-inner-block_grey wrap-inner-block_round pad-top_md',
                    { 'wrap-inner_left-vertical-line_red': errors.questions }
                  )}>

                    <div className="text_md text_light">Список вопросов</div>

                    {values.questions.length === 0 && <div className="text_center text_light text_md pad-btm_sm disabled">Не задан</div>}
                    {values.questions.map((question, idx) => {
                      // console.log('11111111111', question)
                      return (
                        <div key={idx} className="row mar-btm_md mar-top_md align-items-center">

                          <div className="col">
                            <div className="form-input">
                              <div className="text_md text_regular">
                                <Link className="link" to={`/questions/${question.id}/edit`}>{question.title}</Link>
                              </div>
                              <div className="text_sm text_light pad-top_xxs">{question.text}</div>
                            </div>

                          </div>
                          <div className="col-auto text_alignRight">
                            <Icon name="close" color='grey' className="cursor-pointer" onClick={() => remove(idx)}/>
                          </div>
                        </div>
                      )
                    })}

                  </div>

                </Fragment>
              )
            }}/>

          </Fragment>
        )
      }}
    </FormLayout>
  )
}

const mapStateToProps = (state, props) => ({
  initialValues: quizEditInitialStateSelector(state, props),
  questions: questionsSelector(state)
})

const mapDispatchToProps = dispatch => ({
  submit: (values, formBag) => {
    const { id, title, comment, questions = [] } = values
    const payload = { id, title, comment, questionIds: questions.map(e => e.id) }
    dispatch({ ...actions.quizUpdate(payload), formBag })
  }
})

export default withRouter(withRemoteData({
  url: [
    { url: ({ match }) => `/quiz/${match.params.quizId}`, entity: 'quiz' },
    { url: '/question/list', entity: 'question' }
  ]
})(connect(mapStateToProps, mapDispatchToProps)(QuizEdit)))
