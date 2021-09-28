import React from 'react'
import ReactSelect, { components } from 'react-select'

const SelectComponent = ({ label, disabled, noOptionsMessage, ...rest }) => {
  return (
    <ReactSelect
      noOptionsMessage={() => noOptionsMessage || 'Нет данных'}
      placeholder=""
      isDisabled={disabled}
      styles={customStyles(label)}
      theme={customTheme}
      menuPlacement="auto" {...rest} />
  )
}

/*
 *  Стилизация селект через параметры (можно так же сделать на классах, задав префиксы для их структуры)
*/

const borderDefault = '1px solid #e9e9e9'
const borderActive = '1px solid #4ea4f1'

// Стили темы (используем для задания активных цветов у options)
const customTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: 'rgba(117, 134, 151, 0.1)',
    primary: '#6872E3'
  }
})

// Стили элементов
const customStyles = (label) => ({
  // селект
  control: (provided) => ({
    ...provided,
    background: 'rgba(117, 134, 151, 0.066)',
    padding: label ? '22px 12px 0px 9px' : '7px 9px',
    border: 'none',
    boxShadow: 'none',
    borderRadius: '7px',
    position: 'relative',
    zIndex: 1,
    width: '100%',
    transition: 'ease 0.3s',
    transitionProperty: 'box-shadow, background',
    color: '#1A1A1A',
    fontSize: '16px',
    cursor: 'pointer',

    // высоту определяем в зависимости от наличия label
    height: label ? '50px' : 'inherit',
    minHeight: label ? '50px' : 'inherit',
    minWidth: label ? '100%' : 'inherit',
    maxWidth: label ? '100%' : 'inherit',

    ':active': {
      outline: 'none',
      background: 'none !important',
      boxShadow: '0 0 0 1px rgba($purple, .75)',
      transition: 'none'
    },
    ':hover': {
      background: 'rgba(117, 134, 151, 0.099)',
      transition: 'none'
    }
  }),
  clearIndicator: provided => ({
    ...provided,
    padding: '4px'
  }),
  dropdownIndicator: provided => ({
    ...provided,
    padding: '0px',
    marginTop: label ? '-20px' : 0
  }),
  indicatorSeparator: provided => ({
    ...provided,
    margin: '10px 0px',
    display: 'none'
  }),
  // выпадающий список
  menu: (provided) => ({
    ...provided,
    border: borderDefault,
    boxShadow: '4px 4px 10px 0 rgba(0, 0, 0, 0.05)',
    background: '#fff',
    borderRadius: '7px',
    maxHeight: '300px',
    padding: '0',
    overflowY: 'hidden',
    // position: 'relative',
    zIndex: 4
  }),
  placeholder: (provided) => ({
    ...provided,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '90%'
  }),
  // элемент выпадающего списка
  option: (provided) => ({
    ...provided,
    cursor: 'pointer',
    transition: 'background ease 0.3s',
    borderBottom: '1px dashed rgba(0,0,0,0.1)',
    padding: '8px 12px',
    // fontSize: '14px',
    ':last-child': {
      borderBottom: 'none',
    }
  }),
  // обертка для выбранный элемент внутри селект
  valueContainer: (provided) => ({
    ...provided,
    padding: 0
  }),
  // выбранный элемент внутри селект
  singleValue: (provided) => ({
    ...provided,
    maxWidth: '90%',
    margin: 0,
    padding: 0,
    lineHeight: 1
  })
})

export default SelectComponent

export const SelectInputOption = WrappedComponent => props => (
  <components.Option {...props}>
    <WrappedComponent {...props} />
  </components.Option>
)
