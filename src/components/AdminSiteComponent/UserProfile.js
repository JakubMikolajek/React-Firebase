import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import NavLoginAdmin from "../Navbar/NavLoginAdmin";
import classes from "./UserProfile.module.css";

import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const UserProfile = () => {
  const [userData, setUserData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("name", "==", `${id}`));
    onSnapshot(q, (querySnapshot) => {
      let userArr = [];
      querySnapshot.forEach((doc) => {
        userArr.push({ ...doc.data() });
      });
      setUserData(userArr);
    });
  };

  return (
    <div>
      <NavLoginAdmin />

      <div className={classes.flex}>
        {userData.map((doc) => (
          <div key={doc.name}>
            <div className={classes.main}>
              <h1 className={classes.h1}>Konto</h1>
              <div>
                <p>
                  <strong>Nazwa:</strong> {doc.name}
                </p>
                <p>
                  <strong>Email:</strong> {doc.email}
                </p>
                <p>
                  <strong>Nazwa użytkownika:</strong> {doc.name}
                </p>
              </div>
              <Link
                className={classes.link}
                to={`/user-list/${id}/registrations`}
              >
                <button className={classes.btn_small}>Zgłoszenia</button>
              </Link>
            </div>
          </div>
        ))}
        <div className={classes.flex}>
          <Link to="/user-list">
            <button className={classes.reload_btn}>
              Wróć do listy użytkowników
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
