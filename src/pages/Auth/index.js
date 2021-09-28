import React from 'react'
import { Logo } from 'Components'
import Login from './containers/Login'
import Registration from './containers/Registration'
import { Container } from 'semantic-ui-react'
import { Switch, Route, Redirect } from 'react-router-dom'

const Auth = (props) => {
  return (
    <Container>

      <Logo
        size="50px"
        classes="align-items-center justify-content-center pad-top_xl mar-btm_xl"
        textClasses={{ title: 'text_xxl', subTitle: 'text_xs' }}
      />

      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/registration" component={Registration}/>
        <Redirect to='/login'/>
      </Switch>

    </Container>
  )
}

export default Auth
