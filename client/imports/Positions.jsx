import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import { PositionsCollection } from "/imports/api/PositionsCollection";
import PositionsCreate from "/client/imports/PositionsCreate";

class Positions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreatingPositions: false
    };
    this.toggleCreateState = this.toggleCreateState.bind(this);
  }
  renderPositionsTable() {
    let positions = this.props.positions;
    if (positions.length === 0) {
      return null;
    } else {
      return positions.map((position, index) => (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{position.name}</td>
          <td>{position.counter}</td>
        </tr>
      ));
    }
  }

  toggleCreateState(e) {
    // e.preventDefault();
    let toggle = !this.state.isCreatingDepartment;
    this.setState({ isCreatingDepartment: toggle });
  }

  renderCreatePositionsArea() {
    if (!this.state.isCreatingPositions) {
      return (
        <button
          className="btn btn-primary"
          onClick={e => {
            e.preventDefault();
            this.setState({
              isCreatingPositions: true
            });
          }}
        >
          Add Position <i className="fa fa-plus" />
        </button>
      );
    } else {
      return <PositionsCreate handler={this.toggleCreateState} />;
    }
  }

  render() {
    return (
      <div role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3">
        <h1>Positions Page</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin">Dashboard</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Positions
            </li>
          </ol>
        </nav>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Size</th>
            </tr>
          </thead>
          <tbody>{this.renderPositionsTable()}</tbody>
        </table>
        {this.renderCreatePositionsArea()}
      </div>
    );
  }
}

export default withTracker(props => {
  let positionsSubscription = Meteor.subscribe("PositionsCollection");
  const loading = positionsSubscription ? !positionsSubscription.ready() : true;

  return { loading, positions: PositionsCollection.find().fetch() };
})(Positions);
