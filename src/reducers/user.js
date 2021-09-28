export const types = {
  USER_CREATE: 'user/USER_CREATE', // создание пользователя другим пользователем
  USER_REGISTER: 'user/USER_REGISTER', // регистрация самого пользователя
  USER_UPDATE: 'user/USER_UPDATE',
  USER_BATCH_UPDATE: 'user/USER_BATCH_UPDATE',
  USER_DELETE: 'user/USER_DELETE',
  LOAD_USERS_EXCEL: 'user/LOAD_USERS_EXCEL',
}

export const actions = {
  userCreate: payload => ({ type: types.USER_CREATE, payload }),
  userRegister: payload => ({ type: types.USER_REGISTER, payload }),
  userUpdate: payload => ({ type: types.USER_UPDATE, payload }),
  userBatchUpdate: (values, idList) => ({ type: types.USER_BATCH_UPDATE, values, idList }),
  userDelete: userId => ({ type: types.USER_DELETE, userId }),
  loadExcel: workshopId => ({ type: types.LOAD_USERS_EXCEL, workshopId }),
}