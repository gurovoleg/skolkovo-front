import React from 'react'
import { Route, Switch } from "react-router-dom"
import { PageLayout, User } from 'Components'
import { useSelector } from "react-redux"
import { Page404 } from 'Pages'
import { ProfileEdit } from './containers'
import { profileSelector } from 'Selectors/user'

const Profile = () => {

  const user = useSelector(profileSelector)

  return (
    <PageLayout title="Профиль">
      <Switch>
        <Route path="/profile/edit" component={ProfileEdit} />
        <Route exact path="/profile" render={({ match }) => <User match={match} user={user} profile={user} />} />
        <Route component={Page404} />
      </Switch>
    </PageLayout>
  )
}

export default Profile