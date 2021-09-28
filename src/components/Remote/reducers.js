import { status } from './settings'
import { combineReducers } from 'redux'

export const types = {
  GET: 'REQUEST_GET',
  GET_SUCCESS: 'REQUEST_GET_SUCCESS',
  GET_FAILURE: 'REQUEST_GET_FAILURE',
  DELETE: 'REQUEST_DELETE',
  DELETE_SUCCESS: 'REQUEST_DELETE_SUCCESS',
  DELETE_FAILURE: 'REQUEST_DELETE_FAILURE',
  POST: 'REQUEST_POST',
  POST_SUCCESS: 'REQUEST_POST_SUCCESS',
  POST_FAILURE: 'REQUEST_POST_FAILURE',
  DATA_RECEIVED: 'DATA_RECEIVED', // добавление данных в store
  DATA_REMOVE: 'DATA_REMOVE', // удаление данных из store
  DOWNLOAD: 'REQUEST_DOWNLOAD',
  DOWNLOAD_FAILURE: 'REQUEST_DOWNLOAD_FAILURE',
  RESET: 'REQUEST_RESET', // очищаем remote reducer (logout)
  NEEDS_UPDATE: 'REQUEST_NEEDS_UPDATE'
}

const statusData = (state = {}, action) => {
  switch (action.type) {
    case types.GET:
      return { status: status.FETCHING, time: Date.now() }
    case types.GET_SUCCESS:
      return { status: status.LOADED, time: Date.now() }
    case types.GET_FAILURE:
      return { status: status.FAILURE, time: Date.now(), error: action.error }
    // case types.POST_SUCCESS:
    //   console.log('%c STATUS DATA ', 'background: orange', state)
    //   return { status: state.status === status.LOADED ? status.NEEDS_UPDATE : state.status }
    case types.NEEDS_UPDATE:
      // console.log('%c NEEDS_UPDATE ', 'background: orange', action.url, state)
      return { status: status.NEEDS_UPDATE, time: Date.now() }
    default:
      return state
  }
}

const statusReducer = (state = {}, action) => {
  if (action.type === types.RESET) {
    return {}
  }
  if (action.url && action.type.startsWith('REQUEST')) {
    return { ...state, [action.url]: statusData(state[action.url], action) }
  }
  return state
}

const dataInitialState = {
  user: [],
  workshop: [],
  stream: [],
  unit: [],
  role: [],
  question: [],
  quiz: [],
  appraisal: {},
  statistics: [],
  report: []
}

const dataReducer = (state = dataInitialState, action) => {
  switch (action.type) {
    case types.DATA_RECEIVED:
      return {
        ...state,
        [action.entity]: mergeData(state[action.entity], action.payload),
        // [action.entity]: Array.isArray(action.payload) ? action.payload : [action.payload],
      }
    case types.DATA_REMOVE:
      return {
        ...state,
        [action.entity]: removeData(state[action.entity], action.id),
        // [action.entity]: Array.isArray(action.payload) ? action.payload : [action.payload],
      }
    case types.RESET:
      return dataInitialState
    default:
      return state
  }
}

const removeData = (dest, id) => {
  if (Array.isArray(dest)) {
    return dest.filter(item => item.id !== id)
  } else {
    return {}
  }
}

const mergeData = (dest, source) => {
  // в хранилище данные в виде объекта
  if (!Array.isArray(dest)) {
    return source
  }
  // в хранилище данные в виде массив, приходит массив
  if (Array.isArray(source)) {
    return [...dest.filter(i => !source.find(j => j.id === i.id)), ...source]
  } else {
    const idx = dest.findIndex(i => i.id === source.id)
    if (idx !== -1) {
      return [...dest.slice(0, idx), source, ...dest.slice(idx + 1)]
    } else {
      return [...dest, source]
    }
  }
}

const remote = combineReducers({
  status: statusReducer,
  data: dataReducer
})

export default remote

export const actions = {
  get: (url, entity, headers) => ({ type: types.GET, url, entity, headers }),
  download: (url, filename, trackUrl, headers) => ({ type: types.DOWNLOAD, url, trackUrl, filename, headers }),
}