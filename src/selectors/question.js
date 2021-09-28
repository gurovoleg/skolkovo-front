import { createSelector } from 'reselect'
import { idSelector, remoteDataSelector } from './index'
import { paginationEntityIdsSelector } from './pagination'

export const questionsSelector = createSelector(remoteDataSelector, data => {
  return data.question || []
})

export const questionSelector = createSelector([questionsSelector, idSelector('questionId')], (questions, id) => {
  return questions.find(question => question.id === id) || {}
})

export const questionsOnPageSelector = createSelector([questionsSelector, paginationEntityIdsSelector], (questions, ids) => {
  return ids.map(id => questions.find(question => question.id === id)).filter(e => e) || []
})

const questionValues = (question = {}) => {
  const answers = question.answers || {}

  return {
    id: question.id || '',
    title: question.title || '',
    text: question.text || '',
    answers: {
      yes: answers.yes || false,
      no: answers.no || false,
      noIdea: answers.noIdea || false,
      personal: answers.personal || false,
      rating: answers.rating || '',
      custom: answers.custom || []
    }
  }
}

export const questionAddInitialStateSelector = () => questionValues()

export const questionEditInitialStateSelector = createSelector(questionSelector, question => {
  return questionValues(question)
})

