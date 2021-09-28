import { config } from 'Root/settings'
import * as storage from 'Utils/storage'
import FileSaver from 'file-saver'

export function GET(url) {
  return fetch(config.apiUrl + url, {
    headers: headers(),
    credentials: 'include'
  })
  // return fetch('https://jsonplaceholder.typicode.cm/todos', { headers: headers() })
    .then(processResponse, fetchFailed)
    .then(success)
    .catch(responseError)
}

export function POST(url, data) {
  return fetch(config.apiUrl + url, {
    headers: headers(),
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then(processResponse, fetchFailed)
    .then(success)
    .catch(responseError)
}

export function DELETE(url) {
  return fetch(config.apiUrl + url, {
    headers: headers(),
    credentials: 'include',
    method: 'DELETE'
  })
    .then(processResponse, fetchFailed)
    .then(success)
    .catch(responseError)
}

export function DOWNLOAD (url, title, save = true) {
  return fetch(config.apiUrl + url, {
    headers: headers(),
    credentials: 'include',
    method: 'get'
  }).then(response => !response.ok ? response.json() : response.blob())
    .then(result => {
      if (result.status >= 400) {
        throw {
          status: result.status,
          message: result.message,
        }
      }
      console.log('FILE -- ', result)
      return save ? FileSaver.saveAs(result, title) : result
    })
    .catch(responseError)
}

// Нет связи с сервером
const fetchFailed = error => {
  throw {
    status: error && error.status || error,
    message: 'Не удалось выполнить запрос. Проверьте соединение или повторите попытку позже.'
  }
}

const processResponse = (response) => {
  // console.log('%c processResponse ', 'background:blue;color:#fff', response)
  return response.text()
    .then(dataAsText => {
      try {
        const json = JSON.parse(dataAsText)
        return { status: response.status, data: json }
      } catch (error) {
        // проверка на ответ без контента
        if (response.status === 204) {
          return { status: response.status, data: {} }
        } else {
          throw {
            status: error.status,
            message: error.message,
          }
        }
      }
    })
}

const success = ({ status, data }) => {
  if (status >= 400) {
    throw {
      status: status,
      message: data && data.message || 'Неопределенная ошибка',
    }
  }
  return data
}

// Нет связи с сервером или пришла ошибка от сервера
const responseError = (response) => {
  console.log('%c Response error ', 'background:red;color:#fff', response)
  let message = response.message

  switch (response.status) {
    // case 400:
    //   message = 'Ошибка в запросе! Не удалось получить данные'
    //   break
    case 401:
      message = 'Время сессии истекло. Требуется повторная авторизация.'
      break
    case 404:
      message = 'Не найдена указанная страница!'
      break
    case 502:
      message = 'Нет ответа от сервера!'
      break
  }
  throw {
    status: response.status,
    message: message,
  }
}


function headers() {
  const token = storage.get('token')
  return {
    'Content-Type': 'application/json',
    authorization: token
  }
}