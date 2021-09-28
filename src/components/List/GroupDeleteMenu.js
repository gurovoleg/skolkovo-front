import React from 'react'
import classNames from "classnames"
import { PluralValue } from 'Components/ui'

const GroupMenu = ({ idList = [], cancel, confirm }) => {
  return (
    <div className={classNames('wrap wrap_yellow wrap_shadow wrap_round pad-top_md pad-btm_md mar-btm_md')}>

      {idList.length === 0 &&
      <div className="row justify-content-between align-items-center">
        <div className="text_md text_bold pad-btm_md pad-top_md">Выберите пользователей</div>
        <button className="button text_sm button_md" type="button" onClick={cancel}>
          Отмена
        </button>
      </div>}

      {idList.length > 0 &&
      <div className="row justify-content-between align-items-center">
        <div className="text_md text_bold pad-btm_md pad-top_md">
          Выбрано <PluralValue number={idList.length} values={['запись', 'записи', 'записей']}/>
        </div>
        <div>
          <button className="button button_purple text_sm button_md mar-right_md" type="button" onClick={() => confirm(idList)}>
            Удалить
          </button>
          <button className="button text_sm button_md" type="button" onClick={cancel}>
            Отмена
          </button>
        </div>
      </div>
      }

    </div>
  )
}

export default GroupMenu
