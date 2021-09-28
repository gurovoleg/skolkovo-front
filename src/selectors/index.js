import { createSelector } from 'reselect'

export const idSelector = name => (state, props) => {
  if (props[name]) {
    return props[name]
  } else if (props.match && props.match.params[name]) {
    return props.match.params[name]
  } else {
    return undefined
  }
}

export const remoteStatusSelector = (state, props) => {
  return state.remote.status[props.url]
}

export const remoteDataSelector = (state) => {
  return state.remote.data || {}
}

export const streamsSelector = createSelector(remoteDataSelector, data => data.stream || [])
export const unitsSelector = createSelector(remoteDataSelector, data => data.unit || [])
export const rolesSelector = createSelector(remoteDataSelector, data => data.role || [])

const getItem = (items, id) => items.find(item => item.id === id) || {}

// export const roleSelector = createSelector([rolesSelector, idSelector('roleId')], getItem)
// export const streamSelector = createSelector([streamsSelector, idSelector('streamId')], getItem)
// export const unitSelector = createSelector([unitsSelector, idSelector('unitId')], getItem)
