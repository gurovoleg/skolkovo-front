export const initials = (user, short = true) => {
  if (!user) {
    return ''
  }

  const { surname, name, patronymic } = user

  return (`${surname} 
           ${short && name ? name.slice(0, 1) + '.' : name || ''} 
           ${short && patronymic ? patronymic.slice(0, 1) + '.' : patronymic || ''}`).trim()
}