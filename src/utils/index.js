export const filterObject = (names, statuses) => {
  return names.reduce((result, name) => ({ ...result, [name]: statuses[name] }), {})
}
