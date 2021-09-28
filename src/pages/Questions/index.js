import React from 'react'
import { PageLayout } from 'Components'
import { Route, Switch } from "react-router-dom"
import { Page404 } from 'Pages'
import { List, Question, QuestionAdd, QuestionEdit } from './containers'


const Questions = (props) => {
  return (
    <PageLayout title="Вопросы">
      <Switch>
        <Route path="/questions/add" component={QuestionAdd} />
        <Route path="/questions/:questionId([0-9]+)/edit" component={QuestionEdit} />
        <Route exact path="/questions" render={() => <List /> } />
        <Route component={Page404} />
      </Switch>
    </PageLayout>
  )
}

export default Questions