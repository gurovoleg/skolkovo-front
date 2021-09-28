import moment from 'moment'

export const momentFromDate = (value, format) => {
  if (value instanceof moment) {
    return value
  }

  if (value && moment.isDate(value)) {
    return moment(value, format)
  }

  if (value && moment.unix(value).isValid()) {
    return moment.unix(value)
  }

  return value ? moment(value, format) : moment()
}

export const addToJSONMethod = (e, dateFormat) => {
  e.toJSON = function () {
    return moment(this).format(dateFormat)
  }
  return e
}