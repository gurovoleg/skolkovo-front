import React from 'react'
import { Wrap } from 'Components/ui'
import { TabNavLink } from 'Components'
import { Redirect, Route, Switch, withRouter } from "react-router-dom"
import { EventRating, TotalRating, PositionMovement, GroupMovement } from './rating/index'
import { Page404 } from 'Pages'

const Rating = ({ match, workshop }) => {
  return (
    <React.Fragment>

      <div className="mar-top_lg no-wrap overflow-x">
        <TabNavLink to={`${match.url}`} exact={true}>Общий</TabNavLink>
        <TabNavLink to={`${match.url}/event/1`} exact={true} isActive={path => /event\/\d+/.test(path)}>Cобытие</TabNavLink>
        <TabNavLink to={`${match.url}/position`} exact={true}>Позиция</TabNavLink>
        <TabNavLink to={`${match.url}/group`} exact={true}>Динамика группы</TabNavLink>
      </div>

      <Wrap>

        <Switch>
          <Route exact path={`${match.path}`} render={() => <TotalRating />}/>
          <Route exact path={`${match.path}/event/:eventId([0-9]+)`} render={() => <EventRating workshop={workshop} />}/>
          <Route exact path={`${match.path}/position`} render={() => <PositionMovement workshop={workshop} />}/>
          <Route exact path={`${match.path}/group`} render={() => <GroupMovement workshop={workshop} />}/>
          <Route exact path={match.path} render={() => <Redirect from={match.url} to={`${match.url}/events`} />} />
          <Route component={Page404} />
        </Switch>

      </Wrap>

    </React.Fragment>

  )
}

export default withRouter(Rating)
