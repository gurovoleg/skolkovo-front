import React from 'react'
import { Route, Switch, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { eventSelector, eventQuestionSelector } from 'Selectors/statistics'
import { TabNavLink } from 'Components'
import { Table, Chart } from './question/index'
import { Page404 } from 'Pages'

const Question = ({ event, match, chartData }) => {

  console.log('111111111111', chartData)

  return (
    <React.Fragment>

      <div className="mar-top_lg no-wrap overflow-x">
        <TabNavLink to={`${match.url}`} exact={true}>Таблица</TabNavLink>
        <TabNavLink to={`${match.url}/chart`} exact={true}>Диаграмма</TabNavLink>
      </div>

      <Switch>
        <Route exact path={`${match.path}`} render={() => <Table event={event} />}/>
        <Route exact path={`${match.path}/chart`} render={() => <Chart data={chartData} />}/>
        <Route component={Page404}/>
      </Switch>

    </React.Fragment>
  )
}

const mapStateToProps = (state, props) => ({
  event: eventSelector(state, props),
  chartData: eventQuestionSelector()(state, props)
})

export default withRouter(connect(mapStateToProps)(Question))
