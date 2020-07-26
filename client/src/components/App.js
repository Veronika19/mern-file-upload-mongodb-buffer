import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Listing from "./list";
import Add from "./add";
import Edit from "./edit";

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="container">
            <nav className="navbar navbar-expand-sm bg-light">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/add">
                    Add new User
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    User List
                  </Link>
                </li>
              </ul>
            </nav>
            <Route exact={true} path="/" component={Listing} />
            <Route exact={true} path="/add" component={Add} />
            <Route exact={true} path="/edit" component={Edit} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
