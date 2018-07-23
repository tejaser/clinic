import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
const App = props => <h1>Test</h1>;
export default withTracker(props => {
  const handle = Meteor.subscribe("allUsers");

  return {
    currentUser: Meteor.user(),
    loading: !handle.ready(),
    users: Meteor.users.find().fetch()
  };
})(App);
