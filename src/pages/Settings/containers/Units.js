import React from 'react'
import { connect } from 'react-redux'
import { unitsSelector } from 'Selectors'
import { actions } from 'Reducers/settings'
import { Table, ActionsGroup } from './components'
import { ModalInput, withModal } from 'Components/Modal'

const columns = (remove, update) => [
  {
    name: 'id',
    title: 'ID',
    size: 'col-sm-1'
  },
  {
    name: 'title',
    title: 'Название',
    size: 'col-sm-9'
  },
  {
    size: 'col-sm-2',
    render: (item) => <ActionsGroup item={item} remove={remove} update={update} />
  }
]


const Units = ({ remove, modalUpdateBag, update, ...rest }) => {
  return (
    <React.Fragment>
      <ModalInput modalBag={modalUpdateBag} confirm={update}/>
      <Table columns={columns(remove, (id) => modalUpdateBag.open(id))} {...rest} />
    </React.Fragment>)
}

const mapStateToProps = state => ({
  items: unitsSelector(state)
})

const mapDispatchToProps = (dispatch, props) => ({
  create: (data, formBag) => dispatch({ ...actions.create('unit', data), formBag }),
  // используем глобальную модалку для удаления
  remove: (id) => dispatch(actions.remove('unit', id)),
  // используем локальную модалку для редактирования
  update: (id, text) => dispatch({ ...actions.update('unit', { id, title: text }), modalBag: props.modalUpdateBag })
})

export default withModal('modalUpdateBag')(connect(mapStateToProps, mapDispatchToProps)(Units))
