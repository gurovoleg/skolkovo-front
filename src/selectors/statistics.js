import { createSelector } from "reselect"
import { idSelector, remoteDataSelector } from "./index"
import { usersSelector } from "./user"

export const statisticsSelector = createSelector(remoteDataSelector, data => data.statistics || [])

export const statisticsWorkshopSelector = createSelector(statisticsSelector, idSelector('workshopId'), (statistics, id) => {
  return statistics.filter(e => e.workshopId === id)
})

// рейтинги пользователей по одному событию
export const ratingEventSelector = createSelector([statisticsWorkshopSelector, idSelector('eventId'), usersSelector], (workshop, id, users) => {
  let event = workshop.find(events => events.event == id)

  if (event) {
    const result = event.result.map(user => {
      const userData = users.find(item => item.id == user.userId)
      return { ...user, user: userData }
    })

    return { ...event, result }
  }

  return event
})

// общий рейтинг каждого пользователя за все события (сортировка по имени)
export const ratingTotalSelector = createSelector([statisticsWorkshopSelector, usersSelector], (events, users) => {
  let result = {}

  events.forEach(event => {
    event.result.forEach(user => {
      const userData = users.find(item => item.id == user.userId)

      if (result[user.userId]) {
        result[user.userId] = {
          rating: ((result[user.userId].rating) * 10 + user.rating * 10) / 10,
          count: result[user.userId].count + 1,
          user: userData
        }
      } else {
        result[user.userId] = {
          rating: user.rating,
          count: 1,
          user: userData
        }
      }

    })
  })

  result = Object.values(result).sort((a, b) => a.name > b.name).map((item, idx) => {
    const rating = (item) => (item.rating / item.count).toFixed(1)

    return {
      rating: rating(item),
      user: item.user,
      position: idx + 1
    }
  })

  return result
})

// данные позиции рейтингов пользователей по всем событиям (динамика/изменение позиции рейтинга в течении практикума)
export const ratingMovementSelector = createSelector([statisticsWorkshopSelector, usersSelector], (events, users) => {
  let result = {}

  events.forEach(eventData => {
    eventData.result.forEach(user => {
      const userData = users.find(item => item.id == user.userId)

      if (result[user.userId]) {
        result[user.userId].events[eventData.event] = user.ratingPosition
      } else {
        result[user.userId] = {
          events: {
            [eventData.event]: user.ratingPosition
          },
          user: userData
        }
      }

    })
  })

  return result
})
