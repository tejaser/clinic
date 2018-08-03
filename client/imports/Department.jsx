import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import { DepartmentCollection } from "/imports/api/DepartmentCollection";
import DepartmentCreate from "/client/imports/DepartmentCreate";

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreatingDepartment: false
    };
    this.toggleCreateState = this.toggleCreateState.bind(this);
  }
  renderDepartmentTable() {
    let department = this.props.department;
    if (department.length === 0) {
      return null;
    } else {
      return department.map((dept, index) => (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{dept.name}</td>
          <td>{dept.counter}</td>
        </tr>
      ));
    }
  }
  renderCreateDepartmentArea() {
    if (!this.state.isCreatingDepartment) {
      return (
        <button
          className="btn btn-primary"
          onClick={e => {
            e.preventDefault();
            this.setState({
              isCreatingDepartment: true
            });
          }}
        >
          Add Department <i className="fa fa-plus" />
        </button>
      );
    } else {
      return <DepartmentCreate handler={this.toggleCreateState} />;
    }
  }
  toggleCreateState(e) {
    // e.preventDefault();
    let toggle = !this.state.isCreatingDepartment;
    this.setState({ isCreatingDepartment: toggle });
  }

  render() {
    return (
      <div role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3">
        <h1>Department Page</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin">Dashboard</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Department
            </li>
          </ol>
        </nav>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Department</th>
              <th scope="col">Size</th>
            </tr>
          </thead>
          <tbody>{this.renderDepartmentTable()}</tbody>
        </table>
        {this.renderCreateDepartmentArea()}
      </div>
    );
  }
}

export default withTracker(props => {
  let departmentSubscription = Meteor.subscribe("DepartmentCollection");
  const loading = departmentSubscription
    ? !departmentSubscription.ready()
    : true;

  return { loading, department: DepartmentCollection.find().fetch() };
})(Department);
