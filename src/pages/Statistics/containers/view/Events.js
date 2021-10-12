import React from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Overall, Questions, Question } from "./events/index"
import { Page404 } from 'Pages'

const Events = (props) => {
  return (
    <Switch>
      <Route path={`${props.match.path}/:eventId([0-9]+)/question/:questionId([0-9]+)`} render={() => <Question/>}/>
      <Route exact path={`${props.match.path}/:eventId([0-9]+)`} render={() => <Questions/>}/>
      <Route exact path={props.match.path} render={() => <Overall {...props} />}/>
      <Redirect from={`${props.match.path}/:eventId([0-9]+)/question`} to={`${props.match.path}/:eventId([0-9]+)`} />
      <Route component={Page404} />
    </Switch>
  )
}

export default withRouter(Events)
