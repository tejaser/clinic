import React, { Component } from "react";
import Select from "react-select";

export default class UsersCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      confirmPassword: "",
      email_id: "",
      roles: ["client"],
      clinic: "Data Science"
    };
  }
  handleUsersSubmit(e) {
    e.preventDefault();
    // let newUser = this.state;
    if (this.state.password === this.state.confirmPassword) {
      let newUser = {
        username: this.state.username,
        email: this.state.email_id,
        password: this.state.password,
        roles: this.state.roles,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        clinic: this.state.clinic
      };
      Meteor.call("users.add", newUser, function(error) {
        if (error) {
          Bert.alert({
            title: "Error",
            message: error.reason,
            type: "danger",
            style: "growl-top-right",
            icon: "fa-times"
          });
        } else {
          Bert.alert({
            title: "Successful Add.",
            message: newUser.username + " is added to Users List.",
            type: "success",
            style: "growl-top-right",
            icon: "fa-user"
          });
        }
      });
      this.props.handler();
    } else {
      $("#createUserCard").animateCss("shake");
      Bert.alert({
        title: "Error",
        message: "Passwords do not match.",
        type: "danger",
        style: "growl-top-right",
        icon: "fa-times"
      });
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card" id="createUserCard">
            <div className="card-body">
              <h5 className="card-title">Add new Users</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Please fill in the detail and click save
              </h6>
              <form
                onSubmit={this.handleUsersSubmit.bind(this)}
                id="createUserForm"
              >
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="userInput">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        placeholder="Enter First name."
                        value={this.state.first_name}
                        onChange={e => {
                          e.preventDefault();
                          this.setState({ first_name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="userInput">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        placeholder="Enter Last name."
                        value={this.state.last_name}
                        onChange={e => {
                          e.preventDefault();
                          this.setState({ last_name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="userInput">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter user name."
                        value={this.state.username}
                        onChange={e => {
                          e.preventDefault();
                          this.setState({ username: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="userInput">Email Id</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email Id."
                        value={this.state.email_id}
                        onChange={e => {
                          e.preventDefault();
                          this.setState({ email_id: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="passwordInput">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password."
                        autoComplete="off"
                        value={this.state.password}
                        onChange={e => {
                          e.preventDefault();
                          this.setState({ password: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="cPasswordInput">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="cPasswordInput"
                        placeholder="Enter password."
                        value={this.state.confirmPassword}
                        autoComplete="off"
                        onChange={e => {
                          e.preventDefault();
                          this.setState({
                            confirmPassword: e.target.value
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button
                      type="submit"
                      className="col-md-5 col-mb-3 btn btn-primary"
                    >
                      Save
                    </button>
                    <a
                      href="#"
                      className="col-md-5 col-mb-3 card-link"
                      onClick={this.props.handler}
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
