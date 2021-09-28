import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRemoteData, withSearchString, ListLayout, GroupDeleteMenu } from 'Components'
import { questionsOnPageSelector } from 'Selectors/question'
import { QuestionList } from "./List/index"
import { actions } from 'Reducers/question'

const List = ({ questions, urlBag, batchDelete }) => {
  return (
    <ListLayout
      entity="question"
      data={questions}
      menu={(props) => <GroupDeleteMenu confirm={batchDelete} {...props} />}>

      {({ isOpened, idList, selectItem }) =>
        <QuestionList
          data={questions}
          urlBag={urlBag}
          isOpened={isOpened}
          idList={idList}
          selectItem={selectItem}/>
      }

    </ListLayout>
  )
}

const mapStateToProps = (state) => ({
  questions: questionsOnPageSelector(state, { entity: 'question' }),
})

const mapDispatchToProps = dispatch => ({
  batchDelete: (idList) => dispatch(actions.questionBatchDelete(idList))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withRemoteData({
  url: ({ history }) => `/question/list${history.location.search}`, entity: 'question', reloadEnabled: true
})(withSearchString(List))))
