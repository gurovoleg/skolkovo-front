import React from 'react'
import { connect, useSelector } from 'react-redux'
import { withRemoteData, MenuNavItem, TabNavLink } from 'Components'
import { Wrap, DateValue, ValueWithLabel } from 'Components/ui'
import { Redirect, Route, Switch, withRouter } from "react-router-dom"
import { Events, Reports } from "./index"
import { Page404 } from 'Pages'
import { workshopSelector } from 'Selectors/workshop'
import { statisticsWorkshopSelector } from 'Selectors/statistics'
import { actions } from 'Reducers/statistics'
import { profileSelector } from "Selectors/user"
import { roles } from 'Root/settings'

const View = ({ match, workshop, eventsData, calculateAllEvents }) => {
  const progress = Math.floor(eventsData.length * 100 / workshop.eventsTotal)

  const profile = useSelector(profileSelector)
  const canUpdate = profile.role === roles.ADMIN

  return (
    <React.Fragment>

      <div className="second-menu overflow-x mar-btm_md mar-top_lg mar-btm_lg">
        <MenuNavItem to={`${match.url}/events`} exact={true}>События</MenuNavItem>
        <MenuNavItem to={`${match.url}/reports`} exact={true}>Отчеты</MenuNavItem>
      </div>


      <Wrap>
        <div className="row">
          <div className="col-md-3">
            <ValueWithLabel label="Практикум" value={workshop.title}/>
          </div>
          <div className="col-md-3">
            <ValueWithLabel label="Модули" value={workshop.modulesTotal}/>
          </div>
          <div className="col-md-3">
            <ValueWithLabel label="События" value={workshop.eventsTotal}/>
          </div>
          <div className="col-md-3">
            <ValueWithLabel label="Участники" value={workshop.usersTotal}/>
          </div>
        </div>


        {/* Индикатор прогресса */}
        <div className="text_sm text_regular pad-btm_xs mar-top_lg">Выполнено на {progress}%</div>
        <div className="loader-line loader-line_round">
          <div className="loader-line-fill loader-line-fill_round loader-line-fill_green" style={{ width: `${progress}%` }}></div>
        </div>

        {canUpdate &&
        <div className="text_alignRight">
          <button className="button button_md button_purple button_purple-shadow mar-top_lg" onClick={() => calculateAllEvents(workshop.id)}>Подсчитать итоги по всем событиям</button>
        </div>}

      </Wrap>

      <Switch>
        <Route exact path={`${match.path}/events`} render={() => <Events canUpdate={canUpdate} workshop={workshop} eventsData={eventsData} />}/>
        <Route path={`${match.path}/reports`} render={() => <Reports workshop={workshop} eventsData={eventsData} />}/>
        <Route exact path={match.path} render={() => <Redirect from={match.url} to={`${match.url}/events`}/>}/>
        <Route component={Page404}/>
      </Switch>

    </React.Fragment>
  )
}

const mapStateToProps = (state, props) => ({
  workshop: workshopSelector(state, props),
  eventsData: statisticsWorkshopSelector(state, props)
})

const mapDispatchToProps = dispatch => ({
  calculateAllEvents: (workshopId) => dispatch(actions.createAll(workshopId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withRemoteData({
  url: [
    { url: (props) => `/statistics/${props.match.params.workshopId}`, entity: 'statistics' },
    { url: '/user/list?perPage=1000', entity: 'user' }
  ]
})(View)))
