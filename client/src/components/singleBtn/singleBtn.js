import React from "react";
import "../DeleteBtn/DeleteBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const SingleBtn = props => (
  <span className="btn btn-success" {...props}>
    More Statistics
  </span>
);

export default SingleBtn;