import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home, Users, Questions, Profile, Settings, Quizzes, Appraisal, Statistics } from 'Pages'
import { withRemoteData } from 'Components'

const Main = (props) => {
  return (
    <Switch>
      <Route path="/profile" component={Profile} />
      <Route path="/users" component={Users} />
      <Route path="/questions" component={Questions} />
      <Route path="/quizzes" component={Quizzes} />
      <Route path="/appraisal" component={Appraisal} />
      <Route path="/statistics" component={Statistics} />
      <Route path="/settings" component={Settings} />
      <Route path="/" component={Home} />
    </Switch>
  )
}

export default withRemoteData({
  url: [
    { url: '/role/list', entity: 'role' },
    { url: '/workshop/list', entity: 'workshop' },
    { url: '/stream/list', entity: 'stream' },
    { url: '/unit/list', entity: 'unit' },
    { url: '/user/profile', entity: 'user' }
  ]
})(Main)
