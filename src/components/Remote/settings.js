export const entities = {
  users: 'users'
}

export const status = {
  NOT_ASKED: 'not_asked',
  FETCHING: 'fetching', // Данные загружаются в первый раз
  LOADED: 'loaded', // Данные загружены
  FAILURE: 'failure',
  NEEDS_UPDATE: 'needs_update', // Данные уже были загружены но нуждаются в обновлении
}