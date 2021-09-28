import { takeEvery, take, put, select, call, delay } from 'redux-saga/effects'
import { types } from 'Reducers/modal'

// function* modalConfirmWatcher (action) {
//   console.log('%c modalConfirmWatcher ', 'background:blue;color:#fff')
//   try {
//     const modalState = yield select(state => state.modal)
//     // Если задан callback на подтверждение
//     if (modalState.onConfirm) {
//       yield call(modalState.onConfirm)
//     }
//     yield take([types.MODAL_CLOSE])
//     // Если задан callback на закрытие
//     if (modalState.onClose) {
//       yield call(modalState.onClose)
//     }
//   } catch (error) {
//     yield put({ type: 'MODAL_CONFIRM_FAILURE', error })
//   }
// }

const modal = [
  // takeEvery(types.MODAL_CONFIRM, modalConfirmWatcher),
]

export default modal
