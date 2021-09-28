import React from 'react'
import { connect } from 'react-redux'
import { streamsSelector } from 'Selectors'
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


const Streams = ({ remove, modalUpdateBag, update, ...rest }) => {
  return (
    <React.Fragment>
      <ModalInput modalBag={modalUpdateBag} confirm={update}/>
      <Table columns={columns(remove, (id) => modalUpdateBag.open(id))} {...rest} />
    </React.Fragment>)
}

const mapStateToProps = state => ({
  items: streamsSelector(state)
})

const mapDispatchToProps = (dispatch, props) => ({
  create: (data, formBag) => dispatch({ ...actions.create('stream', data), formBag }),
  // используем глобальную модалку для удаления
  remove: (id) => dispatch(actions.remove('stream', id)),
  // используем локальную модалку для редактирования
  update: (id, text) => dispatch({ ...actions.update('stream', { id, title: text }), modalBag: props.modalUpdateBag })
})

export default withModal('modalUpdateBag')(connect(mapStateToProps, mapDispatchToProps)(Streams))
