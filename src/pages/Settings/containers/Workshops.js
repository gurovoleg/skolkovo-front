import React from 'react'
import { connect } from 'react-redux'
import { workshopsSelector } from 'Selectors/workshop'
import { actions } from 'Reducers/settings'
import { Table, ActionsGroup, ActiveCheckBox } from './components'
import { DateValue } from 'Components/ui'
import { workshopStatuses as statuses } from "Root/settings"
import { Icon } from "semantic-ui-react"
import { Link, Switch, Route } from 'react-router-dom'
import { WorkshopEdit } from "./Workshops/index"
import { actions as userActions } from 'Reducers/user'

const columns = (props) => [
  {
    name: 'id',
    title: <Icon name="rocket" />,
    size: 'col-md-1',
    render: (item) => <ActiveCheckBox item={item} setActive={props.setActive} />
  },
  {
    name: 'title',
    title: 'Название',
    size: 'col-md-3',
    render: (item) => <Link to={`/settings/workshop/${item.id}/edit`}>{item.title}</Link>
  },
  {
    name: 'status',
    title: 'Статус',
    size: 'col-md-2',
    render: item => item.status ? statuses[item.status].label : statuses.inactive.label
  },
  {
    name: 'usersTotal',
    title: 'Участники',
    size: 'col-md-2',
  },
  {
    name: 'updated',
    title: 'Обновлен',
    size: 'col-md-2',
    render: item => <DateValue value={item.updated}/> // вывод даты в привиденном формате
  },
  {
    size: 'col-md-2',
    title: 'Действия',
    render: (item) => <ActionsGroup item={item} {...props} />
  }
]

const Workshops = ({ remove, complete, setActive, loadExcel, ...rest }) => {
  return (
    <Switch>
      <Route path="/settings/workshop/:workshopId([0-9]+)/edit" render={() => <WorkshopEdit remove={remove} />} />
      <Route path="/settings/workshop" render={() => {
        return <Table columns={columns({ remove, complete, setActive, loadExcel }) } {...rest} />
      }} />
    </Switch>)
}

const mapStateToProps = state => ({
  items: workshopsSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  create: (data, formBag) => dispatch({ ...actions.create('workshop', data), formBag }),
  // используем глобальную модалку для удаления/завершения/активации
  remove: (id, redirectBack) => dispatch({ ...actions.remove('workshop', id), redirectBack }),
  complete: (item) => dispatch(actions.changeStatus({ ...item, status: statuses.completed.value })),
  setActive: (item) => dispatch(actions.changeStatus({ ...item, status: statuses.active.value })),
  loadExcel: (id) => dispatch(userActions.loadExcel(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Workshops)
