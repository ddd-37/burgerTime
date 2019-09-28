import React from "react";
import classes from "./SideDrawerToggle.module.css";

const sideDrawerToggle = props => (
  <div className={classes.SideDrawerToggle} onClick={props.click}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default sideDrawerToggle;
