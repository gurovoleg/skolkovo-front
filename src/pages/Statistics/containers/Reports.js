import React from 'react'
import { Wrap } from 'Components/ui'
import { TabNavLink } from 'Components'
import { Redirect, Route, Switch, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { EventRating, TotalRating, PositionMovement, GroupMovement } from './Reports/index'
import { Page404 } from 'Pages'

const Reports = ({ match, workshop }) => {
  return (
    <React.Fragment>

      <div className="mar-top_lg no-wrap overflow-x">
        <TabNavLink to={`${match.url}/events`} exact={true}>Общий рейтинг</TabNavLink>
        <TabNavLink to={`${match.url}/events/1`} exact={true} isActive={path => /events\/\d+/.test(path)}>Рейтинг события</TabNavLink>
        <TabNavLink to={`${match.url}/position`} exact={true}>Динамика рейтинга</TabNavLink>
        <TabNavLink to={`${match.url}/group`} exact={true}>Динамика группы</TabNavLink>
      </div>

      <Wrap>

        <Switch>
          <Route exact path={`${match.path}/events`} render={() => <TotalRating />}/>
          <Route exact path={`${match.path}/events/:eventId([0-9]+)`} render={() => <EventRating workshop={workshop} />}/>
          <Route exact path={`${match.path}/position`} render={() => <PositionMovement workshop={workshop} />}/>
          <Route exact path={`${match.path}/group`} render={() => <GroupMovement workshop={workshop} />}/>
          <Route exact path={match.path} render={() => <Redirect from={match.url} to={`${match.url}/events`} />} />
          <Route component={Page404} />
        </Switch>

      </Wrap>

    </React.Fragment>

  )
}

export default withRouter(connect(null, null)(Reports))
