import React from 'react'
import { initials } from 'Utils/initials'

const UserName = ({ className, user, short = true }) => {
  return (
    <span className={className}>{initials(user, short) || user.email}</span>
  )
}

export default UserName