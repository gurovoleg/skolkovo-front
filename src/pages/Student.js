import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Profile, Appraisal, Statistics, Page404 } from 'Pages'
import { withRemoteData } from 'Components'

const Student = () => {
  return (
    <Switch>
      <Route path="/profile" component={Profile} />
      <Route path="/appraisal" component={Appraisal} />
      <Route path="/statistics" component={Statistics} />
      <Route path="/" render={() => <Redirect from="/" to="/profile" /> } />
      {/*<Route component={Page404} />*/}
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
})(Student)
