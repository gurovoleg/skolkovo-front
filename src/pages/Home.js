import React from 'react'
import { connect } from 'react-redux'
import { PageLayout } from 'Components'
import { profileSelector } from "Selectors/user"

const Main = ({ profile }) => {
  return (
    <PageLayout title="Главная">

      {/*<pre>{JSON.stringify(profile, null, 2)}</pre>*/}

    </PageLayout>
  )
}

const mapStateToProps = state => ({
  profile: profileSelector(state)
})


export default connect(mapStateToProps)(Main)
