import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import NavLoginAdmin from "../Navbar/NavLoginAdmin";
import classes from "./UserList.module.css";

import { db } from "../../firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";

const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("role", "==", "user"));
    onSnapshot(q, (querySnapshot) => {
      let userListArr = [];
      querySnapshot.forEach((doc) => {
        userListArr.push({ ...doc.data(), id: doc.id });
      });
      setUserList(userListArr);
    });
  };

  userList.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <NavLoginAdmin />
      <div className={classes.main}>
        <h1 className={classes.h1}>Lista kontrahentów:</h1>
        <ul>
          {userList.map((doc) => (
            <p key={doc.id}>
              <Link
                to={`/user-list/${doc.name}`}
                className={classes.p}
                key={doc.id}
              >
                {doc.name}
              </Link>
            </p>
          ))}
        </ul>
        {userList.length == 0 && (
          <div>
            <p>Nie zarejestrowano jeszcze żadnego użytkownika</p>
          </div>
        )}
        <div className={classes.btnDiv}>
          <button
            onClick={() => {
              fetchUserList();
            }}
            className={classes.reload_btn}
          >
            Odśwież listę użytkowników
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
