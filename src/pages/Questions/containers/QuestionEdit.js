import React from 'react'
import QuestionForm from './QuestionForm'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { questionEditInitialStateSelector } from 'Selectors/question'
import { actions } from 'Reducers/question'
import { withRemoteData } from 'Components'
import questionSchema from "./validationSchema"

const QuestionEdit = (props) => <QuestionForm { ...props } />

const mapStateToProps = (state, props) => ({
  initialValues: questionEditInitialStateSelector(state, props),
  schema: questionSchema('update')
})

const mapDispatchToProps = (dispatch, props) => ({
  submit: (payload, formBag) => dispatch({ ...actions.questionUpdate(payload), formBag }),
  cancel: props.history.goBack
})

export default withRouter(withRemoteData({
  url: ({ match }) => `/question/${match.params.questionId}`, entity: 'question'
})(connect(mapStateToProps, mapDispatchToProps)(QuestionEdit)))
