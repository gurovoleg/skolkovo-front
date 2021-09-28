export const types = {
  QUIZ_CREATE: '@quiz/QUIZ_CREATE',
  QUIZ_UPDATE: '@quiz/QUIZ_UPDATE',
  QUIZ_DELETE: '@quiz/QUIZ_DELETE',
  QUIZ_BATCH_DELETE: '@quiz/QUIZ_BATCH_DELETE'
}

export const actions = {
  quizCreate: payload => ({ type: types.QUIZ_CREATE, payload }),
  quizUpdate: payload => ({ type: types.QUIZ_UPDATE, payload }),
  quizBatchDelete: (idList) => ({ type: types.QUIZ_BATCH_DELETE, idList }),
  quizDelete: id => ({ type: types.QUIZ_DELETE, id }),
}