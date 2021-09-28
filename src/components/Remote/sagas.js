import { takeEvery, take, call, put, delay } from 'redux-saga/effects'
import { types } from './reducers'
import * as api from './api'
import { types as authTypes } from 'Reducers/auth'
import { types as paginationTypes } from 'Reducers/pagination'

export function* get(url, entity) {
  yield put({ type: types.GET, url, entity })
  return yield take(action => [types.GET_SUCCESS, types.GET_FAILURE].includes(action.type) && action.url === url)
}

export function* del(url, id, entity) {
  yield put({ type: types.DELETE, url, id, entity })
  return yield take(action => [types.DELETE_SUCCESS, types.DELETE_FAILURE].includes(action.type) && action.url === url)
}

export function* post(url, payload) {
  yield put({ type: types.POST, url, payload })
  return yield take(action => [types.POST_SUCCESS, types.POST_FAILURE].includes(action.type) && action.url === url)
}

// Загрузка данных
function* getRequestWatcher(action) {
  try {
    let result = yield call(api.GET, action.url)

    console.log('%c GET RESULT ', 'background:green;color:#fff', result)
    // yield delay(3000)

    // в ответе пустой массив
    if (Array.isArray(result) && result.length === 0) {
      yield put({ type: paginationTypes.RESET, entity: action.entity })
    }
    // ответ с данными + пагинация
    if (result && result.pagination && result.data) {
      const pagination = {
        ...result.pagination,
        pageIds: result.data.map(item => item.id)
      }
      result = result.data
      yield put({ type: paginationTypes.UPLOAD, payload: pagination, entity: action.entity })
    }

    yield put({ type: types.DATA_RECEIVED, payload: result, entity: action.entity, url: action.url })
    yield put({ type: types.GET_SUCCESS, url: action.url })
  } catch (error) {
    yield put({ type: types.GET_FAILURE, url: action.url, error })
  }
}

// Отправка данных
function* postRequestWatcher({ url, payload }) {
  try {
    const result = yield call(api.POST, url, payload)
    yield put({ type: types.POST_SUCCESS, url, payload: result })
  } catch (error) {
    yield put({ type: types.POST_FAILURE, url, error })
  }
}

// Удаление данных
function* deleteRequestWatcher({ url, id, entity }) {
  try {
    const result = yield call(api.DELETE, url, id)
    yield put({ type: types.DATA_REMOVE, id, entity })
    yield put({ type: types.DELETE_SUCCESS, url, payload: result })
  } catch (error) {
    yield put({ type: types.DELETE_FAILURE, url, error })
  }
}

const remote = [
  takeEvery(types.GET, getRequestWatcher),
  takeEvery(types.POST, postRequestWatcher),
  takeEvery(types.DELETE, deleteRequestWatcher),
]

export default remote