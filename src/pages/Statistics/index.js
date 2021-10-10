import React from 'react'
import { PageLayout } from 'Components'
import { Switch, Route } from 'react-router-dom'
import { List, View } from "./containers"
import { Page404 } from 'Pages'

const Statistics = () => {
  return (
    <PageLayout title="Статистика">

      <Switch>
        <Route path="/statistics/:workshopId([0-9]+)" component={View} />
        <Route exact path="/statistics" component={List} />
        <Route component={Page404}/>
      </Switch>

    </PageLayout>
  )
}

export default Statistics
