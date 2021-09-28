import React, { useState, Fragment } from 'react'
import { FieldArray } from "formik"
import { TextControl, TextAreaControl, RadioControl, CheckboxControl, FormLayout } from 'Components'
import { Checkbox } from 'Components/ui/form/inputs'
import { Icon } from 'semantic-ui-react'

const QuestionForm = ({ submit, cancel, initialValues, schema }) => {
  const [ratingEnabled, setRatingEnabled] = useState(initialValues.answers.rating)

  return (
    <FormLayout title="Редактирование" initialValues={initialValues} schema={schema} submit={submit} cancel={cancel}>
      {({ values, setValues }) => (
        <Fragment>

          <div className="row mar-btm_md">
            <div className="col">
              <TextControl name='title' label="Название" />
            </div>
          </div>

          <div className="row mar-btm_md">
            <div className="col">
              <TextAreaControl name='text' label="Текст" />
            </div>
          </div>

          <div className="wrap-inner-block wrap-inner-block_grey wrap-inner-block_round">

            <div className="text_lg text_medium pad-btm_md">Ответы</div>

            <div className="text_md text_light pad-btm_md">Простые варианты</div>

            <div className="row mar-btm_md">
              <div className="col-auto">
                <CheckboxControl disabled={ratingEnabled} name='answers.yes' label="Да" />
              </div>
              <div className="col-auto">
                <CheckboxControl disabled={ratingEnabled} name='answers.no' label="Нет" />
              </div>
              <div className="col-auto">
                <CheckboxControl disabled={ratingEnabled} name='answers.noIdea' label="Не знаю" />
              </div>
              <div className="col-auto">
                <CheckboxControl disabled={ratingEnabled} name='answers.personal' label="Свой вариант" />
              </div>
            </div>

            <div className="text_md text_light pad-btm_md">Рейтинговая система оценки</div>

            <div className="row">
              <div className="col-auto">
                <Checkbox label="Включить" checked={ratingEnabled} onChange={() => {
                  setRatingEnabled(state => !state)
                  setValues({ ...values, answers: {
                      yes: false,
                      no: false,
                      noIdea: false,
                      personal: false,
                      rating: '',
                      custom: []
                    }})
                }}/>
              </div>
              <div className="col-auto">
                <RadioControl disabled={!ratingEnabled} inline name='answers.rating' options={[
                  { label: '1-3 балла', value: '3' },
                  { label: '1-5 баллов', value: '5' },
                  { label: '1-10 баллов', value: '10' }
                ]}/>
              </div>
            </div>

            <FieldArray name="answers.custom" render={({ push, remove }) => {
              return (
                <React.Fragment>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="text_md text_light pad-btm_md">Другие варианты ответов</div>
                    </div>

                    <div className="col-md-6 text-md-right">
                      {ratingEnabled &&
                      <button className="button button_disabled button_sm button_purple-border mar-btm_md" type="button">
                        + Добавить ответ
                      </button>
                      }
                      {!ratingEnabled &&
                      <button className="button button_sm button_purple-border mar-btm_md" type="button" onClick={() => push('')}>
                        + Добавить ответ
                      </button>
                      }
                    </div>
                  </div>

                  {values.answers.custom.map((answer, idx) => {
                    return (
                      <div key={idx} className="row mar-btm_md">
                        <div className="col-11">
                          <TextControl disabled={ratingEnabled} name={`answers.custom[${idx}]`} label="Текст ответа" />
                        </div>
                        <div className="col-1 pad-top_md">
                          <Icon name="close" className="cursor-pointer" onClick={() => remove(idx)}/>
                        </div>
                      </div>
                    )
                  })}

                </React.Fragment>)
            }}/>

          </div>
        </Fragment>
      )}
    </FormLayout>
  )
}

export default QuestionForm
