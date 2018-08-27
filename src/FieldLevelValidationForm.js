


import React from 'react'
import { Field, reduxForm } from 'redux-form'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'
import * as  classes from './index.css';
//import * as crmJSON from  './crm';
import {connect} from 'react-redux'
const colorList = [{ color: "Green" }, { color: "Red" }, { color: "Blue" }];
const radioSelected = "Male"

const normalizePhone = (value, previousValue) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 3) {
      return onlyNums + '-'
    }
    if (onlyNums.length === 6) {
      return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-'
    }
  }
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 6) {
    return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3)
  }
  return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 10)
}

let vzHolidays = {
  '2018': {
    '12': ['01'],
    '11': ['30']
  },
  '2019': {
    '01': ['01', '07']
  }
}
let excludeDates = [];
let sundays = [];
let combinedHolidays = [];




const required = value => value ? undefined : 'Required';
const mobLength = length => value=> value && value.length===length?undefined:'Phone number should be exact 10 characters';
const phone10=mobLength(12);
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

const renderField = ({ input, label, className, checked, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className={className} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)
const renderEmailField = ({ input, label, className, checked, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className={className} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)
const renderNumberField = ({ input, label, checked, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} className="quantity" placeholder={label} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)
const renderRadioField = ({ input, name, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)



let contactNumber = "9882335525"
const lower = value => value && value.toLowerCase()

// let isDisabled = true;
class FieldLevelValidationForm extends React.Component {
  state = {
    isDisabled: true,
    maleChecked: true,
    femaleChecked: false,
    selectedDate: null,
  }
  // clearDate= (value) => {
  //   if(!this.state.isDisabled){
  //     value="";
  //   }
  // }


 

  vzHolidays = () => {
    for (let year in vzHolidays) {
      for (let month in vzHolidays[year]) {
        //console.log(vzHolidays[year][month])
        vzHolidays[year][month].map(days => {
          excludeDates.push(moment(`${month}/${days}/${year}`))
        })


      }

    }
  }

  setDefaultDate = (value) => value = moment().add(1, 'days')


  findSundays = () => {
    let start = moment(),
      end = moment().add(14, 'days'),
      day = 0;


    let current = start.clone();
    if (current.day(day) >= moment()) {
      sundays.push(current.clone());
    }

    while (current.day(7 + day).isBefore(end)) {
      sundays.push(current.clone());
    }
    //console.log("sundays", sundays)

    combinedHolidays = excludeDates.concat(sundays);
    //console.log("combinedHolidays", combinedHolidays);

  }
  componentDidMount() {
    //console.log("vzHoildays", vzHolidays);
    this.vzHolidays();
    this.findSundays();

    //console.log("excludeArray", excludeDates);
  }
  handleChange = (event) => {
    if (event.target.value !== "undefined") {
      this.setState({
        // ...this.state,
        isDisabled: false
      });
    }
    else {
      this.setState({
        // ...this.state,
        isDisabled: true,
        selectedDate: null
      });
    
    }
    // console.log("isDisabled", this.state.isDisabled)
  }
  maleChecked = () => {
    this.setState({
      // ...this.state,
      maleChecked: true,
      femaleChecked: false
    })
    //console.log("maleChecked,femaleChecked", this.state.maleChecked, this.state.femaleChecked)

  }
  femaleChecked = () => {
    this.setState({
      // ...this.state,
      femaleChecked: true,
      maleChecked: false
    })
    // console.log("femaleChecked, maleChecked", this.state.femaleChecked, this.state.maleChecked)
  }

    datePickerClicked = (date) => {

    // if (event) {
    return  this.setState({
        selectedDate: date
      })
     
    // }
  }





  render() {

  

   let radioGroup = (<div>
    
    <label> <Field name="sex" type="radio" onChange={this.maleChecked} selected={this.state.maleChecked} checked={this.state.maleChecked}
          component="input" label="Male" value="Male"
        />Male</label>
        <label>
          <Field name="sex" type="radio" onChange={this.femaleChecked}
            component="input" label="Female" value="Female" selected={this.state.femaleChecked} checked={this.state.femaleChecked}
          />Female</label></div>
)

   let renderDatePicker = (props) => {
      console.log("CONTROL IN DATEPICKER")
      const nextDay = moment().add(2, 'days')
      return (
        <div className="dateContainer">
          <DatePicker {...props.input}
           disabled={props.disabled} 
           className={props.className}
            excludeDates={combinedHolidays}
             minDate={moment()} 
             dateFormat="MM/DD/YYYY" 
             onChange={(event)=>this.datePickerClicked(event)}
              value={this.state.selectedDate && this.state.selectedDate.format('MM/DD/YYYY')}
               selected={this.state.selectedDate} 
               />
          {props.touched && props.error && <span>{props.error}</span>}
        </div>

      )

    }
  

    //console.log("todays date", moment());
    let splitedNumber = contactNumber.split('');
    //console.log("contactNumber", splitedNumber)
    let first3 = splitedNumber.slice(0, 3).join('')
    //console.log("first3",first3.join(''))
    let replace1 = first3.replace(first3, "xxx-");
    //console.log("replaced", replace1)
    let next3 = splitedNumber.slice(3, 3).join('');
    let replace2 = next3.replace(next3, "xxx-");
    //console.log("replaced2", replace2)

    let transformedNumber = replace1.concat(replace2, splitedNumber.splice(6).join(''))
    //console.log("transformed", transformedNumber)
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit} >
        {this.state.maleChecked ? <Field name="username" type="text"
          component={renderField} label="Username" 
          validate={[required, maxLength15]}
        /> : null}
        <label>AccountNumber -{transformedNumber}</label>
        <Field name="email" type="email" className="quantity"
          component={renderEmailField} label="Email"
          validate={email}
          warn={aol}
        />
        {radioGroup}
        <Field name="contactNumber" type="text"
          component={renderNumberField} label="Contact number" placeholder="xxx-xxx-xxxx"
          validate={[required, phone10]} normalize={normalizePhone}
        />
        <div>

          <label>Favorite Color</label>
          <div>
            <Field name="favoriteColor" onChange={this.handleChange} component="select" xtype="select">
              <option value="undefined">Choose colors</option>
              {
                colorList.map((color, index) => {
                  return (<option key={index} value={color.color}>{color.color}</option>)
                })
              }
            </Field>
          </div>
        </div>
        <lable>
          SelectDate
        </lable>
        <Field name="date" type="text" disabled={this.state.isDisabled}  className={classes.quantity}
            component={renderDatePicker}
          />
        <div>
          <button type="submit" disabled={submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    )
  }

}

const mapStateToProps = (state) => ({
  initialValues: { username: 'Roger', sex:'Male' }  
})

export default connect(mapStateToProps, undefined)(reduxForm({
  form: 'fieldLevelValidation', //                 <------ same form name
  enableReinitialize: true,
  //keepDirtyOnReinitialize: true,
  //destroyOnUnmount: false, //        <------ preserve form data
  //forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
 
})(FieldLevelValidationForm));

// export default reduxForm({
//   form: 'fieldLevelValidation',
//   touchOnBlur: false
// })(FieldLevelValidationForm)
