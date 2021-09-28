import React from 'react'
import { Wrap } from 'Components/ui'
import { TabNavLink } from 'Components'
import { Redirect, Route, Switch, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { EventRating, TotalRating, RatingMovement } from './Reports/index'
import { Page404 } from 'Pages'

const Reports = ({ match, workshop }) => {
  return (
    <React.Fragment>

      <div className="mar-top_lg no-wrap overflow-x">
        <TabNavLink to={`${match.url}/events`} exact={true}>Общий рейтинг</TabNavLink>
        <TabNavLink to={`${match.url}/events/1`} exact={true} isActive={path => /events\/\d+/.test(path)}>Рейтинг события</TabNavLink>
        <TabNavLink to={`${match.url}/events/flow`} exact={true}>Динамика рейтинга</TabNavLink>
      </div>

      <Wrap>

        <Switch>
          <Route exact path={`${match.path}/events`} render={() => <TotalRating />}/>
          <Route exact path={`${match.path}/events/:eventId([0-9]+)`} render={() => <EventRating workshop={workshop} />}/>
          <Route exact path={`${match.path}/events/flow`} render={() => <RatingMovement workshop={workshop} />}/>
          <Route exact path={match.path} render={() => <Redirect from={match.url} to={`${match.url}/events`} />} />
          <Route component={Page404} />
        </Switch>

      </Wrap>

    </React.Fragment>

  )
}

export default withRouter(connect(null, null)(Reports))
