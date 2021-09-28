// ---------- Validator error messages ----------

export const messages = {
  required: 'Необходимо ввести данные',
  forbidden: 'Не используйте запрещенные символы',
  incorrect: 'Неверный формат',
  masked: 'Введите все данные',
  postCode: 'Введите 6 цифр',
  date: 'Введите корректную дату',
  inn: 'Некорректный ИНН',
  phone: 'Неверный номер телефона',
  email: 'Некорректный адрес электронной почты',
  chars: 'Допустимы только буквы и дефис'
}

// ---------- Basic Validators ----------

export const required = (v) => (v && true)
export const chars = (v) => /^[-ёa-zA-Zа-яА-Я\s]{0,}$/.test(v)
export const numbers = (v) => /^[0-9]{0,}$/.test(v)
export const numbersWithSpaces = (v) => /^[0-9\s.]{0,}$/.test(v)
export const money = (v) => /^([0-9]{0,})(\.[0-9]{2})?$/.test(v)
export const charsAndNumbers = (v) => /^[-ёa-zA-Zа-яА-Я0-9\s]{0,}$/.test(v)
export const phone = (v) => /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/.test(v) || v === ''
export const email = (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || v === ''
export const url = (v) => /^(https?:\/\/)?([ёа-яa-z0-9][ёа-я\w~\-\.]+)\.([ёа-я\w\-]{2,})(\/([^\s]+)?)?$/i.test(v) || v === ''
export const masked = (v) => /^[^_]*$/.test(v) // для Masked проверяем шаблон на заполненность

