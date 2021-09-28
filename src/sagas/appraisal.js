import { takeEvery, call, put, take } from 'redux-saga/effects'
import { types } from 'Reducers/appraisal'
import { types as modalTypes } from 'Reducers/modal'
import { api, remoteGet, remoteDel, remotePost } from 'Components'
import { goBack, push } from 'connected-react-router'
import { toast } from "react-toastify"

// создание новой аттестации
function* appraisalCreateWatcher(action) {
  try {
    console.log('%c appraisalCreateWatcher ', 'background:blue;color:#fff', action)
    yield call(api.POST, '/appraisal/create', action.payload)
    yield call(action.formBag.setSubmitting, false)
    yield call(action.formBag.resetForm)
    yield call(remoteGet, '/appraisal', 'appraisal')
    yield toast.success('Спасибо! Ваш ответ отправлен.')
  } catch (error) {
    yield put({ type: 'APPRAISAL_CREATE_ERROR', error })
    yield call(action.formBag.setSubmitting, false)
  }
}

const appraisal = [
  takeEvery(types.APPRAISAL_CREATE, appraisalCreateWatcher),
]

export default appraisal