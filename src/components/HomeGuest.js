import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./HomeGuest.module.css";

import { UserAuth } from "../context/AuthContext";

const HomeGuest = () => {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [secret, setSecret] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { createUser, signIn } = UserAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (secret == "88pxOB2RGCtdfe2tzQeG") {
      if (password !== passwordConfirmed) {
        return alert("Podane hasła nie są takie same");
      }
      setError("");
      try {
        await createUser(email, password, name);
        setEmail("");
        setName("");
        setPassword("");
        setPasswordConfirmed("");
        setSecret("");
        alert(
          "Zarejestrowano pomyślnie. Teraz zostaniesz przekierowany do twojego konta."
        );
      } catch (e) {
        setError(e.message);
        alert(e.message);
      }
    } else {
      return alert(`Błędny kod "Secret"`);
    }
  };

  //Login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(emailLogin, passwordLogin);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      alert(e.message);
    }
  };

  if (!error) {
    console.log("Wszystko działa");
  }

  return (
    <div>
      <nav className={classes.navbar}>
        <ul className={classes.ul}>
          <form onSubmit={handleLogin} className={classes.form}>
            <input
              placeholder="Email"
              className={classes.input_login}
              type="email"
              onChange={(e) => setEmailLogin(e.target.value)}
              required
            />
            <input
              placeholder="Hasło"
              className={classes.input_login}
              type="password"
              onChange={(e) => setPasswordLogin(e.target.value)}
              required
            />
            <button className={classes.login_btn}>Zaloguj się</button>
          </form>
        </ul>
      </nav>

      <div className={classes.flex}>
        <div className={classes.register_box}>
          <div>
            <h1 className={classes.register_h1}>Załóż darmowe konto</h1>
          </div>
          <form onSubmit={handleRegister}>
            <div className={classes.form_box_reg}>
              <label className={classes.reg_label}>
                Email<span className="text-rose-700">*</span>
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className={classes.reg_input}
                type="email"
                value={email}
                required
              />
            </div>
            <div className={classes.form_box_reg}>
              <label className={classes.reg_label}>
                Nazwa<span className="text-rose-700">*</span>
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                className={classes.reg_input}
                type="Nazwa"
                value={name}
                required
              />
            </div>
            <div className={classes.form_box_reg}>
              <label className={classes.reg_label}>
                Hasło<span className="text-rose-700">*</span>
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className={classes.reg_input}
                type="password"
                value={password}
                required
              />
            </div>
            <div className={classes.form_box_reg}>
              <label className={classes.reg_label}>
                Potwierdź hasło<span className="text-rose-700">*</span>
              </label>
              <input
                onChange={(e) => setPasswordConfirmed(e.target.value)}
                className={classes.reg_input}
                type="password"
                value={passwordConfirmed}
                required
              />
            </div>
            <div className={classes.form_box_reg}>
              <label className={classes.reg_label}>
                Secret(kod służący do rejestracji)
                <span className="text-rose-700">*</span>
              </label>
              <input
                onChange={(e) => setSecret(e.target.value)}
                className={classes.reg_input}
                type="secret"
                value={secret}
                required
              />
            </div>
            <div className={classes.flex}>
              <button className={classes.reg_btn}>Zarejestruj się</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeGuest;
