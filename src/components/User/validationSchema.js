import * as Yup from "yup"
import { chars } from 'Utils/validators'

const idSchema = Yup.object().shape({
  id: Yup.number().required()
})

const schema = Yup.object().shape({
  status: Yup.string(),
  // name: Yup.string().required('Введите имя').test('name', 'Некорреткный символ', value => chars(value)),
  // surname: Yup.string().required('Введите фамилию').test('surname', 'Некорреткный символ', value => chars(value)),
  name: Yup.string().required('Введите имя'),
  surname: Yup.string().required('Введите фамилию'),
  patronymic: Yup.string().test('patronymic', 'Некорреткный символ', value => chars(value)),
  email: Yup.string().email('Неверный формат email').required('Введите email'),
  changePassword: Yup.string(),
  password: Yup.string().when('changePassword', (changePassword, schema) => changePassword === 'true' ? schema.min(5, 'Не менее 5 символов').required('Введите пароль') : schema),
  gender: Yup.string().required(),
  age: Yup.number().nullable(true).transform((c, o) => o === '' ? null : c).required('Укажите возраст').min(18, 'Не менее 18 лет').max(100, 'Слишком большое значение'),
  roleId: Yup.number().required(),
  rating: Yup.string(),
  streamId: Yup.number().nullable(true).transform((c, o) => o === '' ? null : c),
  unitId: Yup.number().nullable(true).transform((c, o) => o === '' ? null : c),
  workshopId: Yup.number().nullable(true).transform((c, o) => o === '' ? null : c),
  headquarters: Yup.string(),
  createdAt: Yup.string()
})

// Схема для нового и существующего пользователя
const userSchema = (type = 'update') => {
  return type === 'update' ? schema.concat(idSchema) : schema
}

export default userSchema