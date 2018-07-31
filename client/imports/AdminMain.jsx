import React, { Component } from "react";
import Header from "/client/imports/Header";
import Dashboard from "/client/imports/Dashboard";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";

export default class AdminMain extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/admin" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
