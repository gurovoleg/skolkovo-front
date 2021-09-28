import React from 'react'
import { PageLayout } from 'Components'
import { Switch, Route } from 'react-router-dom'
import { List, View } from "./containers"

const Statistics = (props) => {
  return (
    <PageLayout title="Статистика">

      <Switch>
        <Route path="/statistics/:workshopId([0-9]+)" component={View} />
        <Route path="/statistics" component={List} />
      </Switch>

    </PageLayout>
  )
}

export default Statistics
