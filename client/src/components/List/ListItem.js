import React from "react";

export const ListItem = props => (
  <li {...props}className="list-group-item">
    {props.children}
  </li>
);
