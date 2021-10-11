export const filterObject = (names, statuses) => {
  return names.reduce((result, name) => ({ ...result, [name]: statuses[name] }), {})
}

// сортировка объекта по ключу
export const  sortObjectByKey = (obj) => Object.keys(obj).sort().reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {})

// приведение занчений объекта/массива к процентному эквиваленту
export function formatToPercentage (data) {
  const result = {}
  let indexes = []
  let lastChangedKey = null // ключ последнего округленного числа с дробной частью 0.5
  let toFloor = false // индикатор округления в меньшую сторону

  const total = Object.values(data).reduce((acc, value) => acc + Number(value), 0)
  // console.log('TOTAL', total, data)
  Object.entries(data).forEach(([key, value]) => {
    let newValue = (value * 100 / total).toFixed(1)
    const [int, dec] = newValue.split('.')
    // отдельно обрабатываем пограничное значение. Половину значений округляем вверх, другую половину вниз.
    // в случае нечетного количества после дополнительно обрабатываем последнее округленное значение
    if (dec === '5') {
      indexes.push({ [key]: newValue })
      lastChangedKey = key
      newValue = toFloor ? Math.floor(newValue) : Math.ceil(newValue)
      toFloor = !toFloor
    } else {
      newValue = Math.round(newValue)
    }
    result[key] = newValue
  })

  // подсчет обшего количества процентов из полученных данных
  const totalPercentage = Object.values(result).reduce((acc, value) => acc + value, 0)
  // проверка нужна ли корректировка для последнего значения (в случае, когда было нечетное количество значений с дробной частью 0.5)
  if (totalPercentage > 100) {
    result[lastChangedKey] = result[lastChangedKey] - totalPercentage % 100
  }

  // console.log('result', result)
  // console.log('indexes', indexes)
  // console.log('NEW TOTAL', Object.values(result).reduce((acc, value) => acc + value, 0))

  // Если был передан массив, то возвращаем результат в виде массива
  if (Array.isArray(data)) {
    return Object.values(result)
  }

  return result
}

// TESTS
// console.log('formatToPercentage test', formatToPercentage([40, 54, 23, 79, 4, 53, 47, 100]))
// console.log('formatToPercentage test', formatToPercentage([40, 54, 23, 79, 4]))
