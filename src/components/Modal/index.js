import React from 'react'
import { Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { actions } from 'Reducers/modal'
import { Preloader, ProgressBar } from 'Components/ui'

const ModalComponent = ({ modalState, close, confirm }) => {
  const { isOpen, header, content, size, isBusy, onClose } = modalState

  const closeModal = () => {
    close() // обновляем store (isOpen, isBusy)
    if (onClose) onClose() // обработчик на закрытие (например сбросить форму)
  }

    return (
    <Modal open={isOpen} size={size} onClose={closeModal} closeOnEscape={false} closeOnDimmerClick={false} >
      <Modal.Header>{header}</Modal.Header>
      <ProgressBar id="modal" simple height={4} />
      <Modal.Content>{content}</Modal.Content>
      {isBusy && <Preloader solid shadow color='blue' />}
      <Modal.Actions>
        <button type="button" disabled={isBusy} className="button button_md button_green mar-btm_sm" onClick={confirm}>
          Ок
        </button>
        <button type="button" disabled={isBusy} className="button button_md button_grey mar-right_md mar-top_sm" onClick={closeModal}>
          Отмена
        </button>
      </Modal.Actions>
    </Modal>
  )
}

const mapStateToProps = state => ({
  modalState: state.modal // данные модального окна (передаем через store)
})

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(actions.closeModal()),
  confirm: () => dispatch(actions.confirmModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent)

export { default as withModal } from './withModal'
export { default as ModalInput } from './ModalInput'
