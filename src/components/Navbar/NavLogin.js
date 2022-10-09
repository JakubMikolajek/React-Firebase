import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import classes from "./NavLogin.module.css";

import { UserAuth } from "../../context/AuthContext";

const NavLogin = () => {
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
          <NavLink to="/your-registration" className={classes.navLink}>
            Twoje zgłoszenia
          </NavLink>
        </li>
        <li className={classes.li}>
          <NavLink to="/new-registration" className={classes.navLink}>
            Zgłoś awarię
          </NavLink>
        </li>
      </ul>
      <button onClick={handleLogout} className={classes.logout_btn}>
        Wyloguj
      </button>
    </nav>
  );
};

export default NavLogin;
