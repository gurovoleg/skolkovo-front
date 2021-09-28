import { all } from 'redux-saga/effects'
import auth from './auth'
import user from './user'
import error from './error'
import location from './location'
import modal from './modal'
import question from './question'
import settings from './settings'
import quiz from './quiz'
import appraisal from './appraisal'
import statistics from './statistics'
import remote from 'Components/Remote/sagas'

function* rootSaga () {
  yield all([
    ...error,
    ...auth,
    ...user,
    ...location,
    ...remote,
    ...modal,
    ...question,
    ...settings,
    ...quiz,
    ...appraisal,
    ...statistics
  ])
}

export default rootSaga