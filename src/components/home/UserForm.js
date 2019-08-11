import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { Flag } from 'semantic-ui-react';
import moment from 'moment';
import faker from 'faker';
import DatePicker from '../core/Datapicker';
import Dropdown from '../core/Dropdown';
import { Title, Sex, Nationality } from '../../helper/data';
import './UserForm.css';

export class UserForm extends Component {
  state = {
    citizanId1: '',
    citizanId2: '',
    citizanId3: '',
    citizanId4: '',
    citizanId5: '',
    firstName: '',
    gender: '',
    lastName: '',
    nationality: '',
    passport: '',
    phoneEnd: '',
    phoneFront: '+66',
    salary: '',
    title: 'Mr.',
    dob: new Date(),
    isEdit: false
  };

  setDefaultState() {
    this.setState({
      citizanId1: '',
      citizanId2: '',
      citizanId3: '',
      citizanId4: '',
      citizanId5: '',
      firstName: '',
      gender: '',
      lastName: '',
      nationality: '',
      passport: '',
      phoneEnd: '',
      phoneFront: '+66',
      salary: '',
      title: 'Mr.',
      dob: new Date()
    });
    this.props.initialize({
      phoneFront: '+66',
      title: 'Mr.'
    });
  }

  componentDidMount() {
    this.setDefaultState();
    var container = this.refs.Progress1;
    container.onkeyup = e => {
      var target = e.srcElement;
      var maxLength = parseInt(target.attributes['maxlength'].value, 10);
      var myLength = target.value.length;
      if (myLength >= maxLength) {
        var next = target;
        while ((next = next.parentNode.parentNode.nextElementSibling)) {
          if (next == null) break;
          if (
            next.childNodes[1].childNodes[0].tagName.toLowerCase() === 'input'
          ) {
            next.childNodes[1].childNodes[0].focus();
            break;
          }
        }
      }
    };
  }

  maxLengthCheck = object => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  renderError({ error, touched }) {
    if (touched && error)
      return <div className="ui left pointing red basic label">{error}</div>;
  }

