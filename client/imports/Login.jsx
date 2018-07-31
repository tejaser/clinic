import React, { Component } from "react";
import Alert from "react-s-alert";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/jelly.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    let { username, password } = this.state;
    let history = this.props.history;
    Meteor.loginWithPassword(username, password, function(error) {
      if (error) {
        Alert.error(error.reason, {
          effect: "jelly",
          timeout: "none"
        });
      } else {
        Alert.success(
          "Welcome Back, " + Meteor.user().profile.first_name + " !"
        );
        history.push("/admin");
      }
    });
  }
  render() {
    return (
      <div className="text-center">
        <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail">Username</label>
          <input
            type="text"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
            value={this.state.username}
            onChange={e => {
              e.preventDefault();
              this.setState({ username: e.target.value });
            }}
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
            value={this.state.password}
            onChange={e => {
              e.preventDefault();
              this.setState({ password: e.target.value });
            }}
          />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" defaultValue="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
        </form>
      </div>
    );
  }
}
export default withRouter(Login);
