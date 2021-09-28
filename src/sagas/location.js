import { takeEvery, put } from 'redux-saga/effects'
import { showLoading } from 'react-redux-loading-bar'

function* routerLocationChangeWatcher () {
  yield put(showLoading())
}

export default [takeEvery('@@router/LOCATION_CHANGE', routerLocationChangeWatcher)]