  renderCheckBox = ({ input, label, options, keyState, stateValue }) => {
    return (
      <div className="inline fields" style={{ marginLeft: '10px' }}>
        <label>{label}</label>
        {options.map((option, i) => {
          return (
            <div className="field" key={i}>
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  {...input}
                  value={option}
                  checked={stateValue === option ? true : false}
                  onChange={e =>
                    this.setState({ [keyState]: e.currentTarget.value })
                  }
                />
                <label style={{ textTransform: 'capitalize' }}>{option}</label>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  renderInput = ({
    input,
    label,
    placeholder,
    type,
    meta,
    request,
    backLabel,
    keyState,
    stateValue,
    maxLength,
    sizeWidth,
    min
  }) => {
    const className = `inline fields ${
      meta.error && meta.touched ? 'error' : ''
    }`;
    return (
      <div className={className} style={{ marginLeft: '10px' }}>
        <label>
          {label}&nbsp;&nbsp;
          <span style={{ color: 'red' }}>{request ? '*' : ''}</span>
        </label>
        <div className="field">
          <input
            {...input}
            type={type}
            placeholder={placeholder}
            onChange={e => this.setState({ [keyState]: e.target.value })}
            value={stateValue}
            maxLength={maxLength ? maxLength : null}
            style={{ width: sizeWidth ? sizeWidth : '100%' }}
            min={min}
            onInput={
              type === 'number' && maxLength ? this.maxLengthCheck : null
            }
          />
        </div>
        {backLabel ? backLabel : ''}
        {this.renderError(meta)}
      </div>
    );
  };

  renderSelectIcon = ({
    keyState,
    input,
    label,
    meta,
    option,
    placeholder,
    stateValue,
    sizeWidth,
    request
  }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className="inline fields" style={{ marginLeft: '10px' }}>
        <label>
          {label}&nbsp;&nbsp;
          <span style={{ color: 'red' }}>{request ? '*' : ''}</span>
        </label>
        <div className={className}>
          <Dropdown
            input={input}
            option={Nationality.filter(value => value.phone !== '')
              .sort((a, b) => a.phone - b.phone)
              .map((value, i) => {
                return {
                  key: i,
                  value: value.phone,
                  text: (
                    <span>
                      <Flag name={value.icon} /> {value.phone}
                    </span>
                  )
                };
              })}
          />
        </div>
        {this.renderError(meta)}
      </div>
    );
  };

  renderSelect = ({
    keyState,
    input,
    label,
    meta,
    option,
    placeholder,
    stateValue,
    sizeWidth,
    request
  }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className="inline fields" style={{ marginLeft: '10px' }}>
        <label>
          {label}&nbsp;&nbsp;
          <span style={{ color: 'red' }}>{request ? '*' : ''}</span>
        </label>
        <div className={className}>
          <select
            {...input}
            onChange={e => this.setState({ [keyState]: e.target.value })}
            disabled={option.length ? false : true}
            value={stateValue}
            style={{ width: sizeWidth ? sizeWidth : '100%' }}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {option.sort().map((value, i) => (
              <option value={value} key={i}>
                {value}
              </option>
            ))}
          </select>
        </div>
        {this.renderError(meta)}
      </div>
    );
  };

  onRandom = () => {
    const phoneArr = Nationality.filter(value => value.phone !== '').map(
      value => value.phone
    );
    const nationalityArr = Nationality.filter(
      value => value.nationality !== ''
    ).map(value => value.nationality);
    const gender = Sex[Math.floor(Math.random() * Sex.length)];
    const phoneFront = phoneArr[Math.floor(Math.random() * phoneArr.length)];
    const nationality =
      nationalityArr[Math.floor(Math.random() * nationalityArr.length)];
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const phoneEnd = faker.phone
      .phoneNumberFormat()
      .replace('-', '')
      .replace('-', '');
    const tilte = Title[Math.floor(Math.random() * Title.length)];
    const citizanId1 = faker.random.number(9).toString();
    const citizanId2 = faker.random.number(9999).toString();
    const citizanId3 = faker.random.number(99999).toString();
    const citizanId4 = faker.random.number(99).toString();
    const citizanId5 = faker.random.number(9).toString();
    const salary = faker.random.number(1000000).toString();
    let dob = faker.date.past();
    this.setState({
      citizanId1: citizanId1,
      citizanId2: citizanId2,
      citizanId3: citizanId3,
      citizanId4: citizanId4,
      citizanId5: citizanId5,
      firstName: firstName,
      gender: gender,
      lastName: lastName,
      nationality: nationality,
      phoneEnd: phoneEnd,
      phoneFront: phoneFront,
      salary: salary,
      title: tilte,
      dob: new Date(dob)
    });
    this.props.initialize({
      citizanId1: citizanId1,
      citizanId2: citizanId2,
      citizanId3: citizanId3,
      citizanId4: citizanId4,
      citizanId5: citizanId5,
      firstName: firstName,
      gender: gender,
      lastName: lastName,
      nationality: nationality,
      phoneEnd: phoneEnd,
      phoneFront: phoneFront,
      salary: salary,
      title: tilte,
      dob: moment(dob).format('YYYY-MM-DD')
    });
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
    this.setDefaultState();
  };

  render() {
    return (
      <section className="user-form">
        <div className="ui attached segment" style={{ paddingTop: '50px' }}>
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className="ui form error"
          >
            <div className="fields">
              <Field
                name="title"
                component={this.renderSelect}
                option={Title}
                keyState="title"
                stateValue={this.state.title}
                placeholder="Select"
                label="Title"
                sizeWidth="80px"
                request
              />
              <Field
                name="firstName"
                component={this.renderInput}
                label="Firstname"
                keyState="firstName"
                stateValue={this.state.firstName}
                request
              />
              <Field
                name="lastName"
                component={this.renderInput}
                label="Lastname"
                keyState="lastName"
                stateValue={this.state.lastName}
                request
              />
            </div>
            <div className="fields">
              <Field
                label="Birthday"
                name="dob"
                normalize={value =>
                  value ? moment(value).format('YYYY-MM-DD') : null
                }
                component={DatePicker}
                stateValue={this.state.dob}
                request
              />
              <Field
                name="nationality"
                component={this.renderSelect}
                option={Nationality.filter(
                  value => value.nationality !== ''
                ).map(value => value.nationality)}
                placeholder="- - Please Select - -"
                keyState="nationality"
                stateValue={this.state.nationality}
                label="Nationality"
              />
            </div>
            <div className="fields" ref="Progress1">
              <Field
                name="citizanId1"
                component={this.renderInput}
                label="Citizan ID"
                keyState="citizanId1"
                stateValue={this.state.citizanId1}
                maxLength="1"
                sizeWidth="40px"
                type="number"
              />
              <Field
                name="citizanId2"
                component={this.renderInput}
                label="-"
                keyState="citizanId2"
                stateValue={this.state.citizanId2}
                maxLength="4"
                sizeWidth="65px"
                type="number"
              />
              <Field
                name="citizanId3"
                component={this.renderInput}
                label="-"
                keyState="citizanId3"
                stateValue={this.state.citizanId3}
                maxLength="5"
                sizeWidth="70px"
                type="number"
              />
              <Field
                name="citizanId4"
                component={this.renderInput}
                label="-"
                keyState="citizanId4"
                stateValue={this.state.citizanId4}
                maxLength="2"
                sizeWidth="45px"
                type="number"
              />
              <Field
                name="citizanId5"
                component={this.renderInput}
                label="-"
                keyState="citizanId5"
                stateValue={this.state.citizanId5}
                maxLength="1"
                sizeWidth="40px"
                type="number"
              />
            </div>
            <div className="fields">
              <Field
                name="gender"
                component={this.renderCheckBox}
                label="Gender"
                options={Sex}
                keyState="gender"
                stateValue={this.state.gender}
              />
            </div>
            <div className="fields">
              <Field
                name="phoneFront"
                component={this.renderSelectIcon}
                option={Nationality.filter(value => value.phone !== '').map(
                  value => value.phone
                )}
                placeholder="Select"
                keyState="phoneFront"
                stateValue={this.state.phoneFront}
                label="Mobile Phone"
                request
                sizeWidth="100px"
              />
              <Field
                name="phoneEnd"
                component={this.renderInput}
                label="-"
                keyState="phoneEnd"
                type="number"
                stateValue={this.state.phoneEnd}
              />
            </div>
            <div className="fields">
              <Field
                name="passport"
                component={this.renderInput}
                label="Passport No"
                keyState="passport"
                stateValue={this.state.passport}
              />
            </div>
            <div className="fields">
              <Field
                name="salary"
                component={this.renderInput}
                label="Expected Salary"
                keyState="salary"
                stateValue={this.state.salary}
                request
                backLabel="THB"
                type="number"
                min="1"
              />
            </div>
            <div
              className="ui primary basic button random"
              onClick={() => this.onRandom()}
            >
              Random
            </div>
            <button className="ui button primary submit">SUBMIT</button>
          </form>
        </div>
      </section>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.firstName) {
    errors.firstName = 'This is a required field.';
  }

  if (!formValues.lastName) {
    errors.lastName = 'This is a required field.';
  }

  if (!formValues.title) {
    errors.title = 'This is a required field.';
  }

  if (!formValues.phoneFront) {
    errors.phoneFront = 'This is a required field.';
  }

  if (!formValues.phoneEnd) {
    errors.phoneEnd = 'This is a required field.';
  }

  if (!formValues.salary) {
    errors.salary = 'This is a required field.';
  }

  if (!formValues.dob) {
    errors.dob = 'This is a required field.';
  }

  return errors;
};

const afterSubmit = (result, dispatch) => {
  dispatch(reset('userForm'));
};

export default reduxForm({
  form: 'userForm',
  onSubmitSuccess: afterSubmit,
  validate
})(UserForm);
