import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRemoteData, withSearchString, ListLayout } from 'Components'
import { usersOnPageSelector } from 'Selectors/user'
import { UserList, GroupMenu } from "./List/index"

const List = ({ users, urlBag }) => {
  return (
    <ListLayout entity="user" groupEnabled={true} data={users} menu={(props) => <GroupMenu {...props} />}>
      {({ isOpened, idList, selectItem }) => (
        <UserList
          users={users}
          idList={idList}
          isOpened={isOpened}
          urlBag={urlBag}
          onItemChange={selectItem}
        />
      )}
    </ListLayout>
  )
}

const mapStateToProps = (state) => ({
  users: usersOnPageSelector(state, { entity: 'user' }),
})

// Для получения данных по url используем именно history, так как в Location для этой страницы лежат еще старые данные
export default withRouter(connect(mapStateToProps)(withRemoteData({
  url: ({ history }) => `/user/list${history.location.search}`, entity: 'user', reloadEnabled: true
})(withSearchString(List))))
