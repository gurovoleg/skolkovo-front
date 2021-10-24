import React from 'react'
import { QuestionsList } from './components/index'
import { Route, Switch } from 'react-router-dom'
import { Page404 } from 'Pages'
import { Chart } from './questions/index'

const Questions = ({ data, match }) => {
  return (

    <Switch>
      <Route exact path={`${match.path}/:questionId`} render={({ match }) => <Chart data={data} match={match}/>}/>
      <Route exact path={`${match.path}`} render={({ match }) => (
        <QuestionsList
          title="Список вопросов за все события"
          data={Object.values(data)}
          match={match} />
      )}/>
      <Route component={Page404}/>
    </Switch>

  )
}

export default Questions