import React, { useState } from 'react'
import classNames from "classnames"
import { Rating } from "./index"
import { RadioControl, TextControl } from "Components"
import { Checkbox } from 'Components/ui/form/inputs'

const labels = {
  yes: 'Да',
  no: 'Нет',
  noIdea: 'Не знаю',
}

const Answer = ({ data, name, setFieldValue }) => {

  // Ответ: Да/Нет/Не знаю/Свой вариант/Custom/
  if (!data.rating) {
    const answers = [...Object.keys(data).filter(key => data[key] && !['custom', 'personal'].includes(key)).map(e => labels[e]), ...data.custom]
    const options = answers.map(e => ({ label: e, value: e }))

    // вариант - свой ответ
    const [personal, setPersonal] = useState(false)

    return (
      <React.Fragment>

        <div className="col-12">
          <RadioControl name={name} inline options={options} disabled={personal} />
        </div>

        {data.personal &&
        <div className="col-12">
          <Checkbox label="Свой вариант" value={personal} onChange={() => {
            setPersonal(state => !state)
            setFieldValue(name, '')
          }} />
          {personal && <TextControl name={name} />}
        </div>}

      </React.Fragment>
    )
  }

  // Рейтинговый ответ
  return <Rating name={name} value={data.rating} className="col-md-3" />
}

export default Answer
