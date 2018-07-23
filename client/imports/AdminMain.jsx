import React, { Component } from "react";
import Header from "/client/imports/Header";
import Dashboard from "/client/imports/Dashboard";

export default class AdminMain extends Component {
  render() {
    return (
      <div>
        <Header />
        <Dashboard />
      </div>
    );
  }
}
