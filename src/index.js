import React from 'react'
import ReactDOM from 'react-dom'
import App from "./app"
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import configureStore from './utils/configureStore'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css' // semantic styles
import './styles/style.scss' // custom styles
import './styles/calendar.css' // custom styles
import './styles/ReactToastify.css' // notifications styles
import './fonts/font-gotham.css' // fonts
import { Switch, Route } from 'react-router-dom'

const history = createBrowserHistory()
const store = configureStore(history)

// store.dispatch({ type: 'TEST' })
// store.dispatch(() => ({ type: 'TEST' }))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/guidelines" render={() => <h1>Guidelines</h1>} />
        <Route component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
