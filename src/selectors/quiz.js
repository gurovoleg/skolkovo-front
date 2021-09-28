import { createSelector } from 'reselect'
import { idSelector, remoteDataSelector } from './index'
import { paginationEntityIdsSelector } from './pagination'
import { questionsSelector } from './question'

export const quizzesSelector = createSelector(remoteDataSelector, data => {
  return data.quiz || []
})

export const quizSelector = createSelector([quizzesSelector, idSelector('quizId')], (quizzes, id) => {
  return quizzes.find(quiz => quiz.id === id) || {}
})
export const quizzesOnPageSelector = createSelector([quizzesSelector, paginationEntityIdsSelector], (quizzes, ids) => {
  return ids.map(id => quizzes.find(quiz => quiz.id === id)).filter(e => e) || []
})

export const quizEditInitialStateSelector = createSelector([quizSelector, questionsSelector], (quiz, questions) => {
  // ищем вопросы по id
  const result = quiz.questionIds && quiz.questionIds.map(id => questions.find(e => e.id == id)).filter(e => e)

  return {
    id: quiz.id || '',
    title: quiz.title || '',
    comment: quiz.comment || '',
    questions: result || []
  }
})

