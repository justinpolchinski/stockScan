import React from "react";
import logo from "./stocklogo.PNG";
import "./nav.css";
import Home2Btn from "../home2Btn";



const Nav = () => (
  <nav className={"navbar navbar-dark bg-dark navbar-custom"}>
  <a className="navbar-brand" href="/">
  <img src={logo} className="App-logo" alt="logo" />
</a>
  <Home2Btn/>
  </nav>
);

export default Nav;