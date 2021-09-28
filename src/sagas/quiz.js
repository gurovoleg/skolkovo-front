import { takeEvery, call, put, take } from 'redux-saga/effects'
import { types } from 'Reducers/quiz'
import { types as modalTypes } from 'Reducers/modal'
import { api, remoteGet, remoteDel, remotePost } from 'Components'
import { goBack, push } from 'connected-react-router'
import * as storage from 'Utils/storage'
import { types as progressbarTypes } from 'Reducers/progressbar'

// добавление нового вопроса
function* quizCreateWatcher(action) {
  try {
    console.log('%c quizCreateWatcher ', 'background:blue;color:#fff', action)
    const searchString = storage.get('quiz')
    yield call(api.POST, '/quiz/create', action.payload)
    yield call(remoteGet, `/quiz/list${searchString}`, 'quiz')
    yield put(push(`/quizzes${searchString}`))
  } catch (error) {
    yield put({ type: 'QUIZ_CREATE_ERROR', error })
    action.formBag.setSubmitting(false)
  }
}

// изменение данных опросника
function* quizUpdateWatcher(action) {
  try {
    console.log('%c quizUpdateWatcher ', 'background:blue;color:#fff', action)
    const searchString = storage.get('quiz')
    yield call(api.POST, '/quiz/update', action.payload)
    yield call(remoteGet, `/quiz/list${searchString}`, 'quiz')
    yield put(goBack())
  } catch (error) {
    yield put({ type: 'USER_UPDATE_ERROR', error })
    action.formBag.setSubmitting(false)
  }
}

// удаление опросников
function* batchDeleteWatcher({ idList }) {
  console.log('%c batchDeleteWatcher ', 'background:blue;color:#fff', idList)

  yield put({ type: modalTypes.MODAL_OPEN })
  const result = yield take([modalTypes.MODAL_CONFIRM, modalTypes.MODAL_CLOSE])

  if (result.type === modalTypes.MODAL_CONFIRM) {
    try {
      for (let i = 0; i < idList.length; i++) {
        yield call(remoteDel, `/quiz/${idList[i]}/delete`, idList[i], 'quiz')
        yield put({ type: progressbarTypes.UPDATE, id: 'modal', payload: { stages: idList.length, current: i + 1 } })
      }
      yield put({ type: modalTypes.MODAL_CLOSE })
    } catch (error) {
      yield put({ type: 'BATCH_UPDATE_ERROR', error })
    }
    yield put({ type: progressbarTypes.RESET, id: 'modal' })
    const searchString = storage.get('quiz')
    yield call(remoteGet, `/quiz/list${searchString}`, 'quiz')
  }
}

// удаление опросника
function* quizDeleteWatcher(action) {
  console.log('%c quizDeleteWatcher ', 'background:blue;color:#fff', action)

  yield put({ type: modalTypes.MODAL_OPEN, header: 'Удаление', content: 'Вы хотите удалить опросник?' })
  const result = yield take([modalTypes.MODAL_CONFIRM, modalTypes.MODAL_CLOSE])

  if (result.type === modalTypes.MODAL_CONFIRM) {
    try {
      const searchString = storage.get('quiz')
      yield call(remoteDel, `/quiz/${action.id}/delete`, action.id, 'quiz')
      yield call(remoteGet, `/quiz/list${searchString}`, 'quiz')
    } catch (error) {
      yield put({ type: 'QUIZ_DELETE_ERROR', error })
    }
    finally {
      yield put({ type: modalTypes.MODAL_CLOSE })
    }
  }
}

const question = [
  takeEvery(types.QUIZ_CREATE, quizCreateWatcher),
  takeEvery(types.QUIZ_UPDATE, quizUpdateWatcher),
  takeEvery(types.QUIZ_DELETE, quizDeleteWatcher),
  takeEvery(types.QUIZ_BATCH_DELETE, batchDeleteWatcher)
]

export default question