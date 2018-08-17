import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

class Clients extends Component {
  constructor(props) {
    super(props);
  }
  renderClientsTable() {
    let clients = this.props.clients;
    // console.log(clients);
    if (clients.length === 0) {
      return null;
    } else {
      return clients.map((client, index) => (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{client.profile.first_name}</td>
          <td>{client.profile.last_name}</td>
        </tr>
      ));
    }
  }

  render() {
    if (!this.props.loading) {
      return (
        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3">
          <h1>Clients Page</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Clients
              </li>
            </ol>
          </nav>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
              </tr>
            </thead>
            <tbody>{this.renderClientsTable()}</tbody>
          </table>
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

export default withTracker(props => {
  let clientsSubscription = Meteor.subscribe("allClients");
  let rolesSubscriptioin = Meteor.subscribe("allRoles");

  const eachReady = clientsSubscription.ready() && rolesSubscriptioin.ready();

  const loading = eachReady ? !eachReady : true;

  return {
    loading,
    clients: Roles.getUsersInRole("client").fetch()
  };
})(Clients);
