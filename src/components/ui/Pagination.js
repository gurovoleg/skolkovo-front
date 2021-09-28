import React from 'react'
import { Pagination as PaginationUI } from 'semantic-ui-react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { paginationEntitySelector } from 'Selectors/pagination'
import { filterSearchString } from 'Utils/searchString'

const Pagination = ({ history, location, info, entity }) => {
  const { totalPages, currentPage, perPage } = info
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
        className="pagination-mobile"
        activePage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
        nextItem={null}
        prevItem={null}
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
