import React, { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register() {
  const [response, setResponse] = useState("");
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    matchingPassword: "",
    username: "",
    validName: false,
    validPassword: false,
    validMatchingPassword: false,
    userFocus: false,
    passwordFocus: false,
    matchFocus: false,
  });

  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setRegisterData((prev) => ({
      ...prev,
      validName: USER_REGEX.test(prev.username),
    }));
  }, [registerData.username]);

  useEffect(() => {
    setRegisterData((prev) => ({
      ...prev,
      validPassword: PWD_REGEX.test(prev.password), // check password regex
      validMatchingPassword: prev.password === prev.matchingPassword, // check if password matches confirmation
    }));
  }, [registerData.password, registerData.matchingPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [
    registerData.username,
    registerData.password,
    registerData.matchingPassword,
  ]);

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !registerData.email ||
      !registerData.password ||
      !registerData.matchingPassword
    )
      return;
    const v1 = USER_REGEX.test(registerData.username);
    const v2 = PWD_REGEX.test(registerData.password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const res = await axios.post("/api/v1/users/register", {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      });
      setResponse(JSON.stringify(res.data, null, 2));
      setSuccess(true);
      setRegisterData((prev) => ({
        ...prev,
        username: "",
        password: "",
        matchingPassword: "",
      }));
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/login">Sign In</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              ref={userRef}
              value={registerData.username}
              onChange={handleChange}
              autoComplete="off"
              required
              aria-invalid={registerData.validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() =>
                setRegisterData((prev) => ({ ...prev, userFocus: true }))
              }
              onBlur={() =>
                setRegisterData((prev) => ({ ...prev, userFocus: false }))
              }
            />
            <p
              id="uidnote"
              className={
                registerData.userFocus &&
                registerData.username &&
                !registerData.validName
                  ? "instructions"
                  : "offscreen"
              }
            >
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              name="email"
              value={registerData.email}
              onChange={handleChange}
            />
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              value={registerData.password}
              type="password"
              onChange={handleChange}
              required
              aria-invalid={registerData.validPassword ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() =>
                setRegisterData((prev) => ({ ...prev, passwordFocus: true }))
              }
              onBlur={() =>
                setRegisterData((prev) => ({ ...prev, passwordFocus: false }))
              }
            />
            <p
              id="pwdnote"
              className={
                registerData.passwordFocus && !registerData.validPassword
                  ? "instructions"
                  : "offscreen"
              }
            >
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
            <label htmlFor="matchingPassword">Confirm Password:</label>
            <input
              id="matchingPassword"
              name="matchingPassword"
              value={registerData.matchingPassword}
              type="password"
              onChange={handleChange}
              required
              aria-invalid={
                registerData.validMatchingPassword ? "false" : "true"
              }
              aria-describedby="confirmnote"
              onFocus={() =>
                setRegisterData((prev) => ({ ...prev, matchFocus: true }))
              }
              onBlur={() =>
                setRegisterData((prev) => ({ ...prev, matchFocus: false }))
              }
            />
            <p
              id="confirmnote"
              className={
                registerData.matchFocus && !registerData.validMatchingPassword
                  ? "instructions"
                  : "offscreen"
              }
            >
              Must match the first password input field.
            </p>
            <button
              disabled={
                !registerData.validName ||
                !registerData.validPassword ||
                !registerData.validMatchingPassword
                  ? true
                  : false
              }
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
          <pre>{response}</pre>
        </section>
      )}
    </>
  );
}
