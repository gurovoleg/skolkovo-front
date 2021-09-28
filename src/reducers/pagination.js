export const types = {
  UPLOAD: '@pagination/UPLOAD_PAGE',
  UPLOAD_SUCCESS: '@pagination/UPLOAD_PAGE_SUCCESS',
  UPLOAD_FAILURE: '@pagination/UPLOAD_PAGE_FAILURE',
  SET_PAGE: '@pagination/SET_ACTIVE_PAGE',
  RESET: '@pagination/RESET'
}

const initialState = {
  user: {}
}

const paginationReducer = (state = initialState, action) => {
  if (action.type.startsWith('@pagination')) {
    switch (action.type) {
      case types.UPLOAD:
        return {
          ...state,
          [action.entity]: action.payload
        }
      case types.SET_PAGE:
        return {
          ...state,
          [action.entity]: {
            ...state[action.entity],
            currentPage: action.page
          }
        }
      case types.RESET:
        return {
          ...state,
          [action.entity]: {}
        }
      default:
        return state
    }
  }
  return state
}
// const paginationReducer = (state = initialState, action) => {
//   if (action.type.startsWith('@pagination')) {
//     switch (action.type) {
//       case types.UPLOAD:
//         return {
//           ...state,
//           [action.entity]: {
//             info: action.payload.info,
//             pages: {
//               ...state[action.entity].pages,
//               ...action.payload.page
//             }
//           }
//         }
//       case types.SET_PAGE:
//         return {
//           ...state,
//           [action.entity]: {
//             ...state[action.entity],
//             info: {
//               ...state[action.entity].info,
//               currentPage: action.page
//             }
//           }
//         }
//       case types.RESET:
//         return {
//           ...state,
//           [action.entity]: {
//             info: {},
//             pages: {}
//           }
//         }
//       default:
//         return state
//     }
//   }
//   return state
// }

export const actions = {
  uploadPage: (entity, payload) => ({ type: types.UPLOAD, entity, payload }),
  setPage: (entity, page) => ({ type: types.SET_PAGE, entity, page }),
  reset: (entity) => ({ type: types.RESET, entity })
}

export default paginationReducer