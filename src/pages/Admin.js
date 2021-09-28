import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Users, Questions, Profile, Settings, Quizzes, Appraisal, Statistics, Page404 } from 'Pages'
import { withRemoteData } from 'Components'

const Admin = () => {
  return (
    <Switch>
      <Route path="/profile" component={Profile} />
      <Route path="/users" component={Users} />
      <Route path="/questions" component={Questions} />
      <Route path="/quizzes" component={Quizzes} />
      <Route path="/appraisal" component={Appraisal} />
      <Route path="/statistics" component={Statistics} />
      <Route path="/settings" component={Settings} />
      <Route path="/" render={() => <Redirect from="/" to="/profile" /> } />
      {/*<Route component={Page404} />*/}
      {/*<Route path="/" component={Home} />*/}
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
})(Admin)
