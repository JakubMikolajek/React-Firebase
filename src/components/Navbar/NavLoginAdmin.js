import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import classes from "./NavLoginAdmin.module.css";

import { UserAuth } from "../../context/AuthContext";

const NavLoginAdmin = () => {
  const { logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      sessionStorage.clear();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <nav className={classes.nav}>
      <ul className={classes.ul}>
        <li className={classes.li}>
          <NavLink to="/account" className={classes.navLink}>
            Konto
          </NavLink>
        </li>
        <li className={classes.li}>
          <NavLink to="/user-list" className={classes.navLink}>
            Kontrahenci
          </NavLink>
        </li>
      </ul>
      <button onClick={handleLogout} className={classes.logout_btn}>
        Wyloguj
      </button>
    </nav>
  );
};

export default NavLoginAdmin;
