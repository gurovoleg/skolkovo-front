/*
*  Для workshops/units/streams/roles
*/
export const types = {
  CREATE: '@settings/CREATE',
  UPDATE: '@settings/UPDATE',
  REMOVE: '@settings/REMOVE',
  WORKSHOP_UPDATE: '@settings/WORKSHOP_UPDATE',
  WORKSHOP_CHANGE_STATUS: '@settings/WORKSHOP_CHANGE_STATUS',
}

export const actions = {
  create: (entity, data) => ({ type: types.CREATE, entity, data }),
  update: (entity, data) => ({ type: types.UPDATE, entity, data }),
  remove: (entity, id) => ({ type: types.REMOVE, entity, id }),
  updateWorkshop: (data) => ({ type: types.WORKSHOP_UPDATE, data }),
  changeStatus: (data) => ({ type: types.WORKSHOP_CHANGE_STATUS, data }),
}