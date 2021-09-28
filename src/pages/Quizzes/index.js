import React from 'react'
import { PageLayout } from 'Components'
import { Route, Switch } from "react-router-dom"
import { Page404 } from 'Pages'
import { List, QuizEdit } from './containers'


const Quizzes = (props) => {
  return (
    <PageLayout title="Опросники">
      <Switch>
        <Route path="/quizzes/:quizId([0-9]+)/edit" component={QuizEdit} />
        <Route exact path="/quizzes" render={() => <List /> } />
        <Route component={Page404} />
      </Switch>
    </PageLayout>
  )
}

export default Quizzes