import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const ProgressBar = ({ id, indicatorData, value, className, simple, round, height = 8 }) => {
  const { stages = 1, current = 0, error } = indicatorData
  const progressValue = value || (stages === current ? 100 : Math.floor(100 / stages) * current)

  return (
    <div
      style={{ width: `${progressValue}%`, height: height + 'px' }}
      className={classNames('loader-line-fill', {
        'loader-line-fill_round': round,
        'loader-line-fill_purple': !simple && progressValue <= 40,
        'loader-line-fill_yellow': !simple && progressValue > 40 && progressValue < 100,
        'loader-line-fill_green': simple || progressValue === 100,
        'loader-line-fill_red': error,
      }, className)} />
  )
}

const mapStateToProps = (state, props) => ({
  indicatorData: state.progressbar[props.id] || {}
})

ProgressBar.propTypes = {
  value: PropTypes.number, // величина прогресса (можно использовать ее, можно использовать indicatorData)
  indicatorData: PropTypes.object, // объект с данными дя прогресса (берется из state.progressBar[progressBarId]) - кол-во стадий + текущая стадия (используется вместо value)
  id: PropTypes.string, // идентификатор для прогрессбар (добавляется в хранилище для дальнейшей работы)
  simple: PropTypes.bool, // используется один цвет (по умолчанию зеленый)
  round: PropTypes.bool, // закругленные края
  height: PropTypes.number // высота в px
}

export default connect(mapStateToProps)(ProgressBar)
