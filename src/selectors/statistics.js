import { createSelector } from "reselect"
import { idSelector, remoteDataSelector } from "./index"
import { usersSelector } from "./user"
import { formatToPercentage, sortObjectByKey } from 'Utils'

export const statisticsSelector = createSelector(remoteDataSelector, data => data.statistics || [])

export const statisticsWorkshopSelector = createSelector(statisticsSelector, idSelector('workshopId'), (statistics, id) => {
  return statistics.filter(e => e.workshopId === id)
})

// данные пользователей по одному событию (+ подсчет ответов в процентном соотношение)
export const eventSelector = createSelector([statisticsWorkshopSelector, idSelector('eventId'), usersSelector], (workshop, id, users) => {
  let event = workshop.find(events => events.event == id)

  if (event) {
    const result = event.result.map(user => {
      const userData = users.find(item => item.id == user.userId)

      // обработка вопросов - пересчитываем значения в процентном соотношение
      Object.entries(user.questions).forEach(([key, value]) => {
        if (!value.rating) {
          user.questions[key] = sortObjectByKey(formatToPercentage(value))
        }
      })

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
  // TODO Задавать набор зон согласно шкале рейтинга
  const areas = [[1, 1], [1.1, 1.5], [1.6, 1.9], [2, 2], [2.1, 2.5], [2.6, 2.9], [3, 3]]
  const labels = areas.map(area => area[0] === area[1] ? area[0].toString() : `${area[0]}-${area[1]}`)
  // объект с данными по каждому событию с начальным нудевым событием (точка (0,0) на графике)
  const result = [labels.reduce((acc, e) => ({ ...acc, [e]: 0 }), {})]

  // обходим все события
  events.forEach(event => {
    // объект с рейтингами пользователей, разбитыми по зонам
    let summary = labels.reduce((acc, e) => ({ ...acc, [e]: 0 }), {})

    // перебираем всех пользователей внутри события, проверям в какую зону попадает их рейтинг
    event.result.forEach(user => {
      const area = areas.find(area => parseFloat(user.rating.value) <= area[1] && parseFloat(user.rating.value) >= area[0])

      if (area) {
        const areaName = area[0] === area[1] ? area[0].toString() : `${area[0]}-${area[1]}`
        summary[areaName] += 1
      }
    })

    // сохраняем результат события в общий массив
    if (Object.keys(summary).length > 0) {
      // получаем эквивалентные процентные величины (округление до целого числа)
      summary = formatToPercentage(summary)
      result.push(summary)
    }
  })

  return {
    data: result,
    keys: labels
  }
})

// анализ всех вопросов по одному событиям
export const eventQuestionSelector = createSelector([eventSelector, idSelector('questionId')], (event, questionId) => {
  return calculateQuestionInEvent(event, questionId)
})

// анализ ответов одного вопроса всех пользователей за событие
// подсчитываем количество вхождений того или иного ответа согласно критерию (по умолчанию должно быть более 50% ответов)
function calculateQuestionInEvent(event, questionId, threshold = 0.5, notDefinedLabel = 'Не определено') {
  let result = {}

  // обходим всех пользователей и ищем ответы более заданного критерия
  event.result.forEach(user => {
    const answers = user.questions[questionId]
    // определяем пороговое значение как сумму всех значений умноженное на критерий
    const limit = Object.values(answers).reduce((acc, value) => acc + value, 0) * threshold
    let notDefined = true // индикатор для ответа "не удалось определить"
    Object.keys(answers).forEach(key => {
      if (answers[key] > limit) {
        result[key] = result[key] ? result[key] + 1 : 1
        notDefined = false
      }
    })
    // Если ни один из ответов не перешел порогового значения (критерия), то считаем, что в этом случае не удалось определить
    if (notDefined) result[notDefinedLabel] = result[notDefinedLabel] ? result[notDefinedLabel] + 1 : 1
    notDefined = true
  })

  return sortObjectByKey(formatToPercentage(result))
}

// анализ всех вопросов по всем событиям
export const workshopQuestionsSelector = createSelector(statisticsWorkshopSelector, (events) => {
  // получаем список всех вопросов за все события
  const questions = {}
  events.forEach(event => event.questions.forEach(q => questions[q.id] = q))

  // обходим все события и для каждого события делаем анализ ответов по всем вопросам
  events.forEach(event => {
    Object.values(questions).forEach(question => {
      const result = calculateQuestionInEvent(event, question.id)
      if (!question.events) question.events = {}
      question.events[event.id] = result
    })
  })

  return questions
})
