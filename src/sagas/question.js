import { takeEvery, call, put, take } from 'redux-saga/effects'
import { types } from 'Reducers/question'
import { types as modalTypes } from 'Reducers/modal'
import { api, remoteGet, remoteDel, remotePost } from 'Components'
import { goBack, push } from 'connected-react-router'
import * as storage from 'Utils/storage'
import { types as progressbarTypes } from 'Reducers/progressbar'

// добавление нового вопроса
function* questionCreateWatcher(action) {
  try {
    console.log('%c questionCreateWatcher ', 'background:blue;color:#fff', action)
    const searchString = storage.get('question')
    const result = yield call(api.POST, '/question/create', action.payload)
    yield call(remoteGet, `/question/list${searchString}`, 'question')
    yield put(push(`/questions${searchString}`))
  } catch (error) {
    yield put({ type: 'QUESTION_CREATE_ERROR', error })
    action.formBag.setSubmitting(false)
  }
}

// // изменение данных вопроса
function* questionUpdateWatcher(action) {
  try {
    console.log('%c questionUpdateWatcher ', 'background:blue;color:#fff', action)
    const searchString = storage.get('question')
    const result = yield call(api.POST, '/question/update', action.payload)
    yield put(goBack())
    yield call(remoteGet, `/question/list${searchString}`, 'question')
  } catch (error) {
    yield put({ type: 'USER_UPDATE_ERROR', error })
    action.formBag.setSubmitting(false)
  }
}

// удаление вопросов
function* batchDeleteWatcher({ idList }) {
  console.log('%c batchDeleteWatcher ', 'background:blue;color:#fff', idList)

  yield put({ type: modalTypes.MODAL_OPEN })
  const result = yield take([modalTypes.MODAL_CONFIRM, modalTypes.MODAL_CLOSE])

  if (result.type === modalTypes.MODAL_CONFIRM) {
    try {
      for (let i = 0; i < idList.length; i++) {
        yield call(remoteDel, `/question/${idList[i]}/delete`, idList[i], 'question')
        yield put({ type: progressbarTypes.UPDATE, id: 'modal', payload: { stages: idList.length, current: i + 1 } })
      }
      yield put({ type: modalTypes.MODAL_CLOSE })
    } catch (error) {
      yield put({ type: 'BATCH_UPDATE_ERROR', error })
    }
    yield put({ type: progressbarTypes.RESET, id: 'modal' })
    const searchString = storage.get('question')
    yield call(remoteGet, `/question/list${searchString}`, 'question')
  }
}

// удаление вопроса
function* questionDeleteWatcher(action) {
  console.log('%c questionDeleteWatcher ', 'background:blue;color:#fff', action)

  yield put({ type: modalTypes.MODAL_OPEN, header: 'Удаление', content: 'Вы хотите удалить запись?' })
  const result = yield take([modalTypes.MODAL_CONFIRM, modalTypes.MODAL_CLOSE])

  if (result.type === modalTypes.MODAL_CONFIRM) {
    try {
      const searchString = storage.get('questions')
      yield call(remoteDel, `/question/${action.id}/delete`, action.id, 'question')
      yield call(remoteGet, `/question/list${searchString}`, 'question')
    } catch (error) {
      yield put({ type: 'QUESTION_DELETE_ERROR', error })
    }
    finally {
      yield put({ type: modalTypes.MODAL_CLOSE })
    }
  }
}

const question = [
  takeEvery(types.QUESTION_CREATE, questionCreateWatcher),
  takeEvery(types.QUESTION_UPDATE, questionUpdateWatcher),
  takeEvery(types.QUESTION_DELETE, questionDeleteWatcher),
  takeEvery(types.QUESTION_BATCH_DELETE, batchDeleteWatcher)
]

export default question