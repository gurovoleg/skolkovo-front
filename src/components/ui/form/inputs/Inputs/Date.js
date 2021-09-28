import React from 'react'
import { addToJSONMethod } from 'Utils/date'
import { Masked } from './index'
import moment from 'moment'
import Calendar from 'react-calendar'

class DateComponent extends React.Component {
  constructor (props) {
    super(props)
    // шаблон для строкового визуального значения
    this.pattern = `DD${this.props.delimiter}MM${this.props.delimiter}YYYY`
    // шаблон для компонента Masked
    this.mask = [/\d/, /\d/, this.props.delimiter, /\d/, /\d/, this.props.delimiter, /\d/, /\d/, /\d/, /\d/]
    this.state = {
      date: this.props.value ? moment(this.props.value).format(this.pattern) : '',
      showCalendar: false
    }
    // ссылка на обертку с инпутом и календарем
    this.elRef = React.createRef()
    // формат даты, используется при сериализации данных и отправки на сервер
    this.jsonFormat = this.props.jsonFormat || 'YYYY-MM-DD'
  }

  componentDidUpdate (prevProps, prevState) {
    // удаляем обработчик, когда календарь закрывается
    if (!this.state.showCalendar && this.state.showCalendar !== prevState.showCalendar) {
      document.removeEventListener('click', this.handleDocumentClick)
    }
    if (this.props.value !== prevProps.value) {
      this.setState({ date: this.props.value ? moment(this.props.value).format(this.pattern) : '' })
    }
  }

  // обработка клика вне календаря
  handleDocumentClick = (e) => {
    if (this.elRef.current && !this.elRef.current.contains(e.target)) {
      this.setState({ showCalendar: false })
    }
  }

  // обработка ввода данных согласно шаблону и валидности даты
  handleChange = (e) => {
    const { delimiter, placeholderChar, onChange } = this.props
    const value = e.target.value
    this.setState({ date: value })
    // Убираем из даты шаблонные символы (разделитель, плейсхолдер) для дальнейшей валидации на пустое значение
    const regexp = new RegExp(`[${placeholderChar}${delimiter}]`, 'g')
    const clearedValue = value && value.replace(regexp, '')
    // Пропускаем только строго согласно шаблону или пустое значение
    if (!clearedValue || moment(value, this.pattern, true).isValid()) {
      onChange(!clearedValue ? '' : moment(value, this.pattern).toDate())
    }
  }

  // При фокусе запускаем календарь и выставляем каретку
  handleFocus = (e) => {
    // Останавливает React от сброса свойств объекта события
    // (актуально до 16 версии, с 17 версии пул событий не используется https://ru.reactjs.org/docs/legacy-event-pooling.html)
    e.persist()
    // После фокуса переводим каретку в начало (задаем задержку, чтобы прошел фокус)
    setTimeout(() => e.target.setSelectionRange(0, 0))
    this.setState({ showCalendar: true })
    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }

  // Если не соотвествует шаблону, то сбрасываем до старого значения
  handleBlur = (e) => {
    if (e.target.value && !moment(e.target.value, this.pattern, true).isValid()) {
      this.setState({ date: this.props.value ? moment(this.props.value).format(this.pattern) : '' })
    }
    if (this.props.onBlur) {
      this.props.onBlur()
    }
  }

  // отслеживаем положение над элементом и добавляем/удаляем обработчик клика вне элемента
  handleMouseOverElement (isOver) {
    if (this.state.showCalendar) {
      isOver
        ? document.removeEventListener('click', this.handleDocumentClick)
        : document.addEventListener('click', this.handleDocumentClick)
    }
  }

  render () {
    const { value, delimiter, placeholderChar, onChange, onBlur, onFocus, jsonFormat, ...rest } = this.props

    // Заменяем toJSON на собственный метод, чтобы приводить дату к нужному формату при отправке на сервер
    if (value && typeof (value) === 'object') {
      addToJSONMethod(value, jsonFormat)
    }

    return (
      <div
        ref={this.elRef}
        onMouseLeave={() => this.handleMouseOverElement(false)}
        onMouseEnter={() => this.handleMouseOverElement(true)}
      >
        {/* Инпут */}
        <Masked
          {...rest}
          showMask
          placeholderChar={placeholderChar}
          mask={this.mask}
          value={this.state.date}
          // Отменяем submit формы по нажатию Enter
          onKeyDown={(e) => e.key === 'Enter' ? e.preventDefault() : null}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
        />

        {/* Иконки */}
        <div className="form-password-eye button button_sm button_transparent">
          <i className="ion ion-md-close mar-right_sm" onClick={() => {
            this.setState({ date: '', showCalendar: false })
            onChange('')
          }} />
          <i className="ion ion-md-grid" onClick={() => {
             this.setState(({ showCalendar }) => ({ showCalendar: !showCalendar }))
          }} />
        </div>

        {/* Календарь */}
        {this.state.showCalendar &&
        <Calendar
          minDate={this.props.minDate}
          className="absolute"
          locale="ru-RU"
          onChange={value => {
            this.setState({
              date: value ? moment(value).format(this.pattern) : '',
              showCalendar: false
            })
            onChange(moment(value, this.pattern).toDate())
          }}
          value={value ? moment(value).toDate() : moment().toDate()}
        />}
      </div>
    )
  }
}

DateComponent.defaultProps = {
  delimiter: '.',
  placeholderChar: '-'
}

export default DateComponent
