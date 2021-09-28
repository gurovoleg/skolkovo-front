import { takeEvery, take, put, select, call, delay } from 'redux-saga/effects'
import { types } from 'Reducers/settings'
import { api, remoteGet, remoteDel, remotePost } from 'Components'
import { types as modalTypes } from 'Reducers/modal'
import { goBack } from 'connected-react-router'

function* createWatcher ({ entity, data, formBag }) {
  console.log('%c createWatcher ', 'background:blue;color:#fff')
  try {
    const result = yield call(api.POST, `/${entity}/create`, data)
    if (!result.error) {
      yield call(remoteGet, `/${entity}/list`, entity)
    }
  } catch (error) {
    yield put({ type: 'CREATE_FAILURE', error })
    yield call(formBag.setSubmitting, false)
  }
}

function* removeWatcher ({ entity, id, redirectBack = false }) {
  console.log('%c deleteWatcher ', 'background:blue;color:#fff', entity, id)

  yield put({ type: modalTypes.MODAL_OPEN, header: 'Удаление', content: 'Вы хотите удалить данные?' })
  const result = yield take([modalTypes.MODAL_CONFIRM, modalTypes.MODAL_CLOSE])
  if (result.type === modalTypes.MODAL_CONFIRM) {
    try {
      yield call(remoteDel, `/${entity}/${id}/delete`, id, entity)
      // при удалении из формы редактирования
      if (redirectBack) {
        yield put(goBack())
      }
    } catch (error) {
      yield put({ type: 'DELETE_FAILURE', error })
    }
    finally {
      yield put({ type: modalTypes.MODAL_CLOSE })
    }
  }

}

function* updateWatcher ({ entity, data, modalBag }) {
  console.log('%c updateWatcher ', 'background:blue;color:#fff', entity, data, modalBag)
  try {
    const result = yield call(api.POST, `/${entity}/${data.id}/update`, data)
    if (!result.error) {
      yield call(modalBag.close)
      yield call(remoteGet, `/${entity}/list`, entity)
    }
  } catch (error) {
    yield put({ type: 'UPDATE_FAILURE', error })
    yield call(modalBag.busy, false)
  }
}


function* workShopUpdateWatcher ({ data, formBag }) {
  console.log('%c updateWatcher ', 'background:blue;color:#fff', data)
  try {
    const result = yield call(api.POST, `/workshop/${data.id}/update`, data)
    if (!result.error) {
      yield call(formBag.setSubmitting, false)
      yield put(goBack())
      yield call(remoteGet, '/workshop/list', 'workshop')
    }
  } catch (error) {
    yield put({ type: 'UPDATE_FAILURE', error })
    yield call(formBag.setSubmitting, false)
  }
}

function* workShopChangeStatusWatcher ({ data }) {
  console.log('%c workShopChangeStatusWatcher ', 'background:blue;color:#fff', data)

  const header = data.status === 'active' ? 'Активация' : 'Завершение'
  const content = data.status === 'active' ? 'Активировать данный Практикум? Предыдущий станет неактивным.' : 'Вы хотите завершить Практикум?'

  yield put({ type: modalTypes.MODAL_OPEN, header, content })
  const result = yield take([modalTypes.MODAL_CONFIRM, modalTypes.MODAL_CLOSE])
  if (result.type === modalTypes.MODAL_CONFIRM) {
    try {
      const result = yield call(remotePost, `/workshop/${data.id}/update`, data)
      if (!result.error) {
        yield call(remoteGet, `/workshop/list`, 'workshop')
      }
    } catch (error) {
      yield put({ type: 'CHANGE_STATUS_FAILURE', error })
    }
    finally {
      yield put({ type: modalTypes.MODAL_CLOSE })
    }
  }

}

const modal = [
  takeEvery(types.CREATE, createWatcher),
  takeEvery(types.REMOVE, removeWatcher),
  takeEvery(types.UPDATE, updateWatcher),
  takeEvery(types.WORKSHOP_UPDATE, workShopUpdateWatcher),
  takeEvery(types.WORKSHOP_CHANGE_STATUS, workShopChangeStatusWatcher),
]

export default modal
