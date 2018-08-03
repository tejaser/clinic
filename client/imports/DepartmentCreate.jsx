import React, { Component } from "react";

export default class DepartmentCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  handleDepartmentSubmit(e) {
    e.preventDefault();
    let newDepartment = this.state;
    // console.log(newDepartment);
    Meteor.call("department.insert", newDepartment, function(error) {
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
          message: newDepartment.name + " is added to Departments.",
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
              <h5 className="card-title">Add new Department</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Please fill in the detail and click save
              </h6>
              <form onSubmit={this.handleDepartmentSubmit.bind(this)}>
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
                      this.setState({ name: e.target.value });
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
