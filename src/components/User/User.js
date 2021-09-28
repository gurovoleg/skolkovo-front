import React from 'react'
import { Icon, Statistic, Label } from "semantic-ui-react"
import { Link } from 'react-router-dom'
import { Wrap, PluralValue, Value, DateValue } from 'Components/ui'
import { statuses } from 'Root/settings'
import { rolesSelector } from "Selectors"
import { useSelector } from "react-redux"

const User = ({ user, match, deleteUser, profile }) => {
  const roles = useSelector(rolesSelector)
  const admin = roles.find(role => role.name === 'admin')

  // пользователь должен быть админом и не должен удалять самого себя
  const canDelete = profile.roleId === (admin && admin.id) && (user.id !== profile.id)

  if (!user) return null

  return (
    <Wrap>

      <div className="d-flex align-items-center justify-content-between mar-btm_lg">

        <div className="d-flex align-items-center">
          <Icon name="user circle" size="huge" className="d-none d-md-block mar-right_md"/>
          <div>
            <div className="text_xl text_bold">{user.name} {user.surname}</div>
            <div className="text_sm pad-top_sm">
              {user.age && <span className="mar-right_md"><PluralValue number={user.age} values={['год', 'года', 'лет']}/></span>}
              <Label className="mar-btm_sm" color='blue'>{user.role || 'Роль не задана'}</Label>
              <Label className="mar-btm_sm" color={user.status === 'active' ? 'green' : 'red'}>
                {user.status ? statuses[user.status].label : 'Не указано'}
              </Label>
            </div>
          </div>
        </div>

        <Statistic color='violet' className="mar-no">
          <Statistic.Value>{user.rating || '--'}</Statistic.Value>
          <Statistic.Label>Рейтинг</Statistic.Label>
        </Statistic>

      </div>

      <div className="line mar-btm_lg"></div>

      <div className="row mar-btm_lg">
        <div className="col-auto pad-btm_md pad-right_lg">
          <div className="text_sm text_bold mar-btm_xs">Email</div>
          <div className="text_md text_light">{user.email}</div>
        </div>
        <div className="col-auto pad-btm_md pad-right_lg">
          <div className="text_sm text_bold mar-btm_xs">Дата создания</div>
          <div className="text_md text_light"><DateValue value={user.created}/></div>
        </div>
        <div className="col-auto pad-btm_md pad-right_lg">
          <div className="text_sm text_bold mar-btm_xs">Дата изменения</div>
          <div className="text_md text_light"><DateValue value={user.updated}/></div>
        </div>
      </div>

      <div className="row">
        <div className="col-auto pad-btm_md pad-right_lg">
          <div className="text_sm text_bold mar-btm_xs">Практикум</div>
          <div className="text_md text_light"><Value v={user.workshop}/></div>
        </div>
        <div className="col-auto pad-btm_md pad-right_lg">
          <div className="text_sm text_bold mar-btm_xs">Поток</div>
          <div className="text_md text_light"><Value v={user.stream}/></div>
        </div>
        <div className="col-auto pad-btm_md pad-right_lg">
          <div className="text_sm text_bold mar-btm_xs">Группа</div>
          <div className="text_md text_light"><Value v={user.unit}/></div>
        </div>
        <div className="col-auto pad-btm_md pad-right_lg">
          <div className="text_sm text_bold mar-btm_xs">Штаб</div>
          <div className="text_md text_light"><Value v={user.headquarters}/></div>
        </div>
      </div>

      <Link to={`${match.url}/edit`} className="button button_yellow mar-top_lg mar-right_md">
        Редактировать
      </Link>

      {canDelete && <div className="button button_black-border mar-top_lg" onClick={deleteUser}>Удалить</div>}

    </Wrap>
  )
}

export default User

