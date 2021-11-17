import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    setUser(JSON.parse(userStorage));
  }, []);

  const signup = async () => {
    const res = await axios.post("http://localhost:5000/signup", {
      username: username,
      email: email,
      password: password,
    });
    if (res.data === "User added") {
      navigate("/login");
    } else {
      setMessage(res.data)
    }
  };

  return (
    <div className="signupWrapper">
      {user ? (
        <h1>You are already signed up, go to  <Link to='/todos'>todos</Link></h1>
      ) : (
        <div className="formCon">
          <h1>Signup</h1>
          {message ? <div className="message">{message}</div> : ""}
          <div className="formInput">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              type="text"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
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
            value="submit"
            className="submitButton"
            onClick={signup}
          />
        </div>
      )}
    </div>
  );
};

export default Signup;
