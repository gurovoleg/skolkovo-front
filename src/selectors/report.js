import { createSelector } from "reselect"
import { idSelector, remoteDataSelector } from "./index"

export const reportSelector = createSelector(remoteDataSelector, data => data.report || [])

// export const statisticsWorkshopSelector = createSelector(statisticsSelector, idSelector('workshopId'), (statistics, id) => {
//   return statistics.filter(e => e.workshopId === id)
// })
