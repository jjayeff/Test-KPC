import React, { Component } from 'react';
import EditUser from './EditUser';
import './UserLists.css';

export class UserLists extends Component {
  state = {
    isSelected: [],
    currentPage: 1,
    rowPerPage: 5
  };

  onSelected(checked, id) {
    if (checked) {
      const newIsSelected = this.state.isSelected;
      newIsSelected.push(id);
      this.setState({ isSelected: newIsSelected });
    } else {
      this.setState({
        isSelected: this.state.isSelected.filter(value => value !== id)
      });
    }
  }

  onSelectedAll(checked) {
    const { rowPerPage, currentPage } = this.state;
    const indexOfLast = currentPage * rowPerPage;
    const indexOfFirst = indexOfLast - rowPerPage;
    const currentUsers = this.props.users.slice(indexOfFirst, indexOfLast);
    if (checked) {
      const newIsSelected = currentUsers.map(value => value.id);
      this.setState({ isSelected: newIsSelected });
    } else {
      this.setState({
        isSelected: []
      });
    }
  }

  onDelect(id) {
    const newUsers = this.props.users.filter(value => value.id !== id);
    this.props.deleteUser(newUsers);
    localStorage.setItem('Users', JSON.stringify(newUsers));
  }

  onDelectAll() {
    const newUsers = this.props.users.filter(
      value => !this.state.isSelected.includes(value.id)
    );
    this.props.deleteUser(newUsers);
    localStorage.setItem('Users', JSON.stringify(newUsers));
    this.setState({ isSelected: [] });
  }

  renderTable() {
    if (this.props.users) {
      const { rowPerPage, currentPage } = this.state;
      const indexOfLast = currentPage * rowPerPage;
      const indexOfFirst = indexOfLast - rowPerPage;
      const currentUsers = this.props.users.slice(indexOfFirst, indexOfLast);
      return currentUsers.map((value, i) => {
        return (
          <tr key={i}>
            <td>
              <div className="ui fitted checkbox">
                <input
                  type="checkbox"
                  checked={
                    this.state.isSelected.indexOf(value.id) < 0 ? false : true
                  }
                  onChange={e => this.onSelected(e.target.checked, value.id)}
                />
                <label />
              </div>
            </td>
            <td>
              <p>
                {value.firstName} {value.lastName}
              </p>
            </td>
            <td>
              <p>{value.gender ? value.gender : '-'}</p>
            </td>
            <td>
              <p>
                ({value.phoneFront}){value.phoneEnd}
              </p>
            </td>
            <td>
              <p style={{ textTransform: 'uppercase' }}>
                {value.nationality ? value.nationality : '-'}
              </p>
            </td>
            <td style={{ textAlign: 'center' }}>
              <div className="tiny ui buttons">
                <EditUser
                  title="Edit User"
                  user={value}
                  users={this.props.users}
                  editUser={this.props.editUser}
                />
                <div className="or" />
                <button
                  className="ui red button"
                  onClick={() => this.onDelect(value.id)}
                >
                  <i className="trash alternate outline icon" />
                  Delete
                </button>
              </div>
            </td>
          </tr>
        );
      });
    }
  }

