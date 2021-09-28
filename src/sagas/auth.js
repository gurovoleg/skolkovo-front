import { types } from 'Reducers/auth'
import { takeEvery, put, call, delay } from 'redux-saga/effects'
import * as storage from 'Utils/storage'
import { goBack, push } from 'connected-react-router'
import { api } from 'Components'
import { toast } from 'react-toastify'
import { types as remoteTypes } from 'Components/Remote/reducers'
import { remoteGet } from 'Components'
import { hideLoading, resetLoading } from 'react-redux-loading-bar'

function* loginWatcher (action) {
  console.log('%c loginWatcher ', 'background:blue;color:#fff', action)
  try {
    // сбрасываем status reducer с предыдущими загрузками (необходимо при повторной авторизации, иначе могут висеть старые подгрузки с ошибками)
    yield put({ type: remoteTypes.RESET })
    // отправляем запрос на авторизацию
    const result = yield call(api.POST, '/user/login', action.data)
    if (result && result.token) {
      if (result.role) {
        yield call(storage.set, 'token', result.token)
        yield call(storage.set, 'role', result.role)
        yield put({ type: types.LOGIN_SUCCESS, payload: result })
        yield put(push('/'))
        yield toast.success(`Добро пожаловать!`)
      } else {
        yield toast.error(`Нет назначенной роли. Обратитесь к администратору.`)
      }
    } else {
      yield toast.error(`Неавторизованный пользователь.`)
    }
  } catch (error) {
    yield put({ type: types.LOGIN_FAILURE, error })
    yield call(action.formikBag.setSubmitting,false)
  }
}

function* loadProfileWatcher (action) {
  try {
    const profile = action.payload
    yield put({ type: types.PROFILE_LOAD_SUCCESS, profile })
    yield call(storage.set, 'role', profile.role)
  } catch (error) {
    yield put({ type: types.PROFILE_LOAD_FAILURE, error })
  }
}

function* updateProfileWatcher (action) {
  console.log('%c updateProfileWatcher ', 'background:blue;color:#fff', action)
  try {
    yield call(api.POST, '/user/update', action.payload)
    yield put(goBack())
    yield call(remoteGet, `/workshop/list`, 'workshop')
  } catch (error) {
    yield put({ type: 'PROFILE_UPDATE_ERROR', error })
  }
}

function* logoutWatcher () {
  yield call(storage.remove, 'token')
  yield call(storage.remove, 'role')
  yield put({ type: remoteTypes.RESET })
  yield put(push('/'))
  yield put(hideLoading())
}

const auth = [
  takeEvery(types.LOGIN_REQUEST, loginWatcher),
  takeEvery(types.LOGOUT, logoutWatcher),
  takeEvery(types.PROFILE_LOAD, loadProfileWatcher),
  takeEvery(types.PROFILE_UPDATE, updateProfileWatcher),
  // отслеживаем загрузку профайла через remote
  takeEvery(action => action.type === remoteTypes.DATA_RECEIVED && action.url === '/user/profile', loadProfileWatcher)
]

export default auth
