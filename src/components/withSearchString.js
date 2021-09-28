import React from 'react'
import { parseSearchString } from 'Utils/searchString'

const withSearchString = WrappedComponent => props => {
  const { location, history } = props

  // получить объект с параметрами адресной строки
  const getUrlParams = () => parseSearchString(location.search)

  // создать строку с параметрами
  const createSearchString = (data) => {
    return Object.entries(data).filter(([k, v]) => v && v.length > 0).map(([k, v]) => `${k}=${v.join(',')}`).join('&')
  }

  // Обновить параметры сортровки
  const updateSortParams = (name) => {
    const params = getUrlParams()
    let newDir = 'asc'

    if (params.sort && params.sort[0]) {
      const [sortName, dir] = params.sort[0].split('-')
      newDir = dir === 'asc' ? 'desc' : 'asc'
    }
    params.sort = [`${name}-${newDir}`]
    return params
  }

  // Redirect to new URL
  const redirectToUrl = data => {
    history.push(urlGenerator(data))
  }

  // Generate a new URL
  const urlGenerator = data => {
    return `${location.pathname}?${createSearchString(data)}`
  }

  const urlBag = {
    params: getUrlParams(),
    redirect: redirectToUrl,
    generate: urlGenerator,
    // update: updateUrlParams,
    sort: updateSortParams,
    // resetFilter: resetUrlFilterParams,
    // removeFromFilter: removeUrlParameter
  }

  return (
    <WrappedComponent urlBag={urlBag} {...props} />
  )
}

export default withSearchString
