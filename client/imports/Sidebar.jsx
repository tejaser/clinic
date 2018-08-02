import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Sidebar extends Component {
  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar sidebar-offcanvas">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/admin">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/admin/staff">
                Staff
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="shopping-cart" />
                Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="users" />
                Customers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="bar-chart-2" />
                Reports
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="layers" />
                Integrations
              </a>
            </li>
          </ul>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Saved reports</span>
            <a className="d-flex align-items-center text-muted" href="#">
              <span data-feather="plus-circle" />
            </a>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file-text" />
                Current month
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file-text" />
                Last quarter
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file-text" />
                Social engagement
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file-text" />
                Year-end sale
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
