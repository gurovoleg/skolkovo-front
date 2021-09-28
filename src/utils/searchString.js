const initialValue = { sort: [] }

// объект с параметрами адресной строки
export const parseSearchString = (searchString) => {
  if (!searchString) return initialValue
  let searchParams = searchString.replace('?', '').split('&')
  return searchParams.reduce((result, item) => {
    let [key, value] = item.split('=')
    value = value ? [value] : value.split(',')
    return { ...result, [key]: value }
  }, {})
}

// фильтруем параметры адресной строки согласно шаблону
export const filterSearchString = (searchString, filter = ['sort', 'page', 'perPage']) => {
  const params = parseSearchString(searchString)

  return Object.entries(params)
    .filter(([k, v]) => (v && v.length > 0) && !filter.includes(k))
    .map(([k, v]) => `${k}=${v.join(',')}`).join('&')

}
