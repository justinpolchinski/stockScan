import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Stocks from "./pages/Stocks";
import Nav from "./components/Nav";
import Home from "./pages/home";
import Signup from "./pages/signup";
import singleStock from "./pages/singleStock";
//import LineExample from "./components/chart/chart.js";

const App = () => (
  <Router>
    <div>
      <Route  path ="*" component={Nav}/>
      <Route exact path = "/" component={Home}/>
      <Route path="/stocks" component={Stocks}/>
      <Route exact path="/signup" component={Signup}/>
      <Route path="/individual" component={singleStock}/>
      
      
    </div>
  </Router>
);

export default App;
