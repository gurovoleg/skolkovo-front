import React from 'react'
import { PageLayout } from 'Components'
import { Route, Switch } from "react-router-dom"
import { Page404 } from 'Pages'
import { List, User, UserEdit, UserAdd } from './containers'


const Users = (props) => {
  return (
    <PageLayout title="Пользователи">
      <Switch>
        <Route path="/users/add" component={UserAdd} />
        <Route path="/users/:userId([0-9]+)/edit" component={UserEdit} />
        <Route path="/users/:userId([0-9]+)" component={User} />
        <Route exact path="/users" render={() => <List /> } />
        <Route component={Page404} />
      </Switch>
    </PageLayout>
  )
}

export default Users
