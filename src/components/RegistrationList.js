import React, { useEffect, useState } from "react";

import NavLogin from "./Navbar/NavLogin";
import classes from "./RegistrationList.module.css";

import { db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

const RegistrationList = () => {
  const [registration, setRegistration] = useState([]);

  const { user } = UserAuth();

  useEffect(() => {
    fetchRegistration();
  }, []);

  const fetchRegistration = () => {
    const q = query(collection(db, `users/${user?.email}/registrationList`));
    onSnapshot(q, (querySnapshot) => {
      let registrationsArr = [];
      querySnapshot.forEach((doc) => {
        registrationsArr.push({ ...doc.data(), id: doc.id });
      });
      setRegistration(registrationsArr);
    });
  };

  registration.sort((a, b) => b.dateToSort - a.dateToSort);

  return (
    <div>
      <NavLogin />
      <div className={classes.main}>
        <div>
          <h1 className={classes.h1}>Twoje zgłoszenia</h1>
        </div>
        <div>
          <ul>
            {registration.map((doc) => (
              <div className={classes.mapDiv} key={doc.id}>
                <p>
                  <strong>Nr zgłoszenia:</strong> {doc.id}
                </p>
                <p>
                  <strong>Miejsce pracy urządzenia:</strong> {doc.place}
                </p>
                <p>
                  <strong>Nazwa urządzenia:</strong> {doc.name}
                </p>
                <p>
                  <strong>Numer seryjny:</strong> {doc.sn}
                </p>
                <p>
                  <strong>Numer unikatowy:</strong> {doc.nu}
                </p>
                <p>
                  <strong>Opis usterki:</strong> {doc.desc}
                </p>
                <p>
                  <strong>Data utworzenia zgłoszenia: {doc.createDate}</strong>
                </p>
              </div>
            ))}
          </ul>
        </div>
        {registration.length < 1 && (
          <div>
            <p>Nie masz jeszcze żadnego zgłoszenia</p>
          </div>
        )}
        <div>
          <button
            onClick={() => {
              fetchRegistration();
            }}
            className={classes.reload_btn}
          >
            Odśwież listę zgłoszeń
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationList;
