import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  componentDidMount() {
    $.fn.extend({
      animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
          var animations = {
            animation: "animationend",
            OAnimation: "oAnimationEnd",
            MozAnimation: "mozAnimationEnd",
            WebkitAnimation: "webkitAnimationEnd"
          };

          for (var t in animations) {
            if (el.style[t] !== undefined) {
              return animations[t];
            }
          }
        })(document.createElement("div"));

        this.addClass("animated " + animationName).one(
          animationEnd,
          function() {
            $(this).removeClass("animated " + animationName);

            if (typeof callback === "function") callback();
          }
        );

        return this;
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { username, password } = this.state;
    let history = this.props.history;
    Meteor.loginWithPassword(username, password, function(error) {
      if (error) {
        $("#inputLogin").animateCss("shake");
        Bert.alert({
          title: "Error",
          message: error.reason,
          type: "danger",
          style: "growl-top-right",
          icon: "fa-times"
        });
      } else {
        Bert.alert({
          title: "Successful",
          message: "Welcome, " + Meteor.user().profile.first_name + " !",
          type: "success",
          style: "growl-top-right",
          icon: "fa-user"
        });
        history.push("/admin");
      }
    });
  }
  render() {
    return (
      <div className="text-center" id="inputLogin">
        <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
          <img
            className="mb-4"
            src="/bootstrap-solid.svg"
            alt
            width={72}
            height={72}
          />
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Username
          </label>
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
            autoComplete="off"
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
