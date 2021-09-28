import { takeEvery, call, put, take, delay } from 'redux-saga/effects'
import { types } from 'Reducers/statistics'
import { types as modalTypes } from 'Reducers/modal'
import { api, remoteGet, remoteDel, remotePost } from 'Components'
import { goBack, push } from 'connected-react-router'
import { toast } from "react-toastify"

// подсчет итогов по событию
function* statisticsCreateWatcher(action) {
  console.log('%c statisticsCreateWatcher ', 'background:blue;color:#fff', action)

  try {
    yield put({ type: modalTypes.MODAL_OPEN, header: `Событие ${action.eventId}. Итоги.`, content: `Подсчитать итоги по данному событию?` })
    const result = yield take([modalTypes.MODAL_CONFIRM, modalTypes.MODAL_CLOSE])

    if (result.type === modalTypes.MODAL_CONFIRM) {
      yield call(api.POST, `/statistics/${action.workshopId}/event/${action.eventId}`)
      yield call(remoteGet, `/statistics/${action.workshopId}`, 'statistics')
    }

  } catch (error) {
    yield put({ type: 'STATISTICS_EVENT_CREATE_ERROR', error })
  } finally {
    yield put({ type: modalTypes.MODAL_CLOSE })
  }
}

// подсчет итогов по всем событиям
function* statisticsCreateAllWatcher(action) {
  console.log('%c statisticsCreateAllWatcher ', 'background:blue;color:#fff', action)

  try {
    yield put({ type: modalTypes.MODAL_OPEN, header: `Итоги по всем событиям`, content: `Подсчитать итоги? Это займет какое-то время.` })
    const result = yield take([modalTypes.MODAL_CONFIRM, modalTypes.MODAL_CLOSE])

    if (result.type === modalTypes.MODAL_CONFIRM) {
      yield call(api.POST, `/statistics/${action.workshopId}/events`)
      yield call(remoteGet, `/statistics/${action.workshopId}`, 'statistics')
    }

  } catch (error) {
    yield put({ type: 'STATISTICS_EVENTS_CREATE_ERROR', error })
  } finally {
    yield put({ type: modalTypes.MODAL_CLOSE })
  }
}

// загрузка PDF файла с отчетом по событию
function* statisticsLoadPDFWatcher(action) {
  try {
    const filename = `workshop${action.workshopId}-event${action.eventId}_report.pdf`
    // yield call(api.GET, `/statistics/${action.workshopId}/eventPDF/${action.eventId}`)
    yield call(api.DOWNLOAD, `/statistics/${action.workshopId}/eventPDF/${action.eventId}`, filename)
  } catch(error) {
    yield put({ type: 'STATISTICS_EVENT_PDF_LOAD_ERROR', error })
  }
}

const statistics = [
  takeEvery(types.STATISTICS_EVENT_CREATE, statisticsCreateWatcher),
  takeEvery(types.STATISTICS_EVENTS_CREATE, statisticsCreateAllWatcher),
  takeEvery(types.STATISTICS_EVENT_PDF_LOAD, statisticsLoadPDFWatcher)
]

export default statistics