import React from 'react'
import { Link, withRouter } from "react-router-dom"
import { Icon } from "semantic-ui-react"

const BreadCrumbs = ({ location }) => {

  const crumbs = location.pathname.split('/').map((item, i, arr) => {
    return {
      key: i,
      isLast: i === arr.length - 1,
      path: i === 0 ? '/' : arr.slice(0, i + 1).join('/'),
      name: item
    }
  })

  return (
    <React.Fragment>
      {crumbs.map(item => {
        if (item.isLast) return <span key={item.key} className="text_grey text_sm">{item.name}</span>
        return (
          <React.Fragment key={item.key}>
            <Link to={item.path} className="text_black text_sm">{item.key === 0 ? <Icon className="mar-right_no" name='home'/> : item.name}</Link>
            <span className="text_xs mar-left_sm"><Icon name='right chevron'/></span>
          </React.Fragment>
        )
      })}
    </React.Fragment>
  )
}

export default withRouter(BreadCrumbs)
