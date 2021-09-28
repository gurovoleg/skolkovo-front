import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'
import { Preloader } from 'Components/ui'
import { Text } from 'Components/ui/form/inputs'

const ModalInput = ({ modalBag, size, confirm, header, content }) => {
  let { isOpen, isBusy, close, open, busy, itemId, itemTitle } = modalBag
  const [text, setText] = useState(itemTitle)

  return (
    <Modal open={isOpen} size={size} onClose={close}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        {content}
        <Text placeholder="Введите новое название" value={text} onChange={(e) => setText(e.target.value)}/>
      </Modal.Content>
      {isBusy && <Preloader solid shadow color='blue'/>}
      <Modal.Actions>
        <button type="button" disabled={isBusy || !text} className="button button_md button_green mar-btm_sm" onClick={() => {
          busy(true)
          confirm(itemId, text)
        }}>
          Ок
        </button>
        <button type="button" className="button button_md button_grey mar-right_md mar-top_sm" onClick={close}>
          Отмена
        </button>
      </Modal.Actions>
    </Modal>
  )
}

ModalInput.defaultProps = {
  header: 'Редактирование',
  size: 'mini',
  content: ''
}

export default ModalInput