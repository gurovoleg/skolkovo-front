import React, { Component } from 'react'

const withGroup = WrappedComponent => {

  class WithGroup extends Component {
    constructor(props) {
      super()
      this.state = {
        isOpened: false,
        idList: [],
        allSelected: false
      }
    }

    openHandler = () => {
      this.setState(({ isOpened, idList }) => ({
        isOpened: !isOpened,
        idList: isOpened ? [] : idList,
        allSelected: !!isOpened
      }))
    }

    selectItemHandler = (id) => {
      this.setState(({ idList }) => ({
        idList: idList.includes(id) ? idList.filter(e => e !== id) : [...idList, id]
      }))
    }

    selectAllHandler = (items) => () => {
      this.setState(({ allSelected }) => ({
        idList: allSelected ? [] : items.map(item => item.id),
        allSelected: !allSelected
      }))
    }

    render () {
      const { isOpened, allSelected, idList } = this.state
      const groupBag = {
        isOpened,
        allSelected,
        idList,
        selectAll: this.selectAllHandler,
        selectItem: this.selectItemHandler,
        toggleMenu: this.openHandler,
      }
      return <WrappedComponent groupBag={groupBag} {...this.props} />
    }
  }

  return WithGroup
}

export default withGroup
