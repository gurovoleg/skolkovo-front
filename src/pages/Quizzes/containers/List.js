import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRemoteData, withSearchString, ListLayout, GroupDeleteMenu } from 'Components'
import { quizzesOnPageSelector } from 'Selectors/quiz'
import { QuizList } from "./List/index"
import { actions } from 'Reducers/quiz'

const List = ({ quizzes, urlBag, createQuiz, batchDelete }) => {
  return (
    <ListLayout
      entity="quiz"
      data={quizzes}
      menu={(props) => <GroupDeleteMenu confirm={batchDelete} { ...props } />}>

      {({ isOpened, idList, selectItem }) =>
        <QuizList
          data={quizzes}
          urlBag={urlBag}
          createQuiz={createQuiz}
          isOpened={isOpened}
          idList={idList}
          selectItem={selectItem} />
      }

    </ListLayout>
  )
}

const mapStateToProps = (state) => ({
  quizzes: quizzesOnPageSelector(state, { entity: 'quiz' }),
})

const mapDispatchToProps = dispatch => ({
  createQuiz: (payload, formBag) => dispatch({ ...actions.quizCreate(payload), formBag }),
  batchDelete: (idList) => dispatch(actions.quizBatchDelete(idList))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withRemoteData({
  url: ({ history }) => `/quiz/list${history.location.search}`, entity: 'quiz', reloadEnabled: true
})(withSearchString(List))))
