import { createSelector } from "reselect"
import { idSelector, remoteDataSelector } from "./index"
import { momentFromDate } from 'Utils/date'

export const workshopsSelector = createSelector(remoteDataSelector, data => data.workshop || [])

export const workshopSelector = createSelector([workshopsSelector, idSelector('workshopId')], (items, id) => {
  return items.find(item => item.id === id) || {}
})

export const workshopEditInitialStateSelector = createSelector(workshopSelector, (workshop) => {
  return {
    id: workshop.id || '',
    title: workshop.title || '',
    status: workshop.status || 'inactive',
    modulesTotal: workshop.modulesTotal || null,
    modulesCurrent: workshop.modulesCurrent || null,
    eventsTotal: workshop.eventsTotal || null,
    eventsCurrent: workshop.eventsCurrent || null,
    usersTotal: workshop.usersTotal || 0,
    quizId: workshop.quizId || null,
    created: workshop.created ? momentFromDate(workshop.created).format('YYYY-MM-DD') : '',
    updated: workshop.updated ? momentFromDate(workshop.updated).format('YYYY-MM-DD') : ''
  }
})

export const activeWorkshopSelector = createSelector(workshopsSelector, data => {
  return data.find(e => e.status === 'active')
})