import React, { Component } from "react";

import { withTracker } from "meteor/react-meteor-data";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Authenticated from "/client/imports/Authenticated";
import Landing from "/client/imports/Landing";
import AdminMain from "/client/imports/AdminMain";
import Login from "/client/imports/Login";

const App = props => (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} {...props} />
      <Authenticated path="/admin" component={AdminMain} {...props} />
    </Switch>
  </Router>
);

export default withTracker(props => {
  // const handle = Meteor.subscribe("allUsers");

  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = Roles.subscription ? !Roles.subscription.ready() : true;

  return {
    loggingIn,
    loading,
    user,
    userId,
    authenticated: !loggingIn & !!userId,
    roles: !loading && Roles.getRolesForUser(userId)
    // user: Meteor.user(),
    // loading: !handle.ready(),
    // users: Meteor.users.find().fetch
  };
})(App);
