import React, { Component } from "react";
import Select from "react-select";

export default class UsersCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      department: "",
      dept_id: "",
      email_id: ""
    };
  }
  handleUsersSubmit(e) {
    e.preventDefault();
    let newUser = this.state;
    // console.log(newUser);
    Meteor.call("user.insert", newUser, function(error) {
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
          message: newUser.name + " is added to Users List.",
          type: "success",
          style: "growl-top-right",
          icon: "fa-user"
        });
      }
    });
    this.props.handler();
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
        <div className="col">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Add new Users</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Please fill in the detail and click save
              </h6>
              <form onSubmit={this.handleUsersSubmit.bind(this)}>
                <div className="form-group">
                  <label htmlFor="userInput">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userInput"
                    placeholder="Enter First name."
                    value={this.state.first_name}
                    onChange={e => {
                      e.preventDefault();
                      this.setState({ first_name: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="userInput">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userInput"
                    placeholder="Enter Last name."
                    value={this.state.last_name}
                    onChange={e => {
                      e.preventDefault();
                      this.setState({ last_name: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="userInput">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userInput"
                    placeholder="Enter user name."
                    value={this.state.username}
                    onChange={e => {
                      e.preventDefault();
                      this.setState({ username: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
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
                <div className="form-group">
                  <label htmlFor="userInput">Email Id</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userInput"
                    placeholder="Enter Email Id."
                    value={this.state.email_id}
                    onChange={e => {
                      e.preventDefault();
                      this.setState({ email_id: e.target.value });
                    }}
                  />
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
