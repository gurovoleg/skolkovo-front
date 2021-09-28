import * as Yup from "yup"

Yup.addMethod(Yup.object, 'atLeastOneOf', function (list, message) {
  // return this.test({
  //   name: 'atLeastOneOf',
  //   // Данный формат написания используется в yup и работает с формик (то есть значения подставляются)
  //   // message: '${path} надо заполнить одно из: ${keys}',
  //   // params: { keys: list.join(', ') }, // используется для передачи доп данных (в данном случае список полей для вывода в сообщение)
  //   message: 'Необходимо выбрать один из вариантов',
  //   test: value => value === false || list.some(e => Array.isArray(value[e]) ? value[e].length > 0 : value[e])
  // })
  message = message || 'Необходимо выбрать один из вариантов'

  return this.test('atLeastOneOf', message, function (value) {
    return list.some(e => Array.isArray(value[e]) ? value[e].length > 0 : value[e])
  })
})

const idSchema = Yup.object().shape({
  id: Yup.number().required()
})

const schema = Yup.object().noUnknown().shape({
  title: Yup.string().required('Введите название'),
  text: Yup.string().required('Введите текст'),
  answers: Yup.object().noUnknown().shape({
    yes: Yup.boolean(),
    no: Yup.boolean(),
    noIdea: Yup.boolean(),
    personal: Yup.boolean(),
    rating: Yup.string(),
    custom: Yup.array().of(Yup.string().required('Заполните поле'))
  }).atLeastOneOf(['yes', 'no', 'noIdea', 'personal', 'rating', 'custom'])
})


// Схема для нового и существующего вопроса
const questionSchema = (type = 'update') => {
  return type === 'update' ? schema.concat(idSchema) : schema
}

export default questionSchema