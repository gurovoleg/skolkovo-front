import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Wrap } from 'Components/ui'


const QuestionsList = ({ data, match, title, path }) => {
  const linkPath = path ? `${match.url}/${path}` : match.url

  return (
    <Wrap>

      <div className="text_center text_lg text_bold pad-btm_lg pad-top_md ">{title}</div>

      {/*<div className="line mar-btm_lg"></div>*/}

      {!data && <div className="text_center disabled text_regular text_md pad-btm_sm">Нет данных</div>}
      {data && Object.keys(data).length > 0 &&
      <Fragment>
        {/* Колонки */}
        <div className="row wrap-inner_wide d-none d-md-flex pad-btm_sm">
          <div className="col-md-1 text_sm text_bold">id</div>
          <div className="col-md-3 text_sm text_bold">Вопрос</div>
          <div className="col-md-8 text_sm text_bold">Текст</div>
        </div>

        {/* Строки */}
        <div className="table-stripe">
          {data.map(item => (
            <div key={item.id} className="row table-stripe-item wrap-inner_wide pad-top_sm pad-btm_sm">
              <div className="col-md-1">{item.id}</div>
              <Link to={`${linkPath}/${item.id}`} className="col-md-3">{item.title}</Link>
              <div className="col-md-8">{item.text}</div>
            </div>
          ))}
        </div>
      </Fragment>}

    </Wrap>
  )
}

export default QuestionsList