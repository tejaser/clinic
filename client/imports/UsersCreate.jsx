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
      department: "",
      deptId: "",
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
        department: this.state.department,
        roles: this.state.roles,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        clinic: this.state.clinic
      };
      console.log(newUser);
      Meteor.call("user.add", newUser, function(error) {
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
    let depts = this.props.departments.map((dept, index) => {
      return {
        label: dept.name,
        value: dept._id
      };
    });

    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add new Users</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Please fill in the detail and click save
              </h6>
              <form onSubmit={this.handleUsersSubmit.bind(this)}>
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
                      <label htmlFor="passwordInput">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password."
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
                        onChange={e => {
                          e.preventDefault();
                          this.setState({ confirmPassword: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="departmentSelect">Department</label>
                      <Select
                        name="form-dept-select"
                        options={depts}
                        defaultValue={{ label: "Select Department", value: 0 }}
                        onChange={e => {
                          this.setState({
                            department: e.label,
                            deptId: e.value
                          });
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
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
