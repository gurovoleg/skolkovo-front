import * as storage from 'Utils/storage'

export const types = {
  LOGIN_REQUEST: 'auth/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'auth/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'auth/LOGIN_FAILURE',
  LOGOUT: 'auth/LOGOUT',
  PROFILE_LOAD: 'auth/PROFILE_LOAD',
  PROFILE_LOAD_SUCCESS: 'auth/PROFILE_LOAD_SUCCESS',
  PROFILE_LOAD_FAILURE: 'auth/PROFILE_LOAD_FAILURE',
  PROFILE_UPDATE: 'auth/PROFILE_UPDATE',
}

const initialState = (reset = false) => {
  const roleId = storage.get('roleId')
  const token = storage.get('token')
  return {
    token: !reset && token,
    roleId: !reset && roleId,
    id: null
  }
}

const auth = (state = initialState(), action) => {
  switch (action.type) {
    case types.PROFILE_LOAD_SUCCESS:
      return {
        ...state,
        id: action.profile.id,
        roleId: action.profile.roleId,
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        roleId: action.payload.roleId,
      }
    case types.LOGIN_FAILURE:
    case types.LOGIN_REQUEST:
    case types.LOGOUT:
      return initialState(true)
    default:
      return state
  }
}

export const actions = {
  login: (data) => ({ type: types.LOGIN_REQUEST, data }),
  logout: () => ({ type: types.LOGOUT }),
  loadProfile: (token) => ({ type: types.PROFILE_LOAD, token }),
  updateProfile: (payload) => ({ type: types.PROFILE_UPDATE, payload })
}

export default auth