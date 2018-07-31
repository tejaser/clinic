import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
  constructor(props) {
    super(props);
  }
  getMessage() {
    if (this.props.message) {
      return (
        <div>
          <h1>404</h1>
          <br />
          <h2>{this.props.message}</h2>
        </div>
      );
    } else {
      return (
        <div>
          <h1>404</h1>
          <br />
          <h2>The Page you are looking for does not exist!</h2>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="max-auto">
            <center>
              {this.getMessage()}
              <img src="/giphy.gif" height={300} alt="404 Error Page" />
              <br />
              <br />
              <Link to="/login" className="btn btn-lg btn-primary">
                <i className="fa fa-arrow-left" />Back to Safety
              </Link>
            </center>
          </div>
        </div>
      </div>
    );
  }
}
