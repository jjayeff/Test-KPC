import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import faker from 'faker';
import DatePicker from '../core/Datapicker';
import Dropdown from '../core/Dropdown';
import { Title, Sex, Nationality } from '../../helper/data';
import './UserForm.css';

export class EditForm extends Component {
  state = {
    citizanId: '',
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
      citizanId: '',
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
  }

  componentDidUpdate() {
    if (this.props.user && !this.state.isEdit) {
      this.setState({
        citizanId: this.props.user.citizanId,
        firstName: this.props.user.firstName,
        gender: this.props.user.gender,
        lastName: this.props.user.lastName,
        nationality: this.props.user.nationality,
        phoneEnd: this.props.user.phoneEnd,
        phoneFront: this.props.user.phoneFront,
        salary: this.props.user.salary,
        title: this.props.user.title,
        passport: this.props.user.passport,
        dob: new Date(this.props.user.dob)
      });
      this.props.initialize({
        citizanId: this.props.user.citizanId,
        firstName: this.props.user.firstName,
        gender: this.props.user.gender,
        lastName: this.props.user.lastName,
        nationality: this.props.user.nationality,
        phoneEnd: this.props.user.phoneEnd,
        phoneFront: this.props.user.phoneFront,
        salary: this.props.user.salary,
        title: this.props.user.title,
        passport: this.props.user.passport,
        dob: this.props.user.dob
      });
      this.setState({ isEdit: true });
    }
  }

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
    stateValue
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
          />
        </div>
        {backLabel ? backLabel : ''}
        {this.renderError(meta)}
      </div>
    );
  };

  renderSelectIcon = (
    {
      keyState,
      input,
      label,
      meta,
      option,
      placeholder,
      stateValue,
      sizeWidth,
      request
    },
    props
  ) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className="inline fields" style={{ marginLeft: '10px' }}>
        <label>
          {label}&nbsp;&nbsp;
          <span style={{ color: 'red' }}>{request ? '*' : ''}</span>
        </label>
        <div className={className}>
          <Dropdown props={props} />
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
    const citizanId = faker.random.number(9999999999999).toString();
    const salary = faker.random.number(1000000).toString();
    let dob = faker.date.past();
    this.setState({
      citizanId: citizanId,
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
      citizanId: citizanId,
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
    this.props.onSubmit(formValues, this.props.user.id);
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
                sizeWidth="335px"
              />
            </div>
            <div className="fields">
              <Field
                name="citizanId"
                component={this.renderInput}
                label="Citizan ID"
                keyState="citizanId"
                stateValue={this.state.citizanId}
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
                component={this.renderSelect}
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

export default reduxForm({
  form: 'editForm',
  validate
})(EditForm);