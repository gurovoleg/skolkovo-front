export const types = {
  STATISTICS_EVENT_CREATE: '@statistics/STATISTICS_EVENT_CREATE',
  STATISTICS_EVENTS_CREATE: '@statistics/STATISTICS_EVENTS_CREATE',
  STATISTICS_EVENT_PDF_LOAD: '@statistics/STATISTICS_EVENT_PDF_LOAD',
}

export const actions = {
  create: (workshopId, eventId) => ({ type: types.STATISTICS_EVENT_CREATE, workshopId, eventId }),
  createAll: (workshopId) => ({ type: types.STATISTICS_EVENTS_CREATE, workshopId }),
  loadPDF: (workshopId, eventId) => ({ type: types.STATISTICS_EVENT_PDF_LOAD, workshopId, eventId })
}