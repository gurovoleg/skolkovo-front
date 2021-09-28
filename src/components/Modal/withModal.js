import React from 'react'

const withModal = (modalName) => WrappedComponent => {
  class WithModal extends React.Component {
    state = {
      isOpen: false,
      isBusy: false,
      itemId: null, // для передачи идентификатора записи
    }

    open = (itemId) => this.setState({ isOpen: true, itemId })
    close = () => this.setState({ isOpen: false, isBusy: false, itemId: null })
    busy = value => [true, false].indexOf(value) !== -1 ? this.setState({ isBusy: value }) : null

    render () {
      const props = {
        ...this.props,
        [modalName]: {
          isOpen: this.state.isOpen,
          isBusy: this.state.isBusy,
          itemId: this.state.itemId,
          open: this.open,
          close: this.close,
          busy: this.busy
        }
      }
      return <WrappedComponent {...props} />
    }
  }

  return WithModal
}

export default withModal
