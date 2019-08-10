import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchUsers,
  addUser,
  deleteUser,
  editUser
} from '../reducers/userReducer';
import uuid from 'uuid/v1';
import './App.css';
import UserForm from './home/UserForm';
import UserLists from './home/UserLists';

export class App extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  onSubmit = formValues => {
    const newUsers = this.props.users;
    formValues.id = uuid();
    newUsers.push(formValues);
    // Add new user
    this.props.addUser(newUsers);
    localStorage.setItem('Users', JSON.stringify(newUsers));
  };

  render() {
    return (
      <div className="ui container">
        <UserForm onSubmit={this.onSubmit} />
        <UserLists
          users={this.props.users}
          deleteUser={this.props.deleteUser}
          editUser={this.props.editUser}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.data.users
  };
};

export default connect(
  mapStateToProps,
  { fetchUsers, addUser, deleteUser, editUser }
)(App);
