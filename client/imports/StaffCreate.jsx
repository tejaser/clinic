import React, { Component } from "react";
import Select from "react-select";

export default class StaffCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      department: "",
      deptId: "",
      position: "",
      posId: ""
    };
  }
  handleStaffSubmit(e) {
    e.preventDefault();
    let newStaff = this.state;
    // console.log(newStaff);
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
            newStaff.first_name +
            " " +
            newStaff.last_name +
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
    let depts = this.props.departments.map((dept, index) => {
      return { label: dept.name, value: dept._id };
    });
    let pos = this.props.positions.map((pos, index) => {
      return { label: pos.name, value: pos._id };
    });
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
                  <Select
                    name="form-dept-select"
                    options={pos}
                    defaultValue={{ label: "Select Position", value: 0 }}
                    onChange={e => {
                      this.setState({
                        position: e.label,
                        posId: e.value
                      });
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
