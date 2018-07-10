import React from "react";
import logo from "./stocklogo.PNG";
import "./nav.css";

const Nav = () => (
  <nav className="navbar navbar-dark bg-dark navvy">
  <a className="navbar-brand" href="/">
  <img src={logo} className="App-logo" alt="logo" />
</a>
  </nav>
);

export default Nav;