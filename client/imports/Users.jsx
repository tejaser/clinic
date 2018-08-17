import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import UsersCreate from "/client/imports/UsersCreate";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreatingUsers: false
    };
    this.toggleCreateState = this.toggleCreateState.bind(this);
  }
  renderUsersTable() {
    let users = this.props.users;
    console.log(users);
    if (users.length === 0) {
      return null;
    } else {
      return users.map((user, index) => (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{user.profile.first_name}</td>
          <td>{user.profile.last_name}</td>
          <td>{user.username}</td>
          <td>{user.emails[0].address}</td>
          <td>
            {user.roles.map((role, index) => (
              <div key={index}>
                <span className="badge badge-pill badge-info">{role}</span>&nbsp;
              </div>
            ))}
          </td>
        </tr>
      ));
    }
  }
  renderCreateUsersArea() {
    if (!this.state.isCreatingUsers) {
      return (
        <button
          className="btn btn-primary"
          onClick={e => {
            e.preventDefault();
            this.setState({
              isCreatingUsers: true
            });
          }}
        >
          Add Users <i className="fa fa-plus" />
        </button>
      );
    } else {
      return (
        <UsersCreate
          handler={this.toggleCreateState}
          roles={this.props.roles}
        />
      );
    }
  }
  toggleCreateState(e) {
    // e.preventDefault();
    let toggle = !this.state.isCreatingUsers;
    this.setState({ isCreatingUsers: toggle });
  }

  render() {
    if (!this.props.loading) {
      return (
        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3">
          <h1>Users Page</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Users
              </li>
            </ol>
          </nav>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email Address</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>{this.renderUsersTable()}</tbody>
          </table>
          {this.renderCreateUsersArea()}
        </div>
      );
    } else {
      return (
        <div className="col-sm-9 ml-sm-auto col-md-10 pt-3">
          <span>
            <i className="fa fa-spin"> loading .. </i>
          </span>
        </div>
      );
    }
  }
}

export default withTracker(() => {
  let usersSubscription = Meteor.subscribe("allUsers");
  let rolesSubscriptioin = Meteor.subscribe("allRoles");

  const eachReady = usersSubscription.ready() && rolesSubscriptioin.ready();
  const loading = usersSubscription ? !eachReady : true;

  return {
    loading,
    users: Meteor.users.find().fetch(),
    roles: Meteor.roles.find().fetch()
  };
})(Users);
