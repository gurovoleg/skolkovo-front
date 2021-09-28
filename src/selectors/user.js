import { createSelector } from 'reselect'
import { idSelector, remoteDataSelector, rolesSelector } from './index'
import { momentFromDate } from 'Utils/date'
import { paginationEntityIdsSelector } from './pagination'

export const usersSelector = createSelector(remoteDataSelector, data => {
  return data.user || []
})

export const userSelector = createSelector([usersSelector, idSelector('userId')], (users, id) => {
  return users.find(user => user.id === id) || {}
})
export const usersOnPageSelector = createSelector([usersSelector, paginationEntityIdsSelector], (users, ids) => {
  return ids.map(id => users.find(user => user.id === id)).filter(e => e) || []
})

export const authSelector = state => state.auth

export const profileSelector = createSelector([usersSelector, authSelector], (users, auth) => {
  return users.find(user => user.id === auth.id)
})

const userValues = (user) => ({
  id: user.id || '',
  status: user.status || 'inactive',
  name: user.name || '',
  surname: user.surname || '',
  patronymic: user.patronymic || '',
  email: user.email || '',
  password: user.password || '',
  changePassword: user.changePassword || false,
  gender: user.gender || 'male',
  age: user.age || null,
  roleId: user.roleId || null,
  rating: user.rating || '',
  workshopId: user.workshopId || null,
  streamId: user.streamId || null,
  unitId: user.unitId || null,
  headquarters: user.headquarters || '',
  created: momentFromDate(user.created || '').format('YYYY-MM-DD'),
  updated: momentFromDate(user.updated || '').format('YYYY-MM-DD')
})

export const userAddInitialStateSelector = createSelector(rolesSelector, roles => {
  const roleId = roles.find(role => role.name === 'user').id // участник
  return userValues({ changePassword: true, roleId })
})

export const userEditInitialStateSelector = createSelector(userSelector, user => {
  return userValues(user)
})

export const profileInitialStateSelector = createSelector(profileSelector, profile => {
  return userValues(profile)
})
