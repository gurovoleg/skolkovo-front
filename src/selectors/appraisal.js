import { createSelector } from "reselect"
import { remoteDataSelector } from "./index"
import { authSelector } from "./user"

export const appraisalSelector = createSelector(remoteDataSelector, data => data.appraisal || {})

export const appraisalInitialStateSelector = createSelector([appraisalSelector, authSelector], ({ workshop, quiz }, auth) => {
  const questions = quiz.questions.map(e => ({ id: e.id, answer: '', isRating: !!e.answers.rating }))
  // const questions = quiz.questions.map(e => ({ id: e.id, text: e.text, answer: '' }))

  return {
    certifier: auth.id || '',
    attested: '',
    workshopId: workshop.id || '',
    module: workshop.modulesCurrent || '',
    event: workshop.eventsCurrent || '',
    quizId: quiz.id,
    result: questions
  }

})