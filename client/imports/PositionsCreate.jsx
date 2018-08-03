import React, { Component } from "react";
import Checkbox from "/client/imports/Checkbox";

export default class PositionsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isManagingPosition: false
    };
  }
  handlePositionsSubmit(e) {
    e.preventDefault();
    let newPosition = this.state;
    // console.log(newDepartment);
    Meteor.call("positions.insert", newPosition, function(error) {
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
          message: newPosition.name + " is added to Positions Available.",
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
              <h5 className="card-title">Add new Positions</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Please fill in the detail and click save
              </h6>
              <form onSubmit={this.handlePositionsSubmit.bind(this)}>
                <div className="form-group">
                  <label htmlFor="positionsInput">Position Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="positionsInput"
                    placeholder="Enter Position here."
                    value={this.state.name}
                    onChange={e => {
                      e.preventDefault();
                      this.setState({ name: e.target.value });
                    }}
                  />
                </div>
                <Checkbox
                  label="Managing position?"
                  handleCheckboxChange={e => {
                    let past = this.state.isManagingPosition;
                    this.setState({ isManagingPosition: !past });
                  }}
                  key="checkbox1"
                />
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
