import React from "react";
import { Route, Redirect } from "react-router-dom";

const Authenticated = ({
  loggingIn,
  authenticated,
  component,
  user,
  path,
  ...rest
}) => (
  <Route
    {...rest}
    path={path}
    render={props => {
      if (loggingIn) return <div />;
      return authenticated ? (
        React.createElement(component, {
          ...props,
          loggingIn,
          authenticated
        })
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);

export default Authenticated;
