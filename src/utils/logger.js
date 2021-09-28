const logger = ({ getState }) => next => action => {
  console.group('Action Type: ', action.type)
  if (action.error) {
    console.log('%c Action details ', 'background: red;color: #fff;font-weight:bold', action)
  } else {
    console.log('%c Action details ', 'color: blue;font-weight:bold', action)
  }
  const result = next(action)
  console.log('%c state ', 'color: blue;font-weight:bold', getState())
  console.groupEnd()

  return result
}

export default logger