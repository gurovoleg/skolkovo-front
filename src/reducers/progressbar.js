export const types = {
  UPDATE: '@progressbar/UPDATE',
  RESET: '@progressbar/RESET',
  ERROR: '@progressbar/ERROR'
}

const initialState = {
  stages: 1,
  current: 0,
  error: false
}

const progressReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE:
      return action.payload
    case types.ERROR:
      return { ...state, error: true }
    case types.RESET:
      return initialState
    default:
      return state
  }
}

const progressbar = (state = {}, action) => {
  if (action.id) {
    return {
      ...state,
      [action.id]: progressReducer(state[action.id], action)
    }
  }
  return state
}

export const actions = {
  update: (id, value) => ({ type: types.UPDATE, id, payload: value }),
  error: (id) => ({ type: types.ERROR, id }),
  reset: (id) => ({ type: types.RESET, id })
}

export default progressbar
