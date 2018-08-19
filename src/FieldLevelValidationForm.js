


import React from 'react'
import { Field, reduxForm } from 'redux-form'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

const colorList = [{color:"Green"},{color:"Red"},{color:"Blue"}];

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined

const renderField = ({ input, label, checked, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)
const renderRadioField = ({ input,  name, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const renderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
  <div>
        <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null} />
        {touched && error && <span>{error}</span>}
  </div>
);

const FieldLevelValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit} >
      <Field name="username" type="text"
        component={renderField} label="Username"
        validate={[ required, maxLength15 ]}
      />
      <Field name="email" type="email"
        component={renderField} label="Email"
        validate={email}
        warn={aol}
      />
      <Field name="sex" type="radio"
        component={renderRadioField} label="Male" value="Male" 
        xvalidate={[ required, number, minValue18 ]}
        warn={tooOld}
      />
      <Field name="sex" type="radio"
        component={renderRadioField} label="Female" value="Female"
        xvalidate={[ required, number, minValue18 ]}
        warn={tooOld}
      />
      <div>
        <label>Favorite Color</label>
        <div>
          <Field name="favoriteColor" component="select" xtype="select">
            <option />
          {
              colorList.map((color, index) => {
                return (<option value={color.color}>{color.color}</option>)
              })
            }
          </Field>
        </div>
      </div>
      <Field name="date" type="text"
        component={renderDatePicker} label="Female" value="Female"
        xvalidate={[ required, number, minValue18 ]}
        warn={tooOld}
      />
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'fieldLevelValidation',
  touchOnBlur: false
})(FieldLevelValidationForm)