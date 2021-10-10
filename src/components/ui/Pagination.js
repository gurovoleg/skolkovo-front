import React, { useRef, useEffect, useState } from 'react'
import { Icon, Pagination as PaginationUI } from 'semantic-ui-react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { paginationEntitySelector } from 'Selectors/pagination'
import { filterSearchString } from 'Utils/searchString'
import { config } from 'Root/settings'

const Pagination = ({ history, location, info, entity, onChange, current, total, perPage }) => {
  const totalPages = info.totalPages || total
  const currentPage = info.currentPage || current
  perPage = info.totalPages || perPage

  if (!totalPages || totalPages < 2) {
    return null
  }

  const handlePageChange = (e, props = {}) => {
    let paramsString = filterSearchString(location.search, ['page', 'perPage'])
    paramsString = paramsString ? paramsString + '&' : ''
    history.push(`?${paramsString}page=${props.activePage}&perPage=${perPage}`)
  }

  return (
    <div className="d-inline-block pad-btm_sm">
      <PaginationUI
        // style={{ fontSize: '10px'  }}
        // для мобильных экранов задаем минимальное колчиество элементов
        siblingRange={document.documentElement.clientWidth < config.mobileBreakPoint ? 0 : 1}
        // boundaryRange={0}
        className="pagination-mobile"
        activePage={currentPage}
        onPageChange={onChange || handlePageChange}
        totalPages={totalPages}
        prevItem={{ content: <Icon name='angle left'/>, icon: true }}
        nextItem={{ content: <Icon name='angle right'/>, icon: true }}
        firstItem={null}
        lastItem={null}
        pointing
        secondary
      />
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  info: paginationEntitySelector(state, props)
})

export default withRouter(connect(mapStateToProps)(Pagination))
