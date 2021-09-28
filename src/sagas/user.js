import { takeEvery, call, take, put, delay } from 'redux-saga/effects'
import { types } from 'Reducers/user'
import { types as modalTypes } from 'Reducers/modal'
import { api, remoteGet, remoteDel, remotePost } from 'Components'
import { goBack, push } from 'connected-react-router'
import { toast } from 'react-toastify'
import * as storage from 'Utils/storage'
import { types as progressbarTypes } from 'Reducers/progressbar'

// регистрация нового пользователя
function* userRegisterWatcher(action) {
  try {
    console.log('%c userRegisterWatcher ', 'background:blue;color:#fff', action)
    yield call(addUser, action, '/user/register', '/login')
  } catch (error) {
    yield put({ type: 'USER_REGISTER_ERROR', error })
    action.formBag.setSubmitting(false)
  }
}

// добавление нового пользователя другим пользователем
function* userCreateWatcher(action) {
  try {
    console.log('%c userCreateWatcher ', 'background:blue;color:#fff', action)
    const searchString = storage.get('user')
    yield call(addUser, action, '/user/create', `/users${searchString}`)
    yield call(remoteGet, `/user/list${searchString}`, 'user')
    yield call(remoteGet, `/workshop/list`, 'workshop')
  } catch (error) {
    yield put({ type: 'USER_CREATE_ERROR', error })
  }
}

function* addUser(action, url, redirectUrl) {
  yield call(api.POST, url, action.payload)
  yield put(push(redirectUrl))
  yield call(toast.success, 'Пользователь успешно зарегистрирован')
}

// изменение данных пользователя
function* userUpdateWatcher(action) {
  try {
    console.log('%c userUpdateWatcher ', 'background:blue;color:#fff', action)
    const result = yield call(api.POST, '/user/update', action.payload)
    yield put(goBack())
    yield call(remoteGet, `/workshop/list`, 'workshop')
  } catch (error) {
    yield put({ type: 'USER_UPDATE_ERROR', error })
    action.formBag.setSubmitting(false)
  }
}

// изменение данных списка пользователей
function* userBatchUpdateWatcher({ values, idList, formBag }) {
  console.log('%c batchUpdateWatcher ', 'background:blue;color:#fff', values, idList, formBag)

  yield put({ type: modalTypes.MODAL_OPEN })
  yield call(formBag.setSubmitting, false)
  // Ждем действие со стороны пользователя (запуск или отмена)
  const result = yield take([modalTypes.MODAL_CONFIRM, modalTypes.MODAL_CLOSE])

  // Если пользователь выбрал запуск
  if (result.type === modalTypes.MODAL_CONFIRM) {
    try {
      for (let i = 0; i < idList.length; i++) {
        const user = { id: idList[i], ...values }
        yield call(remotePost, '/user/update', user)
        // ProgressBar indicator update
        yield put({ type: progressbarTypes.UPDATE, id: 'modal', payload: { stages: idList.length, current: i + 1 } })
      }
      yield call(formBag.resetForm)
      yield put({ type: modalTypes.MODAL_CLOSE })
    } catch (error) {
      yield put({ type: 'BATCH_UPDATE_ERROR', error })
    }
    // сброс прогресс индикатора
    yield put({ type: progressbarTypes.RESET, id: 'modal' })
    // обновить список пользователей согласно параметрам адресной строки
    const searchString = storage.get('user')
    yield call(remoteGet, `/user/list${searchString}`, 'user')
    yield call(remoteGet, `/workshop/list`, 'workshop')
  }
}

// удаление пользователя
function* userDeleteWatcher(action) {
  try {
    console.log('%c userDeleteWatcher ', 'background:blue;color:#fff', action)
    const searchString = storage.get('user')
    yield call(remoteDel, `/user/${action.userId}/delete`, action.userId, 'user')
    yield call(remoteGet, `/user/list${searchString}`, 'user')
    yield put(goBack())
    yield call(remoteGet, `/workshop/list`, 'workshop')
  } catch (error) {
    yield put({ type: 'USER_DELETE_ERROR', error })
  }
}

// загрузка пользователей в Excel формате
function* usersLoadExcelWatcher(action) {
  try {
    console.log('%c userDeleteWatcher ', 'background:blue;color:#fff', action)
    yield call(api.DOWNLOAD, `/user/excel/${action.workshopId}`, 'users.xlsx')
  } catch (error) {
    console.log('%c ERROR ', 'background:blue;color:#fff', action)
    yield put({ type: 'LOAD_USERS_EXCEL', error })
  }
}

const user = [
  takeEvery(types.USER_REGISTER, userRegisterWatcher),
  takeEvery(types.USER_CREATE, userCreateWatcher),
  takeEvery(types.USER_UPDATE, userUpdateWatcher),
  takeEvery(types.USER_DELETE, userDeleteWatcher),
  takeEvery(types.USER_BATCH_UPDATE, userBatchUpdateWatcher),
  takeEvery(types.LOAD_USERS_EXCEL, usersLoadExcelWatcher)
]

export default user