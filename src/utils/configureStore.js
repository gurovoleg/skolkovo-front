import { createStore, applyMiddleware } from 'redux'
import logger from './logger'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import createRootReducer from 'Root/reducers'
import rootSaga from 'Root/sagas'

const configureStore = (history) => {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    undefined,
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history), // for dispatching history actions
      logger
    )
  )

  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore