import React from 'react'
import { connect } from 'react-redux'
import { PageLayout, MenuNavItem } from 'Components'
import { Route, Switch, withRouter, Link, Redirect } from "react-router-dom"
import { Page404 } from 'Pages'
import { Units, Streams, Roles, Workshops } from './containers'

const menu = [
  { to: '/settings/workshop', text: 'Практикумы', exact: true },
  { to: '/settings/stream', text: 'Потоки', exact: true },
  { to: '/settings/unit', text: 'Группы', exact: true },
  { to: '/settings/role', text: 'Роли', exact: true },
]

const Settings = ({ match }) => {
  return (
    <PageLayout title="Настройки">

      <div className="second-menu overflow-x mar-btm_lg">
        {menu.map(item => <MenuNavItem key={item.to} {...item}>{item.text}</MenuNavItem>)}
      </div>

      <Switch>
        <Route exact path={`${match.path}/role`} component={Roles} />
        <Route exact path={`${match.path}/stream`} component={Streams} />
        <Route exact path={`${match.path}/unit`} component={Units} />
        <Route path={`${match.path}/workshop`} component={Workshops} />
        <Route exact path={match.path} render={() => <Redirect from={match.path} to={`${match.path}/workshop`} /> } />
        <Route component={Page404} />
      </Switch>

    </PageLayout>
  )
}

export default withRouter(Settings)