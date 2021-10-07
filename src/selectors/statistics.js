import { createSelector } from "reselect"
import { idSelector, remoteDataSelector } from "./index"
import { usersSelector } from "./user"

export const statisticsSelector = createSelector(remoteDataSelector, data => data.statistics || [])

export const statisticsWorkshopSelector = createSelector(statisticsSelector, idSelector('workshopId'), (statistics, id) => {
  return statistics.filter(e => e.workshopId === id)
})

// рейтинги пользователей по одному событию
export const eventSelector = createSelector([statisticsWorkshopSelector, idSelector('eventId'), usersSelector], (workshop, id, users) => {
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

      if (result[user.userId]) {
        const value = ((result[user.userId].rating) * 100 + user.rating.value * 100) / 100
        result[user.userId] = {
          rating: value,
          count: result[user.userId].count + 1,
        }
      } else {
        result[user.userId] = {
          rating: user.rating.value,
          count: 1,
        }
      }

      const userData = users.find(item => item.id == user.userId)
      result[user.userId]['user'] = userData

    })
  })

  result = Object.values(result).sort((a, b) => a.name > b.name).map((item, idx) => {
    const rating = (item) => (item.rating / item.count).toFixed(1)

    return {
      rating: rating(item),
      // rating: { value: rating(item) },
      user: item.user,
      position: idx + 1
    }
  })

  return result
})

// данные позиции рейтингов пользователей по всем событиям (динамика/изменение позиции рейтинга в течении практикума)
export const positionMovementSelector = createSelector([statisticsWorkshopSelector, usersSelector], (events, users) => {
  let result = {}

  events.forEach(eventData => {
    eventData.result.forEach(user => {
      const userData = users.find(item => item.id == user.userId)

      if (result[user.userId]) {
        result[user.userId].events[eventData.event] = user.rating.position
      } else {
        result[user.userId] = {
          events: {
            [eventData.event]: user.rating.position
          },
          user: userData
        }
      }

    })
  })

  return result
})

// данные по рейтингу группы для графиков (данные + ключи)
export const groupRatingMovementSelector = createSelector([statisticsWorkshopSelector], (events) => {
  const areas = [[1, 1], [1.1, 1.5], [1.6, 1.9], [2, 2], [2.1, 2.5], [2.6, 2.9], [3, 3]]
  const labels = areas.map(area => area[0] === area[1] ? area[0].toString() : `${area[0]}-${area[1]}`)
  const result = [labels.reduce((acc, e) => ({ ...acc, [e]: 0 }), {})]

  console.log(result)

  // обходим все события
  events.forEach(event => {
    // объект с рейтингами пользователей, разбитыми по зонам
    const summary = labels.reduce((acc, e) => ({ ...acc, [e]: 0 }), {})

    // Считаем процент (до 3-х знаков)
    const getPercentage = (value) => {
      return value * 100 / event.attestedUsers
    }

    // перебираем всех пользователей внутри события, проверям в какую зону попадает их рейтинг
    event.result.forEach(user => {
      const area = areas.find(area => parseFloat(user.rating.value) <= area[1] && parseFloat(user.rating.value) >= area[0])

      if (area) {
        const areaName = area[0] === area[1] ? area[0].toString() : `${area[0]}-${area[1]}`
        summary[areaName] = Number((summary[areaName] + getPercentage(1)).toFixed(3))
        // summary[areaName] = summary[areaName] + getPercentage(1)
      }
    })

    // сохраняем результат события в общий массив
    if (Object.keys(summary).length > 0) {
      result.push(summary)
    }
  })

  return {
    data: result,
    keys: labels
  }
})