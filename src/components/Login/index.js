import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    setUser(JSON.parse(userStorage));
  }, []);

  const login = async () => {
    const res = await axios.post("http://localhost:5000/login", {
      identifier: identifier,
      password: password,
    });
    if (typeof res.data === "object") {
      localStorage.setItem(
        "user",
        JSON.stringify({ username: res.data.username })
      );
      navigate("/todos");
    } else {
      setMessage(res.data);
    }
  };

  return (
    <div className="loginWrapper">
      {user ? (
        <h1>
          You are already logged in, go to <Link to="/todos">todos</Link>
        </h1>
      ) : (
        <div className="formCon">
          <h1>Login</h1>
          {message ? <div className="message">{message}</div> : ""}
          <div className="formInput">
            <input
              type="text"
              name="identifier"
              placeholder="Username/Email"
              required
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="login"
            className="submitButton"
            onClick={login}
          />
          <Link to="/signup">if you don't have an account, register now</Link>
        </div>
      )}
    </div>
  );
};

export default Login;
