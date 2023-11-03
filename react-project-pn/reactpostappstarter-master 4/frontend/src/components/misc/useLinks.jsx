import useBoundStore from "../../store/Store";
import classes from "./Navbar.module.css";
import { useState, useEffect } from "react";
import React from "react";
import { DrawerContext } from "../../Contexts/drawerContext";
import { NavLink } from "react-router-dom";

export default () => {
  const { logoutService, user } = useBoundStore((state) => state);
  const { close } = React.useContext(DrawerContext);

  const handleClick = (action) => {
    close();
    if (action) action();
  };

  // I've added keys to the array so get rid of the keys missing warning
  const items = !user
    ? [
        <NavLink key={"home"} onClick={handleClick} className={classes.link} end to="/">
          Home
        </NavLink>,
        <NavLink key={"login"} onClick={handleClick} className={classes.link} to="/login">
          Login
        </NavLink>,
      ]
    : [
        <NavLink key={"posts"} onClick={handleClick} className={classes.link} end to="/posts">
          Posts
        </NavLink>,
        <NavLink key={"create"} onClick={handleClick} className={classes.link} end to="/posts/create">
          Create
        </NavLink>,
        <NavLink key={"logout"} onClick={() => handleClick(logoutService)} className={classes.link} to="/">
          Logout
        </NavLink>,
      ];
  return [items];
};
