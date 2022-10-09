import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import NavLoginAdmin from "../Navbar/NavLoginAdmin";
import classes from "./UserRegistrations.module.css";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const UserRegistrations = () => {
  const [userData, setUserData] = useState([]);

  const [userRegistration, setUserRegistration] = useState([]);

  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    setLoading(true);
    const userRef = collection(db, "users");
    getDocs(userRef).then((response) => {
      const data = response.docs.map((doc) => ({
        name: doc.data().name,
        email: doc.data().email,
      }));
      const userData = data.filter((doc) => doc.name === id);
      setUserData(userData);
      const userIdToFetchRegistration = userData.map((user) => ({
        email: user.email,
      }));
      const userID = userIdToFetchRegistration.map((el) => el.email);
      const collectionReg = collection(db, `users/${userID}/registrationList`);
      getDocs(collectionReg).then((response) => {
        setLoading(false);
        const reg = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setUserRegistration(reg);
      });
    });
  };

  return (
    <div>
      <NavLoginAdmin />
      <div className={classes.main}>
        <div>
          <h1 className={classes.h1}>
            Zgłoszenia użytkownika: {`${userData.map((user) => user.name)}`}
          </h1>
        </div>
        <div>
          <ul>
            {userRegistration.reverse().map((list) => (
              <div className={classes.mapDiv} key={list.id}>
                <p>
                  <strong>Nr zgłoszenia:</strong> {list.id}
                </p>
                <p>
                  <strong>Miejsce pracy urządzenia:</strong> {list.data.place}
                </p>
                <p>
                  <strong>Nazwa urządzenia:</strong> {list.data.name}
                </p>
                <p>
                  <strong>Numer seryjny:</strong> {list.data.sn}
                </p>
                <p>
                  <strong>Numer unikatowy:</strong> {list.data.nu}
                </p>
                <p>
                  <strong>Opis usterki:</strong> {list.data.desc}
                </p>
                <p>
                  <strong>
                    Data utworzenia zgłoszenia: {list.data.createDate}
                  </strong>
                </p>
              </div>
            ))}
          </ul>
        </div>
        {userRegistration.length == 0 && (
          <div>
            <p>
              Użytkownik {`${userData.map((user) => user.name)}`} nie ma żadnych
              zgłoszeń
            </p>
          </div>
        )}
        <div>
          <button
            onClick={() => {
              fetchUserData();
            }}
            className={classes.reload_btn}
          >
            Odśwież listę zgłoszeń
          </button>
        </div>
        <div>
          <Link to={`/user-list/${id}`}>
            <button className={classes.back_btn}>
              Wróć do konta użytkownika {`${userData.map((user) => user.name)}`}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrations;
