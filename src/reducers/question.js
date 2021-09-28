export const types = {
  QUESTION_CREATE: '@question/QUESTION_CREATE',
  QUESTION_UPDATE: '@question/QUESTION_UPDATE',
  QUESTION_DELETE: '@question/QUESTION_DELETE',
  QUESTION_BATCH_DELETE: '@question/QUESTION_BATCH_DELETE'
}

export const actions = {
  questionCreate: payload => ({ type: types.QUESTION_CREATE, payload }),
  questionUpdate: payload => ({ type: types.QUESTION_UPDATE, payload }),
  questionBatchDelete: (idList) => ({ type: types.QUESTION_BATCH_DELETE, idList }),
  questionDelete: id => ({ type: types.QUESTION_DELETE, id }),
}