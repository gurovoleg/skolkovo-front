import React from 'react'
import { call, takeEvery, put } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { actions } from 'Reducers/auth'
import * as storage from 'Utils/storage'

function* errorWatcher({ type, error }) {
  let message = error.message || error.status
  if (!message) {
    console.error('Неопределенная ошибка от сервера!', type, error)
  }

  // создаем компонент для вывода ошибок, чтобы при большом количестве ошибок от сервера
  // их можно было вывести списком на отдельных строках
  message = message.split('<br>')
  const Message = () => message.filter(e => e).map((string, idx, arr) => {
    if (arr.length > 1) return <li key={idx}>{string}</li>
    return string
  })

  // Повторная авторизация (токен закончился)
  if (error.status === 401) {
    const token = yield call(storage.get, 'token')
    if (token) {
      yield put(actions.logout())
      yield call(toast.error, Message)
    }
  } else {
    yield call(toast.error, Message)
  }
}

const error = [takeEvery(action => action.error, errorWatcher)]

export default error