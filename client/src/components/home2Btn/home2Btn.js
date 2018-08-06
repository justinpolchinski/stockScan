import React from "react";
import Label from 'react-bootstrap/lib/Label';
import "../DeleteBtn/DeleteBtn.css";
var myHome2=(event)=>{
  
    console.log("Home2 page");
    window.location.href = "/home2";
  }
  

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Home2Btn = props => (
<div>
<a className="navbar-brand" href="/home2">
  <span className="btn btn-success singleStock" >
    News and Tweets
  </span>
</a>
{ (sessionStorage.id!=null)?(
<a className="navbar-brand" href="/stocks">
  <span className="btn btn-success singleStock" >
    My Stocks
  </span>
</a>

):(<a className="navbar-brand" href="/">
    <span className="btn btn-success singleStock" >
    Login
    </span>
    </a>)
}
</div>
);

export default Home2Btn;