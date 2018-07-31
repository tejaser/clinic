import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "/client/imports/Header";
import Sidebar from "/client/imports/Sidebar";
import Dashboard from "/client/imports/Dashboard";
import NotFound from "./NotFound";

export default class AdminMain extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <Switch>
              <Route exact path="/admin" component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
