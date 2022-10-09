import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavLogin from "./Navbar/NavLogin";
import classes from "./AddRegistration.module.css";

import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, collection, addDoc } from "firebase/firestore";

const AddRegistration = () => {
  const [Place, setPlace] = useState("");
  const [Name, setName] = useState("");
  const [SN, setSN] = useState("");
  const [NU, setNU] = useState("");
  const [desc, setDesc] = useState("");

  const { user } = UserAuth();
  const navigate = useNavigate();

  const saveRegistration = async (place, name, sn, nu, desc) => {
    const registrationPath = doc(db, "users", `${user?.email}`);

    const getCustomDate = () => {
      const addZero = (i) => {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      };
      const d = new Date();
      let year = d.getFullYear();
      let month = addZero(d.getMonth() + 1);
      let day = addZero(d.getDate());
      let hour = addZero(d.getHours());
      let minute = addZero(d.getMinutes());
      let second = addZero(d.getSeconds());
      const time =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      return time;
    };
    const createDate = getCustomDate();

    const dateToSort = Number(new Date());

    const coll = collection(registrationPath, "registrationList");

    addDoc(coll, {
      place: place,
      name: name,
      sn: sn,
      nu: nu,
      desc: desc,
      createDate: createDate,
      dateToSort: dateToSort,
    });
  };

  const registrationHandle = async (e) => {
    e.preventDefault();
    try {
      saveRegistration(Place, Name, SN, NU, desc);
      setPlace("");
      setName("");
      setSN("");
      setNU("");
      setDesc("");
      navigate("/your-registration");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <NavLogin />
      <div className={classes.main}>
        <div>
          <h1 className={classes.h1}>Dodaj zgłoszenie</h1>
        </div>
        <form className={classes.form} onSubmit={registrationHandle}>
          <div className={classes.formDiv}>
            <label className={classes.label}>Miejsce pracy urządzenia:</label>
            <input
              onChange={(e) => setPlace(e.target.value)}
              className={classes.input}
              type="text"
              value={Place}
              required
            />
          </div>
          <div className={classes.formDiv}>
            <label className={classes.label}>Nazwa urządznia:</label>
            <input
              onChange={(e) => setName(e.target.value)}
              className={classes.input}
              type="text"
              value={Name}
              required
            />
          </div>
          <div className={classes.formDiv}>
            <label className={classes.label}>Numer seryjny:</label>
            <input
              onChange={(e) => setSN(e.target.value)}
              className={classes.input}
              type="text"
              value={SN}
              required
            />
          </div>
          <div className={classes.formDiv}>
            <label className={classes.label}>Numer unikatowy:</label>
            <input
              onChange={(e) => setNU(e.target.value)}
              className={classes.input}
              type="text"
              value={NU}
              required
            />
          </div>
          <div className={classes.formDiv}>
            <label className={classes.label}>Opis usterki:</label>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              className={classes.textarea}
              type="text"
              value={desc}
            />
          </div>
          <div className={classes.flex}>
            <button className={classes.send_btn}>Utwórz zgłoszenie</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRegistration;
