export const types = {
  APPRAISAL_CREATE: '@appraisal/APPRAISAL_CREATE',
  // APPRAISAL_UPDATE: '@appraisal/APPRAISAL_UPDATE',
  // APPRAISAL_DELETE: '@appraisal/APPRAISAL_DELETE',
}

export const actions = {
  appraisalCreate: payload => ({ type: types.APPRAISAL_CREATE, payload }),
  // appraisalUpdate: payload => ({ type: types.APPRAISAL_UPDATE, payload }),
  // appraisalDelete: id => ({ type: types.APPRAISAL_DELETE, id }),
}