import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminMain from "/client/imports/AdminMain";

const App = props => (
  <Router>
    <Switch>
      <Route exact path="/" component={AdminMain} />
    </Switch>
  </Router>
);

export default withTracker(props => {
  const handle = Meteor.subscribe("allUsers");

  return {
    currentUser: Meteor.user(),
    loading: !handle.ready(),
    users: Meteor.users.find().fetch()
  };
})(App);
