import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "/client/imports/Header";
import Sidebar from "/client/imports/Sidebar";
import Dashboard from "/client/imports/Dashboard";
import Staff from "/client/imports/Staff";
import Department from "/client/imports/Department";
import Positions from "/client/imports/Positions";
import Users from "/client/imports/Users";
import NotFound from "./NotFound";

export default class AdminMain extends Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <div>
        <Header />
        <p className="visible-xs">
          <button
            type="button"
            className="btn btn-primary btn-xs"
            data-toggle="offcanvas"
            onClick={e => {
              e.preventDefault();
              $(".row-offcanvas").toggleClass("active");
            }}
          >
            <i className="fa fa-align-left" />
          </button>
        </p>
        <div className="container-fluid">
          <div className="row row-offcanvas row-offcanvas-left">
            <Sidebar />
            <Switch>
              <Route exact path="/admin" component={Dashboard} />
              <Route exact path="/admin/department" component={Department} />
              <Route exact path="/admin/positions" component={Positions} />
              <Route exact path="/admin/staff" component={Staff} />
              <Route exact path="/admin/users" component={Users} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
