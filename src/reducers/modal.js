export const types = {
  MODAL_OPEN: '@modal/MODAL_OPEN',
  MODAL_CLOSE: '@modal/MODAL_CLOSE',
  MODAL_CONFIRM: '@modal/MODAL_CONFIRM',
  MODAL_CONFIRM_COMPLETED: '@modal/MODAL_CONFIRM_COMPLETED',
}

const initialState = {
  header: 'Обработка запроса',
  content: 'Выполнить действие?',
  size: 'mini',
  isOpen: false,
  isBusy: false,
  onConfirm: null,
  onClose: null,
}

const modalReducer = (state = initialState, action) => {
  if (action.type.startsWith('@modal')) {
    switch (action.type) {
      case types.MODAL_OPEN:
        return {
          header: action.header || state.header,
          content: action.content || state.content,
          size: action.size || state.size,
          isOpen: true,
          isBusy: false,
          onConfirm: action.onConfirm || state.onConfirm,
          onClose: action.onClose || state.onClose,
        }
      case types.MODAL_CONFIRM:
        return { ...state, isBusy: true }
      case types.MODAL_CLOSE:
        return initialState
      default:
        return state
    }
  }
  return state
}

export const actions = {
  openModal: (payload) => ({ type: types.MODAL_OPEN, ...payload }),
  closeModal: () => ({ type: types.MODAL_CLOSE }),
  confirmModal: () => ({ type: types.MODAL_CONFIRM })
}

export default modalReducer