import React, { useState } from 'react'
import { Icon } from "semantic-ui-react"

const Password = ({ type, ...rest }) => {
  const [visible, setVisible] = useState(false)

  return (
    <React.Fragment>
      {/* Кнопку помещаем первой, так как в стилях для label используется фокус для ближайшего соседа */}
      <div
        className="form-password-eye button button_sm button_transparent"
        onClick={() => setVisible((state) => !state)}
      >
        <Icon name={visible ? 'eye' : 'eye slash'} link />
      </div>

      <input type={visible ? 'text' : 'password'} {...rest} />

    </React.Fragment>
  )
}

export default Password
