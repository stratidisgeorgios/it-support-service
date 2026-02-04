import { useState, useRef, useEffect } from "react";
import axios from "../api/axios";
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login() {
  const { auth, setAuth } = useAuth();

  const [response, setResponse] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      const res = await axios.post(
        "/api/v1/users/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true },
      );
      setResponse(JSON.stringify(res.data, null, 2));
      const accessToken = res?.data?.accessToken;
      const roles = res?.data?.user.roles;
      console.log(roles)
      setAuth({ email, password, roles, accessToken });
      console.log(auth)
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        console.log(err)
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleLogout = async () => {
    const res = await axios.post("/api/v1/users/logout", {
      email: "george@gmail.com",
    });
    setResponse(JSON.stringify(res.data, null, 2));
  };

  return (
    <>
      <h1>Sign In</h1>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          ref={emailRef}
          name="email"
          autoComplete="off"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          value={password}
          type="password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
      <button onClick={handleLogout}>Logout</button>
      <pre>{response}</pre>
    </>
  );
}

export default Login;
