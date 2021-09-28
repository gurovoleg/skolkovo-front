import React from 'react'
import { Pagination } from "Components/ui"
import * as storage from 'Utils/storage'
import { withRouter } from 'react-router-dom'
import classNames from "classnames"
import withGroup from 'Components/withGroup'

/*
    Шаблон для страниц со списком. Включает пагинацию, кнопку отображения группового меню для работы с группой данных;
    групповое меню, полученное из props, чекбокс для выбора всех записей.
    Для детей возвращает функцию с параметрами для работы с меню (isOpened, allSelected, idList, selectAll, selectItem, toggleMenu).
    В качестве детей ожидаются меню и список.
*/

class List extends React.Component {

  componentDidMount() {
    // запоминаем параметры запроса для этой страницы, чтобы в сагах при добавлении/удалении делать запрос за обновленными
    // данынми с учетом этих параметров (сортировка, занчения полей, пагинация)
    storage.set(this.props.entity, location.search)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.search !== this.props.location.search) {
      storage.set(this.props.entity, location.search)
    }
  }

  render() {
    const { entity, data, groupBag, children, menu } = this.props
    const { isOpened, allSelected, idList, selectAll, selectItem, toggleMenu } = groupBag

    return (
      <React.Fragment>

        {/* Пагинация */}
        <div className="row justify-content-center">
          <div className="col-auto">
            <Pagination entity={entity}/>
          </div>
        </div>

        {menu &&
        <React.Fragment>

          {/* Переключатель группового меню */}
          <div className="pad-btm_md text_alignRight mar-btm_md mar-top_md">
            <button
              className={classNames('button button_sm button_grey-border pad-left_md pad-right_md text_md', { 'button_black': isOpened })}
              onClick={toggleMenu}>
              Редактировать несколько
            </button>
          </div>

          {/* Меню для обработки группы данных */}
          {/*{menu && isOpened && React.createElement(menu, { cancel: toggleMenu, idList })}*/}
          {isOpened && menu({ cancel: toggleMenu, idList })}

          {/* Чекбокс "Выбрать все" */}
          {isOpened &&
          <div className="relative pad-btm_md">
            <div className="checkbox-row">
              <input id="all" type="checkbox" checked={allSelected} onChange={selectAll(data)}/>
              <label htmlFor="all" className="text_sm text_regular mar-left_sm">Выбрать всех</label>
            </div>
          </div>}

        </React.Fragment>}

        {/* Передаем в виде функции с параметрами */}
        {children && children({ ...groupBag })}

      </React.Fragment>
    )
  }
}

export default withRouter(withGroup(List))