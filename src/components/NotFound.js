import React from "react";
import { Link } from "react-router-dom";

import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={classes.div}>
      <h1 className={classes.h1}>Ops, nie możemy znaleźć tej strony</h1>
      <h2 className={classes.h2}>
        Wróć na{" "}
        <Link className={classes.link} to="/account">
          stronę główną
        </Link>
      </h2>
    </div>
  );
};

export default NotFound;
