import React, { useState, useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import useAuthHooks from "../hooks/useAuthHooks";

import "./Signup.css";

function Signup() {
  const [, , checkToken] = useAuthHooks();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
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

      await axios.post(`${url}/api/user/create-user`, {
        username,
        email,
        password,
      });

      toast.success("Congrats! Now please go login!");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (e) {
      toast.error(`😯 ${e.response.data.payload[0]}`);
    }
  }

  return (
    <form className="sign-up-container" onSubmit={handleSubmit}>
      <div>
        <h1>Sign up</h1>

        <div className="form-input">
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className="form-input">
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="form-input">
          <input
            type="text"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button>Submit</button>
      </div>
    </form>
  );
}

export default Signup;