  renderPaginationCondition(countOfUsers, currentPage) {
    let content1;
    let content2;
    let content3;
    let content4;
    let content5;
    if (currentPage >= 6) {
      content1 = (
        <React.Fragment key="front-pagination">
          <div
            className="item"
            onClick={() => this.setState({ currentPage: 1 })}
          >
            1
          </div>
          <div className="disabled item">...</div>
        </React.Fragment>
      );
    }
    if (countOfUsers >= 8) {
      if (currentPage <= countOfUsers - 5)
        content5 = (
          <React.Fragment key="end-pagination">
            <div className="disabled item">...</div>
            <div
              className="item"
              onClick={() => this.setState({ currentPage: countOfUsers })}
            >
              {countOfUsers}
            </div>
          </React.Fragment>
        );
      else if (currentPage < 6)
        content5 = (
          <React.Fragment key="end-pagination">
            <div className="disabled item">...</div>
            <div
              className="item"
              onClick={() => this.setState({ currentPage: countOfUsers })}
            >
              {countOfUsers}
            </div>
          </React.Fragment>
        );
    }
    if (currentPage >= 6 && currentPage <= countOfUsers - 5) {
      content3 = Array(countOfUsers)
        .fill(0)
        .map((value, i) => {
          if (i + 1 > currentPage - 3 && i + 1 < currentPage + 3)
            return (
              <div
                className={`item ${currentPage === i + 1 ? 'active' : ''}`}
                key={i}
                onClick={() => this.setState({ currentPage: i + 1 })}
              >
                {i + 1}
              </div>
            );
        });
    }
    if (currentPage < 6) {
      content2 = Array(countOfUsers)
        .fill(0)
        .map((value, i) => {
          if (i + 1 < 8)
            return (
              <div
                className={`item ${currentPage === i + 1 ? 'active' : ''}`}
                key={i}
                onClick={() => this.setState({ currentPage: i + 1 })}
              >
                {i + 1}
              </div>
            );
        });
    } else if (currentPage > countOfUsers - 5) {
      content4 = Array(countOfUsers)
        .fill(0)
        .map((value, i) => {
          if (i + 1 >= currentPage - 2)
            return (
              <div
                className={`item ${currentPage === i + 1 ? 'active' : ''}`}
                key={i}
                onClick={() => this.setState({ currentPage: i + 1 })}
              >
                {i + 1}
              </div>
            );
        });
    }
    let contents = [content1, content2, content3, content4, content5];
    return contents;
  }

  renderPagination() {
    if (this.props.users) {
      const { rowPerPage, currentPage } = this.state;
      const countOfUsers = Math.ceil(this.props.users.length / rowPerPage);
      return (
        <div className="ui pagination menu">
          <div
            className="icon item"
            onClick={() => this.setState({ currentPage: currentPage - 1 })}
            style={currentPage <= 1 ? { display: 'none' } : null}
          >
            <i className="left chevron icon" />
          </div>
          {this.renderPaginationCondition(countOfUsers, currentPage)}
          <div
            className="icon item"
            onClick={() => this.setState({ currentPage: currentPage + 1 })}
            style={currentPage >= countOfUsers ? { display: 'none' } : null}
          >
            <i className="right chevron icon" />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <section className="user-lists">
        <div className="ui container">
          <div className="ui attached segment" style={{ overflowX: 'auto' }}>
            <div>
              <div
                className="ui checkbox"
                style={{ margin: '8px 10px 0 0', paddingTop: '6px' }}
              >
                <input
                  type="checkbox"
                  name="selectAll"
                  onChange={e => this.onSelectedAll(e.target.checked)}
                />
                <label>Select All</label>
                <button
                  className="mini ui red basic button delete-all"
                  onClick={() => this.onDelectAll()}
                >
                  Delect
                </button>
              </div>
              <div
                style={{
                  float: 'right',
                  marginBottom: '10px'
                }}
              >
                <div className="ui form">
                  <div className="inline fields">
                    <label>Rows per page</label>
                    <div className="field">
                      <select
                        onChange={e =>
                          this.setState({
                            rowPerPage: e.target.value,
                            currentPage: 1
                          })
                        }
                        value={this.state.rowPerPage}
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <table className="ui unstackable compact celled table">
              <thead>
                <tr>
                  <th />
                  <th>
                    <p>Name</p>
                  </th>
                  <th>
                    <p>Gender</p>
                  </th>
                  <th>
                    <p>Mobile Phone</p>
                  </th>
                  <th>
                    <p>Nationality</p>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>{this.renderTable()}</tbody>
              <tfoot>
                <tr>
                  <th colSpan="6" style={{ textAlign: 'center' }}>
                    {this.renderPagination()}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
    );
  }
}

export default UserLists;
