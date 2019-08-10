import React, { Component } from 'react';
import Modal from '../core/Modal';
import EditForm from './EditForm';

export class EditUser extends Component {
  state = { open: false };

  close = value => this.setState({ open: value });

  onSubmit = (formValues, id) => {
    this.close(false);
    formValues.id = id;
    const newUsers = this.props.users.map(value => {
      if (formValues.id === value.id) return formValues;
      return value;
    });
    this.props.editUser(newUsers);
    localStorage.setItem('Users', JSON.stringify(newUsers));
  };

  render() {
    return (
      <Modal
        title={this.props.title}
        test={this.state.open}
        trigger={
          <button
            className="ui red basic button"
            onClick={() => this.close(true)}
          >
            <i className="edit outline icon" />
            Edit
          </button>
        }
        close={this.close}
        content={<EditForm onSubmit={this.onSubmit} user={this.props.user} />}
      />
    );
  }
}

export default EditUser;
