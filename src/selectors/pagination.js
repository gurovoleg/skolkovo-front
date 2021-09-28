import { createSelector } from 'reselect'
import { idSelector } from "./index"

export const paginationSelector = state => state.pagination || {}

export const paginationEntitySelector = createSelector([paginationSelector, idSelector('entity')], (pagination, entity) => {
  return pagination[entity] || {}
})

// ids пользователей на текущей странице
export const paginationEntityIdsSelector = createSelector(paginationEntitySelector, pagination => {
  return pagination.pageIds || []
})