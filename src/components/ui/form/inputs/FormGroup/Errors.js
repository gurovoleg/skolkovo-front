import React from 'react'

const Message = ({ message }) => <span>{message}&nbsp;</span>

const Errors = ({ show, showAll, messages }) => {
  return (
    <React.Fragment>
      {messages
        ? Array.isArray(messages)
          ? showAll
            ? messages.map((message, index) => <Message key={index} message={message} />)
            : <Message message={messages[0]} />
          : show
            ? <Message message={messages} />
            : null
        : null}
    </React.Fragment>
  )
}

export default Errors
