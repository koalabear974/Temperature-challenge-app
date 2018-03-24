import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <nav className="Header navbar navbar-expand-lg navbar-light bg-light border-bottom mb-3">
        <Link className="navbar-brand" to="/">Temperature App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink exact className="nav-item nav-link" to="/">Temperatures</NavLink>
            <NavLink className="nav-item nav-link" to="/configuration">Configuration</NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
