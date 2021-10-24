import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { eventSelector } from 'Selectors/statistics'
import { QuestionsList } from '../components'

const Questions = ({ event, match }) => {
  return (
    <QuestionsList
      path="question"
      title={`Событие ${event.event}. Вопросы`}
      data={event.questions}
      match={match} />
  )
}

const mapStateToProps = (state, props) => ({
  event: eventSelector(state, props)
})

export default withRouter(connect(mapStateToProps)(Questions))
