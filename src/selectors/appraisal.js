import { createSelector } from "reselect"
import { remoteDataSelector } from "./index"
import { authSelector } from "./user"

export const appraisalSelector = createSelector(remoteDataSelector, data => data.appraisal || {})

export const appraisalInitialStateSelector = createSelector([appraisalSelector, authSelector], ({ workshop, quiz }, auth) => {
  const questions = quiz.questions.map(e => {
    const result = { id: e.id, answer: '' }
    if (e.answers.rating) {
      result.ratingRange = e.answers.rating
    }
    return result
  })
  // const questions = quiz.questions.map(e => ({ id: e.id, answer: '', isRating: !!e.answers.rating }))

  return {
    certifier: auth.id || '',
    attested: '',
    workshopId: workshop.id || '',
    module: workshop.modulesCurrent || '',
    event: workshop.eventsCurrent || '',
    quizId: quiz.id,
    streamId: '',
    result: questions
  }

})