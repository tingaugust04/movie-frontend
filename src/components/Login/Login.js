import React, { useState, useEffect } from "react";
import axios from "axios";

import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import useAuthHooks from "../hooks/useAuthHooks";

import "./Login.css";

function Login({ setUser }) {
  const [, , checkToken] = useAuthHooks();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (checkToken()) {
      navigate("/movie");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let url =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3001"
          : "https://piggepigge-backend.herokuapp.com";

      let payload = await axios.post(`${url}/api/user/create-user`, {
        email,
        password,
      });

      const jwtToken = payload.data.payload;
      window.localStorage.setItem("jwtToken", jwtToken);
      const decodedToken = jwtDecode(jwtToken);

      setUser({
        isAuth: true,
        username: decodedToken.data.username,
        email: decodedToken.data.email,
      });
      toast.success("Congrats! You logged In");
      setEmail("");
      setPassword("");

      navigate("/movie");
    } catch (e) {
      toast.error(`😯 ${e.response.data.payload[0]}`);
    }
  }

  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <div>
        <h1 style={{ color: "salmon" }}>Login</h1>

        <div className="form-input">
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-input">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button>Submit</button>
      </div>
    </form>
  );
}

export default Login;
