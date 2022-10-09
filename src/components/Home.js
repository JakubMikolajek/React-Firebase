import React, { useState, useEffect } from "react";

import NavLogin from "./Navbar/NavLogin";
import NavLoginAdmin from "./Navbar/NavLoginAdmin";
import classes from "./Home.module.css";

import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Home = () => {
  const [userData, setUserData] = useState([]);

  const { user } = UserAuth();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", `${user.email}`));
    onSnapshot(q, (querySnapshot) => {
      let userArr = [];
      querySnapshot.forEach((doc) => {
        userArr.push({ ...doc.data() });
      });
      setUserData(userArr);
      console.log("pobrano");
    });
  };

  const role = userData.map((doc) => doc.role);

  return (
    <div>
      {role == "user" && <NavLogin />}
      {role == "admin" && <NavLoginAdmin />}
      {userData.map((doc) => (
        <div key={doc.uid}>
          <div className={classes.main}>
            <h1 className={classes.h1}>Konto</h1>
            <div>
              <p>
                <strong>Email:</strong> {doc.email}
              </p>
              <p>
                <strong>Nazwa użytkownika:</strong> {doc.name}
              </p>
              <p>
                <strong>Twoje ID:</strong> {doc.uid}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
