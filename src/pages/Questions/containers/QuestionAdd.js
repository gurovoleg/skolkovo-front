import React from 'react'
import QuestionForm from './QuestionForm'
import { connect } from 'react-redux'
import { questionAddInitialStateSelector } from 'Selectors/question'
import { actions } from 'Reducers/question'
import questionSchema from './validationSchema'
import { withRouter } from "react-router-dom"

const QuestionAdd = (props) => <QuestionForm { ...props } />

const mapStateToProps = state => ({
  initialValues: questionAddInitialStateSelector(state),
  schema: questionSchema('create')
})

const mapDispatchToProps = (dispatch, props) => ({
  submit: (payload, formBag) => dispatch({ ...actions.questionCreate(payload), formBag }),
  cancel: props.history.goBack
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionAdd))

