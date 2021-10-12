import React, { useCallback, useRef } from 'react'
import { toPng } from "html-to-image"
import { Icon } from "semantic-ui-react"
import { config } from 'Root/settings'

const withChart = (setInitialState, mobileBreakPoint = config.mobileBreakPoint) => WrappedComponent => (props) => {
  const isMobile = document.documentElement.clientWidth < mobileBreakPoint
  const { height, title, ...rest } = setInitialState(props, isMobile)

  const ref = useRef(null)

  const buttonClickHandler = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'chart.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

  return (
    <div>

      {/* Кнопка сохранить PNG */}
      <div className="text_alignRight mar-btm_md">
        <div className="button button_white button_shadow text_sm d-block d-sm-inline-block" onClick={buttonClickHandler}>
          <Icon name="file image" color="blue"/>
          Сохранить PNG
        </div>
      </div>

      {/* Заголовок */}
      {title && <div className="text_bold text_lg text_center">{title}</div>}

      {/* Обертка для графика. Должна иметь высоту. */}
      <div ref={ref} style={{ height: `${height}px`, border: '0px solid' }}>
        <WrappedComponent {...rest} isMobile={isMobile} />
      </div>

    </div>
  )
}

export default withChart