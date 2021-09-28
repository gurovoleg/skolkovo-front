import React from 'react'
import classNames from "classnames"

const Wrap = ({ children, className }) => {
  return (
    <div className={classNames('wrap wrap_white wrap_shadow pad-top_lg pad-btm_lg wrap_round mar-top_md mar-btm_md', className)}>
      {children}
    </div>
  )
}

export default Wrap
