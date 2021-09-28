export const set = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value)
    window.localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.log('localStorage setItem ', error)
  }
}

export const get = (key) => {
  try {
    const serializedValue = window.localStorage.getItem(key)
    return JSON.parse(serializedValue)
  } catch (error) {
    console.log('localStorage getItem ', error)
  }
}

export const remove = (key) => {
  window.localStorage.removeItem(key)
}
