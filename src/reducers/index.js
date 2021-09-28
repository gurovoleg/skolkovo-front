import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { default as authReducer } from './auth'
import { default as paginationReducer } from './pagination'
import { default as modalReducer } from './modal'
import { default as progressbarReducer } from './progressbar'
import { default as remoteReducer } from 'Components/Remote/reducers'

const createRootReducer = history => combineReducers({
  loadingBar: loadingBarReducer,
  auth: authReducer,
  pagination: paginationReducer,
  remote: remoteReducer,
  modal: modalReducer,
  progressbar: progressbarReducer,
  router: connectRouter(history),
})

export default createRootReducer
export { remoteReducer }