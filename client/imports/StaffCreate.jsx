import React, { Component } from "react";

export default class StaffCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      department: ""
    };
  }
  handleStaffSubmit(e) {
    e.preventDefault();
    let newStaff = this.state;
    console.log(newStaff);
    Meteor.call("staff.insert", newStaff, function(error) {
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
          message:
            newStaff.firstName +
            " " +
            newStaff.lastName +
            " has been added to staff.",
          type: "success",
          style: "growl-top-right",
          icon: "fa-user"
        });
      }
    });
    this.props.handler();
  }
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Add new Staff Member</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Please fill in the detail and click save
              </h6>
              <form
                id="createStaffForm"
                onSubmit={this.handleStaffSubmit.bind(this)}
              >
                <div className="form-group">
                  <label htmlFor="firstNameInput">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstNameInput"
                    placeholder="Enter First Name here."
                    value={this.state.first_name}
                    onChange={e => {
                      e.preventDefault();
                      this.setState({ first_name: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastNameInput">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastNameInput"
                    placeholder="Enter Last Name here."
                    value={this.state.last_name}
                    onChange={e => {
                      e.preventDefault();
                      this.setState({ last_name: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="departmentInput">Department Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="departmentInput"
                    placeholder="Enter Department here."
                    value={this.state.department}
                    onChange={e => {
                      e.preventDefault();
                      this.setState({ department: e.target.value });
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
